import {NextRequest, NextResponse} from "next/server";
import {calculateTokenExpiration} from "@/helpers/dateHelpers";

export async function POST(request: NextRequest) {
    try {
        const requestBody = await request.json();
        const {accessToken, expiresAt, refreshToken} = requestBody;
        const tokenModel = {
            accessToken,
            refreshToken,
            expiresAt
        };

        const response = NextResponse.json({}, {status: 200});
        let expiration = calculateTokenExpiration(expiresAt);
        response.cookies.set({
            name: `${cookieName}`,
            value: JSON.stringify(tokenModel),
            httpOnly: true,
            secure: process.env.NODE_ENV !== "development",
            maxAge: expiration,
            sameSite: "strict",
            path: "/",
        });

        return response;
    } catch (e) {
        return NextResponse.json(
            {error: `An error occurred storing cookie: ${e}`}, {status: 400}
        )
    }
}