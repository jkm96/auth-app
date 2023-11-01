import adminApiClient from "@/libs/adminApiAxios/adminApiClient";
import {NextRequest} from "next/server";
import {handleAxiosResponse, handleApiException} from "@/helpers/responseHelpers";
import {cookieName} from "@/constants/appConstants";

export async function POST(request: NextRequest) {
    try {
        const requestBody = await request.text();
        const cookie = request.cookies.get(`${cookieName}`)?.value as string;
        const {accessToken} = JSON.parse(cookie);
        const headers = {
            'Authorization': `Bearer ${accessToken}`
        };
        const response = await adminApiClient
            .post('identity/user/create-user', `${requestBody}`,{headers: headers});
        console.log("register response", response)
        return handleAxiosResponse(response);
    } catch (error: unknown) {
        return handleApiException(error);
    }
}
