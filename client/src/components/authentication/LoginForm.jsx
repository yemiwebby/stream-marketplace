import * as Yup from "yup";
import {Field, Form, Formik} from "formik";
import {
    Button,
    Container,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
} from "@chakra-ui/react";
import WrappedTextInput from "../ui/WrappedTextInput";
import PasswordInput from "../ui/PasswordInput";
import {login} from "../../helper/API";
import {useAuthContext} from "../context/AuthContext";

const LoginForm = ({header, onClose, shouldShowModal}) => {
    const {saveAuthCredentials} = useAuthContext();

    const validationSchema = Yup.object({
        email: Yup.string()
            .email("Please provide a valid email address")
            .required("Email address is required"),
        password: Yup.string()
            .required("Password is required")
            .min(8, "Password must be at least 8 characters"),
    });

    const initialValues = {
        email: "",
        password: "",
    };

    const onSubmit = async (values) => {
        const {user, bearerToken} = await login(values);
        if (user && bearerToken) {
            saveAuthCredentials({user, bearerToken});
            onClose();
        }
    };

    return (
        <Modal
            closeOnOverlayClick={false}
            isOpen={shouldShowModal}
            onClose={onClose}
            size="lg"
        >
            <ModalOverlay/>
            <ModalContent>
                <ModalHeader>{header}</ModalHeader>
                <ModalCloseButton/>
                <ModalBody>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={async (values, {resetForm}) => {
                            resetForm();
                            await onSubmit(values);
                        }}
                    >
                        {(props) => (
                            <Form>
                                <Container h="100%" centerContent>
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
                                                field={field}
                                                label="Password"
                                                isInvalid={
                                                    form.errors.password && form.touched.password
                                                }
                                                errorMessage={form.errors.password}
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
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};

export default LoginForm;
