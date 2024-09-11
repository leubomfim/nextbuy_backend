import {
  FastifyRequest,
  FastifyReply,
} from "fastify";

export async function auth (request: FastifyRequest, reply: FastifyReply) {
  if(['GET', 'HEAD'].includes(request.method))  return;
  const apiKey = request.headers["x-api-key"];
  const knownKey = process.env.APIKEY;

  if (!apiKey || apiKey !== knownKey) {
    return reply.code(401).send({ error: "Unauthorized" });
  }
}