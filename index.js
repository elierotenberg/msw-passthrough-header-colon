import { createServer } from "node:http";
import { setupServer } from "msw/node";

const httpServer = createServer((request, response) => {
  response.end(request.headers["x-test"]);
});
await new Promise((resolve) => httpServer.listen(0, "127.0.0.1", resolve));
const { port } = httpServer.address();

const server = setupServer();
server.listen({ onUnhandledFrame: "bypass" });

for (const value of ["a b", "a: b"]) {
  const response = await fetch(`http://127.0.0.1:${port}/`, {
    headers: { "x-test": value },
  });
  console.log(JSON.stringify(value), "->", JSON.stringify(await response.text()));
}

server.close();
httpServer.close();
