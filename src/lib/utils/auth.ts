import { SignJWT, jwtVerify } from "jose";
const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

export const generateToken = async (email: string) => {
    const token = await new SignJWT({ email })
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("24h")
        .sign(JWT_SECRET);

    return token;
};

export const verifyToken = async (request: Request) => {
    const token = request.headers
        .get("cookie")
        ?.split("admin_token=")[1]
        ?.split(";")[0];

    if (!token) return false;

    try {
        await jwtVerify(token, JWT_SECRET);
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
};
