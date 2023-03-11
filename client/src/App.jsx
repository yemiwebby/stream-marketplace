import {Link, Outlet} from "react-router-dom";
import {Box, Button, ButtonGroup, Flex, Heading, Menu, MenuButton, MenuItem, MenuList, Spacer,} from "@chakra-ui/react";
import {ChevronDownIcon} from "@chakra-ui/icons";
import {useAuthContext} from "./components/context/AuthContext";
import LoginForm from "./components/authentication/LoginForm";
import {useState} from "react";

function App() {
    const {user} = useAuthContext();
    const [showModal, setShowModal] = useState(false);

    const showForm = () => {
        setShowModal(true);
    };

    const hideForm = () => {
        setShowModal(false);
    };

    const onClose = () => {
        hideForm();
    };

    return (
        <Box margin={10}>
            <Flex minWidth="max-content" alignItems="center" gap="2" mb="10">
                <Box p="2">
                    <Link to={"/"}>
                        <Heading size="md">Marketplace App</Heading>
                    </Link>
                </Box>
                <Spacer/>
                <Menu>
                    <MenuButton
                        as={Button}
                        rightIcon={<ChevronDownIcon/>}
                        colorScheme="teal"
                        variant="ghost"
                    >
                        Products
                    </MenuButton>
                    <MenuList>
                        <Link to={"/product/create"}>
                            <MenuItem>Create Product</MenuItem>
                        </Link>
                        <Link to={"/products"}>
                            <MenuItem>Show Products</MenuItem>
                        </Link>
                    </MenuList>
                </Menu>
                {!user && (
                    <ButtonGroup gap="2">
                        <Link to={"/register"}>
                            <Button colorScheme="teal" variant="ghost">
                                Sign Up
                            </Button>
                        </Link>
                        <Link to={"/login"}>
                            <Button colorScheme="teal" variant="ghost" onClick={showForm}>
                                Log in
                            </Button>
                        </Link>
                    </ButtonGroup>
                )}
                {user && (
                    <Link to={"/inbox"}>
                        <Button colorScheme="teal" variant="ghost">
                            Inbox
                        </Button>
                    </Link>
                )}
            </Flex>
            <Outlet/>
            <LoginForm
                onClose={onClose}
                header={"Login"}
                shouldShowModal={showModal}
            />
        </Box>
    );
}

export default App;
