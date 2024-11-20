import Fastify, { FastifyInstance } from "fastify";
import { routes } from "./routes";
import fastifyCookie from "@fastify/cookie";
import helmet from "@fastify/helmet";
import fastifyCors from "@fastify/cors";

const app = Fastify({ logger: true });

app.setErrorHandler((error, req, reply) => {
  reply.code(400).send({ message: error.message });
});

app.addHook('preHandler', async (request, reply) => {
  const authHeader = request.headers["authorization"];
  if (!authHeader) {
    reply.code(401).send({ error: "You don't have authorization!" });
    return;
  }
  const token = authHeader.split(" ")[1];
  if (token !== process.env.BEARER_TOKEN_SECRET) {
    reply.code(403).send({ error: "You don't have authorization!" });
    return;
  }
});


const start = async () => {
  const allowedOrigins = [process.env.ORIGIN_CORS_LOCAL, process.env.ORIGIN_CORS_LOCAL_NEXT, process.env.ORIGIN_CORS_BACKEND, process.env.FRONTEND_URL];
  await app.register(fastifyCors, {
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"), false);
      }
    },
    credentials: true,
  });
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
      useDefaults: true,
      directives: {
        'img-src': ["'self'", 'data:', 'https:'],
        'default-src': ["'self'"],
        'script-src': ["'self'", "trustedscripts.com"],
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
  })
  await app.register(routes); 
  try {
    await app.listen({ port: 3333 });
  } catch (err) {
    process.exit(1);
  }
};
start();
