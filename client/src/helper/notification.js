import { createStandaloneToast } from "@chakra-ui/toast";

const { toast } = createStandaloneToast();

export const showNotification = ({ title, isSuccess }) => {
  toast({
    title: title,
    position: "top-right",
    isClosable: true,
    variant: "subtle",
    status: isSuccess ? "success" : "error",
  });
};
