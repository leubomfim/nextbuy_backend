import { FastifyRequest, FastifyReply } from "fastify";
import prismaClient from "../prisma";
import { LoginService } from "../services/LoginService";
import { sign } from "../lib/jwt";
import { verifyHashPassword } from "../lib/hash";
interface UserType {
  email: string;
}

class LoginController {
  async handle(req: FastifyRequest, reply: FastifyReply) {
    const { email, password } = req.body as {
      email: string;
      password: string;
    };

    const userFind = await prismaClient.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!userFind) {
      return reply.code(401).send({ message: "Invalid Credentials!" });
    }

    const isMatch = await verifyHashPassword(userFind.password, password)
    if(!isMatch) return reply.status(400).send('Verifique seus dados.')

    const accessToken = await sign({
        email: email,
      });

    reply.status(200).send({ accessToken });
  }
}

export { LoginController };
