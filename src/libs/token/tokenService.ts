import {NextResponse} from "next/server";
import {StoreTokenRequest} from "@/interfaces/token/tokenInterface";

const baseUrl = process.env.NEXT_PUBLIC_INTERNAL_URL as string;
const apiKey = process.env.NEXT_PUBLIC_INTERNAL_API_KEY as string;

export async function storeAccessToken(storeTokenRequest: StoreTokenRequest) {
    try {
        const response = await fetch(`${baseUrl}/token/store`, {
            method: 'POST',
            headers: {
                'x-api-key':`${apiKey}`,
                'Content-type': 'application/json',
            },
            body: JSON.stringify(storeTokenRequest),
            credentials: 'same-origin'
        });
        console.log("store cookie response", response)

        return response.json();
    } catch (error) {
        throw error;
    }
}

export async function getAccessToken(tokenCookie: string) {
    try {
        const response = await fetch(`${baseUrl}/token/retrieve`, {
            method: 'POST',
            headers: {
                'x-api-key':`${apiKey}`,
                'Content-type': 'application/json',
            },
            body: JSON.stringify(tokenCookie),
            credentials: 'same-origin'
        });

        return response.json();
    } catch (error) {
        throw error;
    }
}
