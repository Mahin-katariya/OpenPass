import crypto from 'node:crypto'


export const hash = (plaintext: string) => {
    return crypto.createHash('sha256').update(plaintext).digest('hex')
}