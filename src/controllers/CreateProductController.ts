import { FastifyRequest, FastifyReply } from "fastify";
import { CreateProductService } from "../services/CreateProductService";
import { ProductType } from "../types/product";

class CreateProductController {
  async handle(req: FastifyRequest, reply: FastifyReply) {
    console.log(req.body);
    const {
      description,
      name,
      price,
      userId,
      userName,
      userEmail,
      userPhoto,
      stock,
      discount,
      image_url,
      freight,
      rating,
      ratingLenght,
      purchased,
    } = req.body as ProductType;

    const userService = new CreateProductService();
    const user = await userService.execute({
      description,
      name,
      price,
      userId,
      userName,
      userEmail,
      userPhoto,
      stock,
      discount,
      image_url,
      freight,
      rating,
      ratingLenght,
      purchased,
    });

    reply.send(user);
  }
}

export { CreateProductController };
