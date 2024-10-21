import {
  FastifyInstance,
  FastifyPluginOptions,
  FastifyRequest,
  FastifyReply,
} from "fastify";
// import { CreateCustomerController } from "./controllers/CreateCustomerController";
import { ListUsersController } from "./controllers/ListCustomersController";
import { DeleteUserController } from "./controllers/DeleteUserController";
import { UpdateUserController } from "./controllers/UpdateUserController";
import { CreateUserController } from "./controllers/CreateUserController";
import { CreateProductController } from "./controllers/CreateProductController";
import { ProductGetController } from "./controllers/ProductsGetController";
import { LoginController } from "./controllers/LoginController";
import { createHook } from "async_hooks";
import { veifyJwt } from "./lib/jwt";
import { GetUsersController } from "./controllers/GetUserController";
import prismaClient from "./prisma";

export async function routes(
  fastify: FastifyInstance,
  option: FastifyPluginOptions
) {
  fastify.post(
    "/api/createNewUser",
    async (req: FastifyRequest, reply: FastifyReply) => {
      return new CreateUserController().handle(req, reply);
    }
  ),
  fastify.get('/ws', { websocket: true }, (connection, req) => {
    connection.socket.on('message', async (message: string) => {
      const data = JSON.parse(message);
      console.log('Mensagem recebida:', data);
  
      if (data.action === 'updateProduct') {
        // const updatedProduct = await prisma.product.update({
        //   where: { id: data.id },
        //   data: data,
        // });
  
        // Emite atualização para todos os clientes conectados
        fastify.websocketServer.clients.forEach((client: any) => {
          if (client.readyState === 1) {
            client.send(JSON.stringify({ action: 'productUpdated', product: {ok: 'Oi'} }));
          }
        });
      }
    });
  
    connection.socket.on('close', () => {
      console.log('Cliente desconectado');
    });
  }),
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

  fastify.get("/", async (req: FastifyRequest, reply: FastifyReply) => {
    return reply.send({ ok: "OK" });
  });

  fastify.get(
    "/api/users",
    async (req: FastifyRequest, reply: FastifyReply) => {
      return new ListUsersController().handle(req, reply);
    }
  );
  fastify.get(
    "/api/getUserProfile",
    async (req: FastifyRequest, reply: FastifyReply) => {
      return new GetUsersController().handle(req, reply);
    }
  );

  fastify.get(
    "/api/products",
    async (req: FastifyRequest, reply: FastifyReply) => {
      return new ProductGetController().handle(req, reply);
    }
  );

  fastify.delete(
    "/api/deleteUser",
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
