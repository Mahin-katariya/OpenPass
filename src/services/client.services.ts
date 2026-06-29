import crypto from 'node:crypto'
import bcrypt from 'bcryptjs';

import { db } from "../database/db.js";
import { type Clients } from "../types/index.js";

export function findClientById(clientId: string){
    const query = db.prepare("SELECT * FROM clients WHERE client_id = ?");
    const result = query.get(clientId)
    console.log("redirect_uri:", result.redirect_uri);
    
    return result;
}

export async function createClient(clientName: string, redirectUri : string[]){
    const clientId = crypto.randomUUID();
    const clientSecret = crypto.randomBytes(32).toString('hex');
    const createdAt = new Date().toISOString();

    const clientSecretHash = await bcrypt.hash(clientSecret, 10);

    const query = db.prepare("INSERT INTO clients (client_id, client_name, client_secret_hash, redirect_uri, created_at) VALUES (?,?,?,?,?)");

    const result = query.run(clientId,clientName,clientSecretHash,JSON.stringify(redirectUri),createdAt);
    console.log(result);
    console.log("=============================");
    // console.log(result.redirect_uri);

    return {
        clientId,
        clientSecret,
        redirectUri
    }
}


