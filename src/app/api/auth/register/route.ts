export async function POST(request: Request) {
    const res = await request.json()
    console.log("api route",res)
    return Response.json({ message:"success" })
}