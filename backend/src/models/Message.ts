import { model, Schema } from "mongoose";

const MessageShema = new Schema(
  {
    of: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    to: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

MessageShema.method("toJSON", function (this: any) {
  const { __v, ...object } = this.toObject();
  return object;
});

export const Message = model("Message", MessageShema);
