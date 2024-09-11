import prismaClient from "../prisma";

interface UpdateUserProps {
  id: string;
  name: string;
  email: string;
}

class UpdateUserService {
  async execute({ id, name, email }: UpdateUserProps) {
    console.log(id)
    if (!id || !name || !email) {
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

    await prismaClient.customer.update({
      where: {
        id: findCustomer.id,
      },
      data: {
        name,
        email,
      }
    });

    return { message: "Atualizado com sucesso!" };
  }
}

export { UpdateUserService };
