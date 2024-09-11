import { FastifyRequest, FastifyReply } from "fastify";
import { ProductsGetService } from "../services/ProductsGetService";

class ProductGetController {
  async handle(req: FastifyRequest, reply: FastifyReply) {
    const productsGetService = new ProductsGetService();

    const customers = await productsGetService.execute();

    reply.send(customers)
  }
}

export { ProductGetController };
