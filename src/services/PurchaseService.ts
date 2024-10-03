import { convertPasswordToHash } from "../lib/hash";
import prismaClient from "../prisma";
interface ProductType {
  description: string;
  name: string;
  userId: string;
  userName: string;
  userEmail: string;
  stock: number;
  discount: number;
  image_url: string;
  freight: number;
  rating: number;
  purchased: number;
  userPhoto: string;
}
interface CreateCustomerProps {
  userId: string;
  product: ProductType;
}
class PurchaseService {
  async execute({ userId, product }: CreateCustomerProps) {
    const updatedUser = await prismaClient.purchase.update({
      where: { id: userId },
      data: {
        sellerName: product.userName,
        sellerEmail: product.userEmail,
        sellerphoto: product.userPhoto,
        productName: product.name,
        rating: product.rating,
        purchasedAt: new Date().toString(),
      },
    });
    return updatedUser;
  }
}

export { PurchaseService };
