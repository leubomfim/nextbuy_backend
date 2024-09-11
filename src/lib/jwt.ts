import jwt from "jsonwebtoken";

const JWT_SECRET: any = process.env.SECRET_JWT

export async function veifyJwt(token: string) {
    return jwt.verify(token, JWT_SECRET)
}

export async function sign(payload: any) {
    return jwt.sign(payload, JWT_SECRET)
}

