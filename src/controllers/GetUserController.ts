import { FastifyRequest, FastifyReply } from "fastify";
import { GetUserService } from "../services/GetUserService";

class GetUsersController {
  async handle(req: FastifyRequest, reply: FastifyReply) {
    const token = req.cookies.userToken;
    if (!token) {
      return reply.status(401).send({ error: "Not authenticated" });
    }
    const getCustomerService = new GetUserService();

    const user = await getCustomerService.execute({ token });

    reply.send(user)
  }
}

export { GetUsersController };
