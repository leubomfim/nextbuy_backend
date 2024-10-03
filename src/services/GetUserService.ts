import prismaClient from "../prisma";

interface UserTypeSession {
  token: string;
}

class GetUserService {
  async execute({ token }: UserTypeSession) {
    const users = await prismaClient.user.findFirst({
      where: {
        session: token,
      },
    });
    return users;
  }
}

export { GetUserService };
