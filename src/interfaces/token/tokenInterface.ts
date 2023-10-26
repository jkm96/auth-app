export interface StoreTokenRequest{
    AccessToken:string;
    RefreshToken:string;
    ExpiresIn:number;
}

export interface RefreshTokenRequest {
    Token: string;
    RefreshToken: string;
}
