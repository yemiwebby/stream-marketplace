import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProduct } from "../../helper/API";
import {
  Button,
  Card,
  CardBody,
  Center,
  CardFooter,
  Heading,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";

const ViewProduct = () => {
  const { _id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const load = async () => {
      const product = await getProduct({ _id });
      setProduct(product);
    };
    load();
  }, []);
  return (
    product && (
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
          <Button variant="solid" colorScheme="teal">
            Message Owner
          </Button>
        </CardFooter>
      </Card>
    )
  );
};

export default ViewProduct;
