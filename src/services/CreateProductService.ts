import prismaClient from "../prisma";
import { ProductType } from "../types/product";
const SALT_ROUNDS = 10

class CreateProductService {
  async execute({
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
  }: ProductType) {

    const user = await prismaClient.products.create({
      data: {
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
      }
    });
    return user;
  }
}

export { CreateProductService };
