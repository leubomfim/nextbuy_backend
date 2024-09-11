import { FastifyRequest, FastifyReply } from "fastify";
import { CreateCustomerService } from "../services/CreateCustomerService";
import prismaClient from "../prisma";
class CreateCustomerController {
  async handle(req: FastifyRequest, reply: FastifyReply) {
    console.log(req.body)
    const { name, email, password, myCart, myPurchases, isAdmin } = req.body as {
      name: string;
      email: string;
      password: string;
      myCart: any[],
      myPurchases: any[],
      isAdmin: boolean
    };
    const userFind = await prismaClient.user.findUnique({
      where: {
        email: email,
      },
    });

    if(userFind) {
      return reply.code(401).send({message: 'User already exist with this email!'})
    }
    const userService = new CreateCustomerService();
    const user = await userService.execute({
      name,
      email,
      password,
    });

    reply.send(user);
  }
}

export { CreateCustomerController };
