import {
  Channel,
  ChannelHeader,
  ChannelList,
  Chat,
  LoadingIndicator,
  MessageInput,
  MessageList,
  Thread,
  Window,
} from "stream-chat-react";
import { Stack } from "@chakra-ui/react";
import { useClient } from "../../hooks/useStreamClient";
import "stream-chat-react/dist/css/v2/index.css";
import { useAuthContext } from "../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Inbox = () => {
  const { user, streamToken } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user]);

  const filters = { type: "messaging", members: { $in: [user?.id] } };
  const sort = { last_message_at: -1 };

  const chatClient = useClient({ user, streamToken });

  if (!chatClient) {
    return <LoadingIndicator />;
  }

  return (
    <Stack spacing={8} direction="row">
      <Chat client={chatClient} theme="str-chat__theme-light">
        <ChannelList filters={filters} sort={sort} />
        <Channel>
          <Window>
            <ChannelHeader />
            <MessageList />
            <MessageInput />
          </Window>
          <Thread />
        </Channel>
      </Chat>
    </Stack>
  );
};

export default Inbox;
