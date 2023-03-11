import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
} from "@chakra-ui/react";

const WrappedNumberInput = ({
  label,
  field,
  isInvalid,
  errorMessage,
  isRequired,
  onChangeHandler,
}) => {
  return (
    <FormControl isInvalid={isInvalid} isRequired={isRequired} mt={4}>
      <FormLabel>{label}</FormLabel>
      <NumberInput {...field} onChange={onChangeHandler}>
        <NumberInputField />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
      <FormErrorMessage>{errorMessage}</FormErrorMessage>
    </FormControl>
  );
};

export default WrappedNumberInput;
