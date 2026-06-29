import type { Request, Response } from "express";
import crypto from 'node:crypto';

import { getActiveKey } from "../services/key.service.js";
import APIError from "../utils/APIErrors.js";

const ISSUER = process.env.ISSUER_URL || "http://localhost:4000";

export function getOpenIDConfiguration(req: Request, res: Response) {
    return res.status(200).json({
        issuer: ISSUER,
        authorization_endpoint: `${ISSUER}/api/auth/authorize`,
        token_endpoint: `${ISSUER}/api/auth/token`,
        jwks_uri: `${ISSUER}/api/discovery/jwks.json`,
        response_types_supported: ['code'],
        grant_types_supported: ['authorization_code', 'refresh_token'],
        subject_types_supported: ['public'],
        id_token_signing_alg_values_supported: ['RS256'],
        token_endpoint_auth_methods_supported: ['client_secret_post'],
    });
}

export function getJWKS(req: Request, res: Response) {
    const activeKey = getActiveKey();
    if (!activeKey) throw APIError.notFoundError("NO_ACTIVE_KEY");

    const publicKeyObject = crypto.createPublicKey(activeKey.public_key);
    const jwk = publicKeyObject.export({ format: 'jwk' });

    return res.status(200).json({
        keys: [
            {
                ...jwk,
                kid: activeKey.kid,
                use: 'sig',
                alg: 'RS256',
            }
        ]
    });
}
