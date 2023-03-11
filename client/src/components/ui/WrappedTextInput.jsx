import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Textarea,
} from "@chakra-ui/react";

const WrappedTextInput = ({
  type,
  label,
  field,
  isInvalid,
  errorMessage,
  isRequired,
}) => {
  const input =
    type === "textArea" ? (
      <Textarea placeholder={label} {...field} />
    ) : (
      <Input type={type} {...field} placeholder={label} />
    );
  return (
    <FormControl isInvalid={isInvalid} isRequired={isRequired} mt={4}>
      <FormLabel>{label}</FormLabel>
      {input}
      {/*<Input type={type} {...field} placeholder={label}/>*/}
      <FormErrorMessage>{errorMessage}</FormErrorMessage>
    </FormControl>
  );
};

export default WrappedTextInput;
