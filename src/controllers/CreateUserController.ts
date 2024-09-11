import { FastifyRequest, FastifyReply } from "fastify";
import { CreateUserService } from "../services/CreateUserService";
import prismaClient from "../prisma";

class CreateUserController {
  async handle(req: FastifyRequest, reply: FastifyReply) {
    const { name, email, password } = req.body as {
      name: string;
      email: string;
      password: string;
    };

    const userFind = await prismaClient.user.findUnique({
      where: {
        email: email,
      },
    });

    if(userFind) {
      return reply.code(401).send({message: 'Invalid Credentials!'})
    }
    
    const userService = new CreateUserService();
    const user = await userService.execute({ name, email, password });

    reply.send(user);
  }
}

export { CreateUserController };
