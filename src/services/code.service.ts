
import crypto from 'node:crypto'

import { db } from "../database/db.js";
import { hash } from "../utils/hash.js";
import type { AuthCodes } from "../types/index.js";
import APIError from '../utils/APIErrors.js';

export function generateAuthCode(clientId: string, userId: number, redirectUri: string, state: string){
    const createdAt = new Date().toISOString();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000).toISOString();
    const code = crypto.randomBytes(32).toString('hex');
    const codeHash = hash(code)

    const query = db.prepare("INSERT INTO auth_codes (code_hash, redirect_uri, state, created_at, expires_at, client_id, user_id) VALUES (?,?,?,?,?,?,?)");

    const result = query.run(codeHash, redirectUri, state, createdAt, expiresAt, clientId, userId);

    return {
        redirectUri,
        code,
        state
    }
}

export function verifyAuthCode(hashedCode: string, redirectUri: string) {
    const query = db.prepare("SELECT * FROM auth_codes WHERE code_hash = ?");
    const result = query.get(hashedCode) as AuthCodes | undefined;
    if(!result) throw APIError.unAuthorizedError("INVALID_CODE");

    if(new Date(result.expires_at) < new Date()) throw APIError.badRequestError("EXPIRED_CODE");

    if(result.redirect_uri !== redirectUri) throw APIError.badRequestError("REDIRECT_URI_MISMATCH");

    db.prepare("DELETE FROM auth_codes WHERE code_hash = ?").run(hashedCode);

    return {
        user_id: result.user_id,
        client_id: result.client_id,
    };
}
