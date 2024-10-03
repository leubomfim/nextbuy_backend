import { FastifyRequest, FastifyReply } from "fastify";
import prismaClient from "../prisma";
import { PurchaseService } from "../services/PurchaseService";
class LogoutController {
  async handle(req: FastifyRequest, reply: FastifyReply) {
    const { productId, userId } = req.body as {
      productId: string;
      userId: string;
    };
    const productFind = await prismaClient.products.findUnique({
      where: {
        id: productId,
      },
    });

    const purchaseService = new PurchaseService();
    const purchase = await purchaseService.execute({
      userId: userId,
      product: productFind,
    });

    reply.send(purchase);
  }
}

export { LogoutController };
