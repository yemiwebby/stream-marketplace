import { StreamChat } from "stream-chat";

const streamClient = () => {
  const apiKey = process.env.STREAM_API_KEY;
  const apiSecret = process.env.STREAM_API_SECRET;

  return StreamChat.getInstance(apiKey, apiSecret);
};

export const getStreamToken = (user) => streamClient().createToken(user._id.toString());

export const syncUser = async ({ _id }) => {
  await streamClient().upsertUser({
    id: _id.toString(),
  });
};

export const syncUsers = (users) => {
  users.forEach(syncUser);
};
