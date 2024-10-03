import { convertPasswordToHash } from "../lib/hash";
import prismaClient from "../prisma";
interface CreateCustomerProps {
  name: string;
  email: string;
  password: string;
}
class CreateUserService {
  async execute({ name, email, password }: CreateCustomerProps) {
    if (name.length <= 0 || email.length <= 0 || password.length <= 0) {
      throw new Error("Preencha todos os campos!");
    }

    const user = await prismaClient.user.create({
      data: {
        name,
        email,
        photo: '',
        password: await convertPasswordToHash(password),
      },
    });
    return user;
  }
}

export { CreateUserService };
