
import Database from "better-sqlite3";

// @ts-ignore
export const db: Database = new Database('auth.db', {verbose: console.log});

let query = `
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password_hash TEXT NOT NULL,
        created_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS clients(
        client_id TEXT PRIMARY KEY,
        client_name TEXT NOT NULL,
        client_secret_hash TEXT NOT NULL,
        redirect_uri TEXT NOT NULL,
        created_at TEXT NOT NULL
    );
    
    CREATE TABLE IF NOT EXISTS auth_codes(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        code_hash TEXT NOT NULL,
        redirect_uri TEXT NOT NULL,
        state TEXT NOT NULL,
        created_at TEXT NOT NULL,
        expires_at TEXT NOT NULL,

        client_id TEXT REFERENCES clients(client_id),
        user_id INTEGER REFERENCES users(id)
    );

    CREATE TABLE IF NOT EXISTS refresh_tokens(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        token_hash TEXT NOT NULL,
        created_at TEXT NOT NULL,
        expires_at TEXT NOT NULL,

        client_id TEXT REFERENCES clients(client_id),
        user_id INTEGER REFERENCES users(id)
    );

    CREATE TABLE IF NOT EXISTS keys(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        kid TEXT NOT NULL UNIQUE,
        public_key TEXT NOT NULL,
        private_key TEXT NOT NULL,
        is_active BOOLEAN NOT NULL,
        created_at TEXT NOT NULL
    );
`;

db.exec(query);
