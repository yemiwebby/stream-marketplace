import * as Yup from "yup";
import { Field, Form, Formik } from "formik";
import { Button, Container } from "@chakra-ui/react";
import WrappedTextInput from "../ui/WrappedTextInput";
import WrappedNumberInput from "../ui/WrappedNumberInput";
import { useAuthContext } from "../context/AuthContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "../authentication/LoginForm";
import { createProduct } from "../../helper/API";

const CreateProductForm = () => {
  const { bearerToken } = useAuthContext();
  const [showModal, setShowModal] = useState(!bearerToken);
  const navigate = useNavigate();

  const hideForm = () => {
    setShowModal(false);
  };

  const onClose = () => {
    hideForm();
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Product name is required"),
    description: Yup.string()
      .required("Product description is required")
      .min(200, "Product description must be at least 200 characters"),
    quantity: Yup.number()
      .integer("Please provide a whole number")
      .required("Product quantity is required"),
    price: Yup.number().required("Product price is required"),
    productUrl: Yup.string().url("Please provide a valid URL"),
  });

  const initialValues = {
    name: "",
    description: "",
    quantity: 0,
    price: 0,
    productUrl: "",
  };

  const onSubmit = async (values) => {
    const response = await createProduct({ values, bearerToken });
    if (response.product) {
      navigate(`/product/${response.product._id}`);
    }
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values, { resetForm }) => {
          await onSubmit(values);
        }}
      >
        {(props) => (
          <Form>
            <Container w="60%" h="100%" centerContent mt={20}>
              <Field name="name">
                {({ field, form }) => (
                  <WrappedTextInput
                    type="text"
                    field={field}
                    label="Product Name"
                    isInvalid={form.errors.name && form.touched.name}
                    errorMessage={form.errors.name}
                    isRequired={true}
                  />
                )}
              </Field>
              <Field name="description">
                {({ field, form }) => (
                  <WrappedTextInput
                    type="textArea"
                    field={field}
                    label="Product Description"
                    isInvalid={
                      form.errors.description && form.touched.description
                    }
                    errorMessage={form.errors.description}
                    isRequired={true}
                  />
                )}
              </Field>

              <Field name="quantity">
                {({ field, form }) => (
                  <WrappedNumberInput
                    field={field}
                    label="Product Quantity"
                    onChangeHandler={(value) =>
                      form.setFieldValue(field.name, value)
                    }
                    isInvalid={form.errors.quantity && form.touched.quantity}
                    errorMessage={form.errors.quantity}
                    isRequired={true}
                  />
                )}
              </Field>

              <Field name="price">
                {({ field, form }) => (
                  <WrappedNumberInput
                    field={field}
                    label="Product Price"
                    onChangeHandler={(value) =>
                      form.setFieldValue(field.name, value)
                    }
                    isInvalid={form.errors.price && form.touched.price}
                    errorMessage={form.errors.price}
                    isRequired={true}
                  />
                )}
              </Field>

              <Field name="productUrl">
                {({ field, form }) => (
                  <WrappedTextInput
                    type="text"
                    field={field}
                    label="Product Image URL"
                    isInvalid={
                      form.errors.productUrl && form.touched.productUrl
                    }
                    errorMessage={form.errors.productUrl}
                    isRequired={false}
                  />
                )}
              </Field>
              <Button
                mt={4}
                colorScheme="teal"
                isLoading={props.isSubmitting}
                type="submit"
              >
                Submit
              </Button>
            </Container>
          </Form>
        )}
      </Formik>
      <LoginForm
        onClose={onClose}
        header={"You must be logged in to continue"}
        shouldShowModal={showModal}
      />
    </>
  );
};

export default CreateProductForm;
