// register service
// create User

import { db } from "../database/db.js";
import { type Users } from "../types/index.js";


export function findUserByEmail(email: string): Users | undefined {
    const query = db.prepare("SELECT * FROM users WHERE email = ?");
    const result = query.get(email) as Users | undefined;
    return result;
}

export function findUserById(id: number): Users | undefined {
    return db.prepare("SELECT * FROM users WHERE id = ?").get(id) as Users | undefined;
}

export function createUser(name: string, email: string, password_hash: string){
    const craetedAt = new Date().toISOString();
    const query = db.prepare("INSERT INTO users (name, email, password_hash, created_at) VALUES (?,?,?,?)");
    const result = query.run(name, email, password_hash, craetedAt);
    console.log(result);

    return {
        id: result.lastInsertRowid as number,
        name,
        email,
        created_at: craetedAt
    }
}

