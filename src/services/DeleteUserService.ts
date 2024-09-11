import prismaClient from "../prisma";

interface DeleteUserProps {
  id: string;
}

class DeleteUserService {
  async execute({ id }: DeleteUserProps) {
    console.log(id)
    if (!id) {
      throw new Error("Solicitação invalida.");
    }

    const findCustomer = await prismaClient.customer.findFirst({
      where: {
        id: id,
      },
    });

    if (!findCustomer) {
      throw new Error("Cliente não existe!");
    }

    await prismaClient.customer.delete({
      where: {
        id: findCustomer.id,
      },
    });

    return { message: "Deletado com sucesso!" };
  }
}

export { DeleteUserService };
