import {
  FastifyInstance,
  FastifyPluginOptions,
  FastifyRequest,
  FastifyReply,
} from "fastify";
// import { CreateCustomerController } from "./controllers/CreateCustomerController";
import { ListCustomersController } from "./controllers/ListCustomersController";
import { DeleteUserController } from "./controllers/DeleteUserController";
import { UpdateUserController } from "./controllers/UpdateUserController";
import { CreateUserController } from "./controllers/CreateUserController";
import { auth } from "./middlewares/auth";

export async function routes(
  fastify: FastifyInstance,
  option: FastifyPluginOptions
) {

  fastify.post(
    "/api/createNewUser",
    async (req: FastifyRequest, reply: FastifyReply) => {
      return new CreateUserController().handle(req, reply);
    }
  );

  fastify.get(
    "/",
    { preHandler: auth },
    async (req: FastifyRequest, reply: FastifyReply) => {
      return reply.send({ ok: 'OK'})
    }
  );

  fastify.get(
    "/api/users",
    { preHandler: auth },
    async (req: FastifyRequest, reply: FastifyReply) => {
      return new ListCustomersController().handle(req, reply);
    }
  );

  fastify.delete(
    "/api/deleteUser",
    { preHandler: auth },
    async (req: FastifyRequest, reply: FastifyReply) => {
      return new DeleteUserController().handle(req, reply);
    }
  );

  fastify.put(
    "/api/updateUser",
    async (req: FastifyRequest, reply: FastifyReply) => {
      return new UpdateUserController().handle(req, reply);
    }
  );
}
