import {NextRequest, NextResponse} from "next/server";
import {getAccessToken} from "@/libs/token/tokenService";
import {StoreTokenRequest} from "@/interfaces/token/tokenInterface";
import {setCookieOnResponseHeaders} from "@/helpers/tokenHelpers";

const apiKey = process.env.NEXT_PUBLIC_INTERNAL_API_KEY as string;
const cookieName = process.env.COOKIE_NAME as string;
const internalBaseUrl = process.env.NEXT_PUBLIC_INTERNAL_URL as string;

export async function middleware(request: NextRequest) {
    if (request.url.includes('/api/')) {
        const clientApiKey = request.headers.get("x-api-key");
        if (clientApiKey !== apiKey) {
            return NextResponse.json("Unauthorized access");
        }
    }

    if (request.url.includes(`${internalBaseUrl}`) && !request.url.includes("login")) {
        console.log("url", request.url)
        const tokenCookie = request.cookies.get(`${cookieName}`)?.value as string;
        if (tokenCookie !== undefined){
            let tokenResponse:StoreTokenRequest = await getAccessToken(tokenCookie)
            console.log("retrieve cookie response",tokenResponse)

            //set the token on outgoing headers
            request.headers.set("Authorization",`Bearer ${tokenResponse.accessToken}`)

            //store new token
            if (tokenResponse.storeToken){
                let response = NextResponse.next();
                const {accessToken, expiresAt, refreshToken} = tokenResponse;

                setCookieOnResponseHeaders(accessToken,refreshToken,expiresAt, response);

                return response;
            }
        }
    }

    return NextResponse.next();
}