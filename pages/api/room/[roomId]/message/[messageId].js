import { writeDB, readDB } from "../../../../../backendLibs/dbLib";

export default function roomIdMessageIdRoute(req, res) {
  //read value from URL
  const roomId = req.query.roomId;
  const messageId = req.query.messageId;
  if (req.method === "DELETE") {
    const rooms = readDB();
    const Idx = rooms.findIndex((x) => x.roomId === roomId);
    if (Idx === -1) {
      return res.status(404).json({ ok: false, message: "Invalid room id" });
    }
    if (
      rooms[Idx].messages.findIndex((x) => x.messageId === messageId) === -1
    ) {
      return res.status(404).json({ ok: false, message: "Invalid message id" });
    }

    rooms[Idx].messages.splice(
      rooms[Idx].messages.findIndex((x) => x.messageId === messageId),
      1
    );
    writeDB(rooms);
    return res.json({ ok: true });
  }
}
