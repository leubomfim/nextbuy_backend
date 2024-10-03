import prismaClient from "../prisma";

class GetUserService {
  async execute(sessionToken: string) {
    const users = await prismaClient.user.findFirst({
      where: {
        session: sessionToken,
      },
    });
    return users;
  }
}

export { GetUserService };
