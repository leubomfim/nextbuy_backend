import { FastifyRequest, FastifyReply } from "fastify";
import { DeleteUserService } from "../services/DeleteUserService";

class DeleteUserController {
  async handle(req: FastifyRequest, reply: FastifyReply) {
    const { id } = req.query as { id: string };
    const deleteUserService = new DeleteUserService();

    const customer = await deleteUserService.execute({ id });

    reply.send(customer)
  }
}

export { DeleteUserController };
