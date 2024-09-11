import { FastifyRequest, FastifyReply } from "fastify";
import { UpdateUserService } from "../services/UpdateUserService";
import { sign } from "../lib/jwt";

class UpdateUserController {
  async handle(req: FastifyRequest, reply: FastifyReply) {
    const { id } = req.query as { id: string };
    const { name, email } = req.body as { name: string; email: string };
    const deleteUserService = new UpdateUserService();

    await deleteUserService.execute({ id, name, email });

    const acessToken = await sign({
      id: id,
    });

    reply.send({
      acessToken
    });
  }
}

export { UpdateUserController };
