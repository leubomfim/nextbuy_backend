import { FastifyRequest, FastifyReply } from "fastify";
import { GetUserService } from "../services/GetUserService";

class GetUsersController {
  async handle(req: FastifyRequest, reply: FastifyReply) {
    const getCustomerService = new GetUserService();
    const token = req.cookies.token;
    if (!token) {
      return reply.status(401).send({ error: "Not authenticated" });
    }

    const user = await getCustomerService.execute(token);

    reply.send(user)
  }
}

export { GetUsersController };
