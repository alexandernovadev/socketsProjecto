import { Request, Response } from "express";
import { Message } from "../models/Message";
import mongoose from "mongoose"; 

class MessagesController {
  async getMessages(req: Request, res: Response): Promise<Response> {
    // @ts-ignore
    const uid = req.uid;    

    // Get `from` query parameter and cast to string
    const Messagefrom = (req.query.from as string) || "";

    console.log("Messagefrom", Messagefrom);
    

    // Validate if `Messagefrom` is a valid ObjectId; otherwise, return an error
    if (!mongoose.Types.ObjectId.isValid(Messagefrom)) {
      return res.status(400).json({
        ok: false,
        msg: "Invalid 'from' ID",
      });
    }

    // Fetch the last 30 messages between the `uid` and `Messagefrom`
    try {
      const getLast30 = await Message.find({
        $or: [
          { from: uid, to: Messagefrom },
          { from: Messagefrom, to: uid },
        ],
      })
        .sort({ createdAt: -1 })
        .limit(30);

      return res.json({
        ok: true,
        msg: "Messages retrieved",
        messages: getLast30,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        ok: false,
        msg: "An error occurred while retrieving messages",
      });
    }
  }
}

export default new MessagesController();
