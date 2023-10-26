import {AxiosError} from 'axios';
import adminApiClient from "@/libs/admin_api_axios/adminApiClient";
import {NextRequest, NextResponse} from "next/server";
import {AdminApiResponse} from "@/interfaces/shared/AdminApiInterface";

export async function POST(request: NextRequest) {
    try {
        const requestBody = await request.text();
        console.log("register request",requestBody);
        const response = await adminApiClient
            .post<AdminApiResponse>('identity/user/create-next-user', `${requestBody}`);
        if (response.status === 200) {
            const adminResponse = response.data;
            return NextResponse.json(adminResponse);
        } else {
            return NextResponse.json(response.data);
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
