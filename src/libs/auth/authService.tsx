import {LoginUserRequest} from "@/interfaces/auth/loginUserInterface";
import {RegisterUserRequest} from "@/interfaces/auth/registerUserInterface";
import {NextResponse} from "next/server";

const baseUrl = process.env.NEXT_PUBLIC_INTERNAL_URL as string;
const apiKey = process.env.NEXT_PUBLIC_INTERNAL_API_KEY as string;

export async function loginUser(loginRequest: LoginUserRequest) {
    try {
        const response = await fetch(`${baseUrl}/auth/login`, {
            method: 'POST',
            headers: {
                'x-api-key':`${apiKey}`,
                'Content-type': 'application/json',
            },
            body: JSON.stringify(loginRequest),
        });

        if (response.ok) {
            return response.json();
        } else {
            try {
                const errorResponse = await response.json();
                const errorMessage = errorResponse || 'Request failed with unknown error';
                return NextResponse.json(errorMessage);
            } catch (error) {
                return NextResponse.json(error);
            }
        }
    } catch (error) {
        throw error;
    }
}

export async function registerUser(registerRequest: RegisterUserRequest) {
    try {
        const response = await fetch(`${baseUrl}/auth/register`, {
            method: 'POST',
            headers: {
                'x-api-key':`${apiKey}`,
                'Content-type': 'application/json',
            },
            body: JSON.stringify(registerRequest),
        });

        if (response.ok) {
            return response.json();
        } else {
            try {
                const errorResponse = await response.json();
                const errorMessage = errorResponse || 'Request failed with unknown error';
                return NextResponse.json(errorMessage);
            } catch (error) {
                return NextResponse.json(error);
            }
        }
    } catch (error) {
        throw error;
    }
}
