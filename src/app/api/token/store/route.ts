import {NextRequest, NextResponse} from "next/server";
import {calculateTokenExpiration} from "@/helpers/dateHelpers";

const cookieName = process.env.COOKIE_NAME as string;

export async function POST(request: NextRequest) {
    try {
        const requestBody = await request.json();
        const {accessToken, expiresAt, refreshToken} = requestBody;
        const cookie = {
            accessToken,
            refreshToken,
            expiresAt
        };

        const response = NextResponse.json({}, {status: 200});
        response.cookies.set({
            name: `${cookieName}`,
            value: JSON.stringify(cookie),
            httpOnly: true,
            secure: process.env.NODE_ENV !== "development",
            expires: calculateTokenExpiration(expiresAt),
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