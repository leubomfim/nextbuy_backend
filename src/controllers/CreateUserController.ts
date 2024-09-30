import { FastifyRequest, FastifyReply } from "fastify";
import { CreateUserService } from "../services/CreateUserService";
import prismaClient from "../prisma";
const CRYPTO_SECRET: any = process.env.CRYPTO_SECRET;
class CreateUserController {
  async handle(req: FastifyRequest, reply: FastifyReply) {
    const { name, email, password } = req.body as {
      name: string;
      email: string;
      password: string;
    };
    const decryptedName = CryptoJS.AES.decrypt(name, CRYPTO_SECRET).toString(
      CryptoJS.enc.Utf8
    );
    const decryptedEmail = CryptoJS.AES.decrypt(email, CRYPTO_SECRET).toString(
      CryptoJS.enc.Utf8
    );
    const decryptedPassword = CryptoJS.AES.decrypt(
      password,
      CRYPTO_SECRET
    ).toString(CryptoJS.enc.Utf8);

    const userFind = await prismaClient.user.findUnique({
      where: {
        email: decryptedEmail,
      },
    });

    if (userFind) {
      return reply.code(401).send({ message: "Invalid Credentials!" });
    }

    const userService = new CreateUserService();
    const user = await userService.execute({
      name: decryptedName,
      email: decryptedEmail,
      password: decryptedPassword,
    });

    reply.send(user);
  }
}

export { CreateUserController };
