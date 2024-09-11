import { FastifyRequest, FastifyReply } from "fastify";
import { ListCustomersService } from "../services/ListCustomersService";

class ListCustomersController {
  async handle(req: FastifyRequest, reply: FastifyReply) {
    const listCustomerService = new ListCustomersService();

    const customers = await listCustomerService.execute();

    reply.send(customers)
  }
}

export { ListCustomersController };
