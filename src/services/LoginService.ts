import { convertPasswordToHash } from "../lib/hash";
import prismaClient from "../prisma";

interface LoginProps {
  email: string;
  password: string;
}
class LoginService {
  async execute({ email, password }: LoginProps) {
    if (email.length <= 0 || password.length <= 0) {
      throw new Error("Preencha todos os campos!");
    }

    const user = await prismaClient.user.findUnique({
      where: {
        email: email,
      },
    });
    return user;
  }
}

export { LoginService };
