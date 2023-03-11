import * as Yup from "yup";
import {Field, Form, Formik} from "formik";
import {Button, Container} from "@chakra-ui/react";
import WrappedTextInput from "../ui/WrappedTextInput";
import PasswordInput from "../ui/PasswordInput";
import {register} from "../../helper/API";
import {useAuthContext} from "../context/AuthContext";
import {useNavigate} from "react-router-dom";

const RegistrationForm = () => {
    const {saveAuthCredentials} = useAuthContext();
    const navigate = useNavigate();
    const validationSchema = Yup.object({
        name: Yup.string().required("Full name is required"),
        email: Yup.string()
            .email("Please provide a valid email address")
            .required("Email address is required"),
        password: Yup.string()
            .required("Password is required")
            .min(8, "Password must be at least 8 characters"),
        passwordConfirmation: Yup.string()
            .required("Password confirmation is required")
            .min(8, "Password confirmation must be at least 8 characters")
            .oneOf([Yup.ref("password"), null], "Passwords must match"),
    });

    const initialValues = {
        name: "",
        email: "",
        password: "",
        passwordConfirmation: "",
    };

    const onSubmit = async (values) => {
        const {user, bearerToken} = await register(values);
        if (user && bearerToken) {
            saveAuthCredentials({user, bearerToken});
            navigate("/");
        }
    };

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={async (values, {resetForm}) => {
                await onSubmit(values);
                resetForm();
            }}
        >
            {(props) => (
                <Form>
                    <Container w="60%" h="100%" centerContent mt={20}>
                        <Field name="name">
                            {({field, form}) => (
                                <WrappedTextInput
                                    type="text"
                                    field={field}
                                    label="Full Name"
                                    isInvalid={form.errors.name && form.touched.name}
                                    errorMessage={form.errors.name}
                                    isRequired={true}
                                />
                            )}
                        </Field>
                        <Field name="email">
                            {({field, form}) => (
                                <WrappedTextInput
                                    type="email"
                                    field={field}
                                    label="Email Address"
                                    isInvalid={form.errors.email && form.touched.email}
                                    errorMessage={form.errors.email}
                                    isRequired={true}
                                />
                            )}
                        </Field>
                        <Field name="password">
                            {({field, form}) => (
                                <PasswordInput
                                    type="password"
                                    field={field}
                                    label="Password"
                                    isInvalid={form.errors.password && form.touched.password}
                                    errorMessage={form.errors.password}
                                    isRequired={true}
                                />
                            )}
                        </Field>
                        <Field name="passwordConfirmation">
                            {({field, form}) => (
                                <PasswordInput
                                    type="passwordConfirmation"
                                    field={field}
                                    label="Password"
                                    isInvalid={
                                        form.errors.passwordConfirmation &&
                                        form.touched.passwordConfirmation
                                    }
                                    errorMessage={form.errors.passwordConfirmation}
                                    isRequired={true}
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
    );
};

export default RegistrationForm;
