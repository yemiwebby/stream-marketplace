import { useEffect, useState } from "react";
import { StreamChat } from "stream-chat";

export const useClient = ({ user, streamToken }) => {
  const [chatClient, setChatClient] = useState(null);
  const apiKey = import.meta.env.VITE_STREAM_CHAT_KEY;

  useEffect(() => {
    if (user && streamToken) {
      const client = new StreamChat(apiKey);
      // prevents application from setting stale client (user changed, for example)
      let didUserConnectInterrupt = false;

      const connectionPromise = client.connectUser(user, streamToken).then(() => {
        if (!didUserConnectInterrupt) setChatClient(client);
      });
      return () => {
        didUserConnectInterrupt = true;
        setChatClient(null);
        // wait for connection to finish before initiating closing sequence
        connectionPromise
          .then(() => client.disconnectUser())
          .then(() => {
            console.log("connection closed");
          });
      };
    }
  }, [apiKey, user, streamToken]);

  return chatClient;
};
