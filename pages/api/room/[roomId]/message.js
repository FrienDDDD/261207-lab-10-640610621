import { readDB, writeDB } from "../../../../backendLibs/dbLib";
import { v4 as uuidv4 } from "uuid";

export default function roomIdMessageRoute(req, res) {
    if (req.method === "GET") {
    const rooms = readDB();
    const roomId = req.query.roomId;
    const Idx = rooms.findIndex((x) => x.roomId === roomId);
    if (Idx === -1) {
      return res.status(404).json({ ok: false, message: "Invalid room id" });
    } else {
      return res.json({ ok: true, messages: rooms[Idx].messages });
    }
  } else if (req.method === "POST") {
    const rooms = readDB();
    const roomId = req.query.roomId;
    const Idx = rooms.findIndex((x) => x.roomId === roomId);

    //read request body
    const text = req.body.text;

    //create new id
    const newId = uuidv4();
    if (Idx === -1) {
      return res
        .status(400)
        .json({ ok: false, messages: "Invalid room input" });
    }
    if (typeof text !== "string") {
      return res
        .status(404)
        .json({ ok: false, messages: "Invalid text Input" });
    }
    const message = { messageId: newId, text };
    rooms[Idx].messages.push(message);
    writeDB(rooms);
    return res.json({ ok: true, message });
  }
}
