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
        if (response.ok) {
            return response.json();
        } else {
            try {
                const errorResponse = await response.json();
                console.log("error storing token", errorResponse)
                const errorMessage = errorResponse.error || 'Request failed with unknown error';
                return NextResponse.json(errorMessage);
            } catch (error) {
                return NextResponse.json(error);
            }
        }
    } catch (error) {
        throw error;
    }
}

export async function getAccessToken(tokenCookie: string | undefined) {
    try {

    } catch (error) {
        throw error;
    }
}
