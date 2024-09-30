import Fastify from "fastify";
import { FastifyRequest, FastifyReply } from "fastify";
import { routes } from "./routes";
import cors from "@fastify/cors";
import fastifyCookie from "@fastify/cookie";
import { veifyJwt } from "./lib/jwt";
import helmet from "@fastify/helmet";

const app = Fastify({ logger: true });

app.addHook("preHandler", async (req: FastifyRequest, reply: FastifyReply) => {
  const token = req.cookies.token;
  if (!token) {
    return reply.status(401).send("Not authorized!");
  }

  try {
    const decode = await veifyJwt(token);
    req.user = decode as { email: string };
  } catch (error) {
    return reply.status(401).send("Token invalido!");
  }
});

app.setErrorHandler((error, req, reply) => {
  reply.code(400).send({ message: error.message });
});

const start = async () => {
  await app.register(cors, {
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  });
  await app.register(routes);
  await app.register(fastifyCookie, {
    secret: process.env.COOKIE_SECRET,
    parseOptions: {},
  });
  await app.register(import("@fastify/rate-limit"), {
    max: 10,
    timeWindow: 5000,
    cache: 10000,
    hook: "preHandler",
  });
  await app.register(helmet, {
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "trustedscripts.com"],
      },
    },
    hsts: {
      maxAge: 31536000,
      includeSubDomains: true,
      preload: true,
    },
    frameguard: {
      action: "deny",
    },
    noSniff: true,
    referrerPolicy: {
      policy: "no-referrer",
    },
  });

  try {
    await app.listen({ port: 3333 });
  } catch (err) {
    process.exit(1);
  }
};

start();
