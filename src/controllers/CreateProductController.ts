import { FastifyRequest, FastifyReply } from "fastify";
import { CreateProductService } from "../services/CreateProductService";
import { ProductType } from "../types/product";

class CreateProductController {
  async handle(req: FastifyRequest, reply: FastifyReply) {
    console.log(req.body);
    const {
      name,
      description,
      userId,
      userName,
      userEmail,
      stock,
      discount,
      comments,
      freight,
      image_url,
      rating,
      ratingLength,
    } = req.body as ProductType;

    const userService = new CreateProductService();
    const user = await userService.execute({
      name,
      description,
      userId,
      userName,
      userEmail,
      stock,
      discount,
      comments,
      freight,
      image_url,
      rating,
      ratingLength,
    });

    reply.send(user);
  }
}

export { CreateProductController };
