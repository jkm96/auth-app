import adminApiClient from "@/libs/adminApiAxios/adminApiClient";
import {NextRequest} from "next/server";
import {handleAxiosResponse, handlerApiException} from "@/helpers/responseHelpers";

export async function POST(request: NextRequest) {
    try {
        const requestBody = await request.text();
        console.log("register request",requestBody);
        console.log("register request cookies",request.cookies.getAll());
        const response = await adminApiClient
            .post('identity/user/create-user', `${requestBody}`);

     return handleAxiosResponse(response);
    } catch (error: unknown) {
        return handlerApiException(error);
    }
}
