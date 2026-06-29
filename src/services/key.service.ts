import crypto from 'node:crypto';

import { db } from '../database/db.js';
import type { Keys } from '../types/index.js';

export function ensureKeys() {
    const existing = db.prepare('SELECT * FROM keys WHERE is_active = 1').get() as Keys | undefined;
    if (existing) return;

    const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
        modulusLength: 2048,
        publicKeyEncoding: { type: 'spki', format: 'pem' },
        privateKeyEncoding: { type: 'pkcs8', format: 'pem' },
    });

    const kid = crypto.randomUUID();
    const createdAt = new Date().toISOString();

    db.prepare('INSERT INTO keys (kid, public_key, private_key, is_active, created_at) VALUES (?, ?, ?, ?, ?)')
        .run(kid, publicKey, privateKey, 1, createdAt);
}

export function getActiveKey(): Keys | undefined {
    return db.prepare('SELECT * FROM keys WHERE is_active = 1').get() as Keys | undefined;
}
