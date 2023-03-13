import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getProduct } from "../../helper/API.js";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Center,
  Heading,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import {
  Channel,
  ChannelHeader,
  Chat,
  MessageInput,
  MessageList,
  Thread,
  Window,
} from "stream-chat-react";
import { useAuthContext } from "../context/AuthContext.jsx";
import { useClient } from "../../hooks/useStreamClient.js";
import "stream-chat-react/dist/css/v2/index.css";

const ViewProduct = () => {
  const { _id } = useParams();
  const [product, setProduct] = useState(null);
  const [showChat, setShowChat] = useState(false);
  const [channel, setChannel] = useState(null);
  const [belongsToUser, setBelongsToUser] = useState(false);
  const [canShowChat, setCanShowChat] = useState(false);

  const { user, streamToken } = useAuthContext();
  const chatClient = useClient({ user, streamToken });
  const navigate = useNavigate();

  useEffect(() => {
    const load = async () => {
      const product = await getProduct({ _id });
      setProduct(product);
    };
    load();
  }, []);

  useEffect(() => {
    if (user) {
      setBelongsToUser(product?.owner === user.id);
      setCanShowChat(channel && !belongsToUser);
    } else {
      setCanShowChat(false);
    }
  }, [user, product, channel]);

  useEffect(() => {
    if (chatClient) {
      const channel = chatClient.channel("messaging", `${user.id}_${product._id}`, {
        name: user.name,
        members: [user.id, product.owner],
      });
      setChannel(channel);
    }
  }, [chatClient]);

  const onMessageButtonClick = () => {
    if (belongsToUser) {
      navigate("/inbox");
    } else {
      setShowChat(true);
    }
  };

  return (
    product && (
      <Stack spacing={8} direction="row">
        <Card align="center">
          <CardBody>
            <Center>
              <Image
                src={product.productUrl}
                alt={product.name}
                borderRadius="lg"
                fallbackSrc="https://via.placeholder.com/500"
              />
            </Center>
            <Stack mt="6" spacing="3">
              <Heading size="md">{product.name}</Heading>
              <Text color="teal.600">
                ₦{product.price} ({product.quantity} items left)
              </Text>
              <Text>{product.description}</Text>
            </Stack>
          </CardBody>
          <CardFooter>
            {chatClient && (
              <Button variant="solid" colorScheme="teal" onClick={onMessageButtonClick}>
                {belongsToUser ? "View Inbox" : "Message Owner"}
              </Button>
            )}
          </CardFooter>
        </Card>
        {showChat && canShowChat && (
          <Chat client={chatClient} theme="str-chat__theme-light">
            <Channel channel={channel}>
              <Window>
                <ChannelHeader />
                <MessageList />
                <MessageInput />
              </Window>
              <Thread />
            </Channel>
          </Chat>
        )}
      </Stack>
    )
  );
};

export default ViewProduct;
