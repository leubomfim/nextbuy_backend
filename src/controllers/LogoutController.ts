import { FastifyRequest, FastifyReply } from "fastify";
import prismaClient from "../prisma";
import jwt from "jsonwebtoken";

const JWT_SECRET: any = process.env.SECRET_JWT;
class LogoutController {
  async handle(req: FastifyRequest, reply: FastifyReply) {
    const token = req.cookies.token;
    if (!token) {
      return reply.status(401).send({ error: "Not authenticated" });
    }

    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
    await prismaClient.user.update({
      where: { id: decoded.userId },
      data: { session: "" },
    });

    reply.clearCookie("userToken").send({ message: "Logged out" });
  }
}

export { LogoutController };
