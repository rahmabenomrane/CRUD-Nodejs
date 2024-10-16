// tasna3 serveur
import http from "http";
import app from "./app.js";

const server = http.createServer(app);
const PORT = process.env.PORT || 5000;
//req contien les infos li chnab3athom ;http.createServer:creation du serveur ;server.listen 3la enehou port chysma3

server.listen(PORT, () => {
  console.log("serveur ok " + PORT);
});
