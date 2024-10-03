import { FastifyRequest, FastifyReply } from "fastify";
import { ListUsersService } from "../services/ListCustomersService";

class ListUsersController {
  async handle(req: FastifyRequest, reply: FastifyReply) {
    const listCustomerService = new ListUsersService();

    const customers = await listCustomerService.execute();

    reply.send(customers)
  }
}

export { ListUsersController };
