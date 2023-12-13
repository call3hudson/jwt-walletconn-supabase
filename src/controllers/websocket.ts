import { Request, NextFunction } from "express";
import { WebsocketRequestHandler } from "express-ws";
import ws from "ws";

export const socketHandler: WebsocketRequestHandler = (
  ws: ws,
  req: Request,
  next: NextFunction
) => {
  ws.on("connection", (ws: ws) => {
    console.log("Connected");
  });
};
