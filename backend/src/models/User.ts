import { model, Schema } from "mongoose";

const UserShema = new Schema({
  name: {
    type: String,
    required: true,
  },
  surname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  online: {
    type: Boolean,
    default: false,
  },
});

UserShema.method("toJSON", function (this: any) {
  const { __v, _id, password, ...object } = this.toObject();
  object.id = _id;
  return object;
});

export const User = model("User", UserShema);
