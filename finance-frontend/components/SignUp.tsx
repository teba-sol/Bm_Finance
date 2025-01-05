import React, { useState } from "react";
import pp1 from "../imagess/002.jpg";
import {
  Flex,
  Stack,
  FormControl,
  FormLabel,
  Input,
  Button,
  Heading,
  Text,
  useToast,
  InputGroup,
  InputRightElement,
  IconButton,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import axios from "axios";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!passwordRegex.test(password)) {
      toast({
        title: "Invalid Password",
        description: "Password must meet the required criteria.",
        status: "error",
        duration: 5000,
      });
      return;
    }

    if (password !== confirmPassword) {
      toast({
        title: "Passwords don't match.",
        status: "error",
        duration: 3000,
      });
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/register", {
        name,
        email,
        password,
      });

      if (response.status === 201) {
        toast({
          title: "Account Created",
          description: "You can now log in.",
          status: "success",
          duration: 3000,
        });
        navigate("/login");
      }
    } catch (err) {
      toast({
        title: "Registration Failed",
        description: "Please try again.",
        status: "error",
        duration: 3000,
      });
    }
  };

  return (
    <Flex
      width="100%"
      height="100vh"
      direction={["column", "row"]}
      justify="center"
      align="center"
      p={4}
    >
      <Flex
        w="full"
        maxW="lg"
        direction="column"
        p={10}
        bg="white"
        rounded="lg"
        boxShadow="xl"
      >
        <form onSubmit={handleSubmit}>
          <Stack spacing={6} width="full">
            <Heading textAlign="center" color="purple.700">
              Create Account
            </Heading>

            <FormControl isRequired>
              <FormLabel>Username</FormLabel>
              <Input
                type="text"
                placeholder="Enter your username"
                value={name}
                onChange={(e) => setName(e.target.value)}
                bg="gray.100"
                border="1px solid"
                borderColor="gray.300"
                _hover={{ borderColor: "purple.500" }}
                _focus={{
                  borderColor: "purple.500",
                  boxShadow: "0 0 5px rgba(128, 90, 213, 0.5)",
                }}
                rounded="md"
                p={4}
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                bg="gray.100"
                border="1px solid"
                borderColor="gray.300"
                _hover={{ borderColor: "purple.500" }}
                _focus={{
                  borderColor: "purple.500",
                  boxShadow: "0 0 5px rgba(128, 90, 213, 0.5)",
                }}
                rounded="md"
                p={4}
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  bg="gray.100"
                  border="1px solid"
                  borderColor="gray.300"
                  _hover={{ borderColor: "purple.500" }}
                  _focus={{
                    borderColor: "purple.500",
                    boxShadow: "0 0 5px rgba(128, 90, 213, 0.5)",
                  }}
                  rounded="md"
                  p={4}
                />
                <InputRightElement>
                  <IconButton
                    aria-label="Toggle password visibility"
                    icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
                    onClick={() => setShowPassword(!showPassword)}
                    variant="ghost"
                    size="sm"
                  />
                </InputRightElement>
              </InputGroup>
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Confirm Password</FormLabel>
              <InputGroup>
                <Input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  bg="gray.100"
                  border="1px solid"
                  borderColor="gray.300"
                  _hover={{ borderColor: "purple.500" }}
                  _focus={{
                    borderColor: "purple.500",
                    boxShadow: "0 0 5px rgba(128, 90, 213, 0.5)",
                  }}
                  rounded="md"
                  p={4}
                />
                <InputRightElement>
                  <IconButton
                    aria-label="Toggle confirm password visibility"
                    icon={showConfirmPassword ? <ViewOffIcon /> : <ViewIcon />}
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    variant="ghost"
                    size="sm"
                  />
                </InputRightElement>
              </InputGroup>
            </FormControl>

            <Button
              type="submit"
              bgGradient="linear(to-r, purple.500, blue.500)"
              color="white"
              size="lg"
              width="full"
              _hover={{ bgGradient: "linear(to-r, purple.600, blue.600)" }}
              p={6}
              rounded="md"
            >
              Sign Up
            </Button>

            <Text mt={4} textAlign="center" fontSize="sm">
              Already have an account?{" "}
              <Text
                as="span"
                color="blue.500"
                fontWeight="bold"
                _hover={{ textDecoration: "underline" }}
              >
                <Link to="/login">Login here</Link>
              </Text>
            </Text>
          </Stack>
        </form>
      </Flex>

      <Flex
        w={["full", "50%"]}
        height="100vh"
        bgImage={pp1}
        bgSize="cover"
        bgPosition="center"
        justify="center"
        align="center"
      />
    </Flex>
  );
};

export default SignUp;
