import { FastifyRequest, FastifyReply } from "fastify";
import prismaClient from "../prisma";
import { signJwt } from "../lib/jwt";
import { verifyHashPassword } from "../lib/hash";
import CryptoJS from 'crypto-js'
const CRYPTO_SECRET: any = process.env.CRYPTO_SECRET
class LogoutController {
  async handle(req: FastifyRequest, reply: FastifyReply) {
    const { email, password } = req.body as {
      email: string;
      password: string;
    };

    const decryptedEmail = CryptoJS.AES.decrypt(email, CRYPTO_SECRET).toString(CryptoJS.enc.Utf8);
    const decryptedPassword = CryptoJS.AES.decrypt(password, CRYPTO_SECRET).toString(CryptoJS.enc.Utf8);

    const userFind = await prismaClient.user.findUnique({
      where: {
        email: decryptedEmail,
      },
    });

    if (!userFind) {
      return reply.code(401).send({ message: "Invalid Credentials!" });
    }

    const isMatch = await verifyHashPassword(userFind.password, decryptedPassword)
    if(!isMatch) return reply.status(400).send('Verifique seus dados.')

    const accessToken = await signJwt({
        email: decryptedEmail,
      });

    reply.setCookie('token', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 3 * 24 * 60 * 60,
      path: '/'
    }).status(200).send('Login with success!');
  }
}

export { LogoutController };
