import { Message } from "./../models/Message";
import { User } from "./../models/User";

interface PayloadMessage {
  from: string;
  to: string;
  message: string;
}

const userConnected = async (uid: string) => {
  const user = await User.findById(uid);
  if (!user) {
    return null;
  }
  user.online = true;
  await user.save();

  return user;
};

const userDisconnected = async (uid: string) => {
  const user = await User.findById(uid);
  if (!user) {
    return null;
  }
  user.online = false;
  await user.save();

  return user;
};

const getUsers = async () => {
  const users = await User.find().sort("-online");
  return users;
};

const saveMessage = async (payload: PayloadMessage) => {
  try {
    const message = new Message(payload);
    await message.save();

    return message;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export { userConnected, userDisconnected, getUsers, saveMessage };
