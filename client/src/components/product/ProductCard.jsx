import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Heading,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (
    <Card align="center">
      <CardBody>
        <Image
          src={product.productUrl}
          alt={product.name}
          borderRadius="lg"
          fallbackSrc="https://via.placeholder.com/400"
        />
        <Stack mt="6" spacing="3">
          <Heading size="md">{product.name}</Heading>
          <Text color="teal.600">
            ₦{product.price} ({product.quantity} items left)
          </Text>
        </Stack>
      </CardBody>
      <CardFooter>
        <Link to={`/product/${product._id}`}>
          <Button variant="solid" colorScheme="teal">
            View
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
