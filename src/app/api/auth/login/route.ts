import adminApiClient from "@/libs/admin_api_axios/adminApiClient";
import {AdminApiResponse} from "@/interfaces/shared/AdminApiInterface";
import {NextResponse} from "next/server";
import {AxiosError} from "axios";
import {TokenResponse} from "@/interfaces/token/tokenInterface";

export async function POST(request: Request) {
    try {
        const requestBody = await request.text();
        const response = await adminApiClient
            .post<TokenResponse>('auth/login', `${requestBody}`);

        if (response.status === 200) {
            const tokenResponse = response.data;
            return NextResponse.json(tokenResponse,{status:200});
        } else {
            return NextResponse.json(response.data,{status:400});
        }
    } catch (error: unknown) {
        if (error instanceof AxiosError) {
            // Handle Axios errors
            const axiosError = error as AxiosError;
            console.log("error response data", axiosError.response?.data);
            console.log("error response status", axiosError.response?.status);
            return NextResponse.json(axiosError.response?.data || "Internal Server Error");
        }
    }
}