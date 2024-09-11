import prismaClient from "../prisma";

class ProductsGetService {
  async execute() {
    const products = await prismaClient.products.findMany();

    return products;
  }
}

export { ProductsGetService };
