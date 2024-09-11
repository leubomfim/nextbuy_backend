import prismaClient from "../prisma";
import bcrypt from 'bcrypt'
import { ProductType } from "../types/product";
const SALT_ROUNDS = 10

class CreateProductService {
  async execute({
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
  }: ProductType) {
    // if (name.length <= 0 || email.length<= 0 || password.length<= 0) {
    //   throw new Error("Preencha todos os campos!");
    // }


    const user = await prismaClient.products.create({
      data: {
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
      }
    });
    return user;
  }
}

export { CreateProductService };
