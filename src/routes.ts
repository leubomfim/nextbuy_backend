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
import { CreateProductController } from "./controllers/CreateProductController";
import { auth } from "./middlewares/auth";
import { ProductGetController } from "./controllers/ProductsGetController";
import { LoginController } from "./controllers/LoginController";

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
  fastify.post(
    "/api/login",
    async (req: FastifyRequest, reply: FastifyReply) => {
      return new LoginController().handle(req, reply);
    }
  );
  fastify.post(
    "/api/createProduct",
    async (req: FastifyRequest, reply: FastifyReply) => {
      return new CreateProductController().handle(req, reply);
    }
  );

  fastify.get(
    "/",
    { preHandler: auth },
    async (req: FastifyRequest, reply: FastifyReply) => {
      return reply.send({ ok: "OK" });
    }
  );

  fastify.get(
    "/api/users",
    { preHandler: auth },
    async (req: FastifyRequest, reply: FastifyReply) => {
      return new ListCustomersController().handle(req, reply);
    }
  );

  fastify.get(
    "/api/products",
    { preHandler: auth },
    async (req: FastifyRequest, reply: FastifyReply) => {
      return new ProductGetController().handle(req, reply);
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
