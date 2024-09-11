import prismaClient from "../prisma";
import bcrypt from 'bcrypt'
const SALT_ROUNDS = 10

interface CreateCustomerProps {
  name: string;
  email: string;
  password: string;
}

class CreateCustomerService {
  async execute({
    name,
    email,
    password,
  }: CreateCustomerProps) {
    console.log(name, email, password)
    if (name.length <= 0 || email.length<= 0 || password.length<= 0) {
      throw new Error("Preencha todos os campos!");
    }

    const hash = await bcrypt.hash(password, SALT_ROUNDS)

    const user = await prismaClient.customer.create({
      data: {
        name,
        email,
        status: true
      }
    });
    return user;
  }
}

export { CreateCustomerService };
