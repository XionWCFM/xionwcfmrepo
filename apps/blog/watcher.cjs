/* eslint-disable @typescript-eslint/no-var-requires */
const { WebSocketServer } = require("ws");
const chokidar = require("chokidar");

const wss = new WebSocketServer({ port: 3600 });
const watchCallbacks = [];

chokidar.watch("./posts").on("all", (event) => {
  if (event === "change") {
    // biome-ignore lint/complexity/noForEach: <explanation>
    watchCallbacks.forEach((cb) => cb());
  }
});

wss.on("connection", function connection(ws) {
  ws.on("error", console.error);

  watchCallbacks.push(onChange);
  ws.on("close", function close() {
    const index = watchCallbacks.findIndex(onChange);
    watchCallbacks.splice(index, 1);
  });

  function onChange() {
    ws.send("refresh");
  }
});
