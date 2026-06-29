
export interface Users {
    id: number,
    name: string,
    email: string,
    password_hash: string | undefined,
    created_at: Date
}

export interface Clients{
    client_id: string,
    client_name: string,
    client_secret_hash: string,
    redirect_uri: string,
    created_at: string
}

export interface AuthCodes{
    id: number,
    code_hash: string,
    client_id: number,
    user_id: number,
    redirect_uri: string,
    state: string,
    created_at: Date,
    expires_at: Date
}

export interface RefreshTokens{
    id: number,
    token_hash: string,
    client_id: number,
    user_id: number,
    created_at: Date,
    updated_at: Date
}

export interface Keys{
    id: number,
    kid: string
    public_key: string,
    private_key: string,
    is_active: boolean,
    created_at: Date,
}

