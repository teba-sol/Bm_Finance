import React, { useState } from 'react';
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Text,
  Heading,
  useToast,
  Flex,
} from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ss from "../imagess/ssss.webp";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const toast = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/login', {
        email,
        password,
      });

      if (response.status === 200) {
        const { token, balance, name } = response.data;

        localStorage.setItem('token', token);
        localStorage.setItem('balance', balance);
        localStorage.setItem('name', name);

        toast({
          title: 'Login successful',
          description: 'Redirecting to the dashboard.',
          status: 'success',
          duration: 3000,
        });

        navigate('/dashboard');
      }
    } catch (err: any) {
      toast({
        title: 'Login failed',
        description: err.response?.data?.message || 'Invalid credentials',
        status: 'error',
        duration: 3000,
      });
    }
  };

  return (
    <Flex
      width="100%"
      height="100vh"
      justify="center"
      align="center"
      direction={['column', 'row']} 
      p={4}
    >
      <Flex
        width="full"
        maxW="lg"
        p={10}
        ml="9"
        bg="white"
        rounded="lg"
        shadow="dark-lg"
        boxShadow="2xl"
        direction="column"
      >
        <form onSubmit={handleSubmit}>
          <Stack spacing={7} width="full">
            <Heading textAlign="center" color="purple.700">
              Welcome Back!
            </Heading>

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
                _hover={{ borderColor: 'purple.500' }}
                _focus={{
                  borderColor: 'purple.500',
                  boxShadow: '0 0 5px rgba(128, 90, 213, 0.5)',
                }}
                rounded="md"
                p={4}
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                bg="gray.100"
                border="1px solid"
                borderColor="gray.300"
                _hover={{ borderColor: 'purple.500' }}
                _focus={{
                  borderColor: 'purple.500',
                  boxShadow: '0 0 5px rgba(128, 90, 213, 0.5)',
                }}
                rounded="md"
                p={4}
              />
            </FormControl>

            <Button
              type="submit"
              bgGradient="linear(to-r, purple.500, blue.500)"
              color="white"
              size="lg"
              width="full"
              mt={4}
              _hover={{ bgGradient: 'linear(to-r, purple.600, blue.600)' }}
              _active={{ bgGradient: 'linear(to-r, purple.700, blue.700)' }}
              rounded="md"
              p={6}
            >
              Login
            </Button>

            <Text mt={4} textAlign="center" fontSize="sm">
              Don't have an account?{' '}
              <Text
                as="span"
                color="blue.500"
                fontWeight="bold"
                _hover={{ textDecoration: 'underline' }}
              >
                <Link to="/signup">Sign up here</Link>
              </Text>
            </Text>
          </Stack>
        </form>
      </Flex>

      <Flex
        w="100%" 
        height="100vh"
        bgImage={ss} 
        bgSize="cover"
        bgPosition="center"
        justify="center"
        align="center"
        display={[ 'flex']} // Hide image on mobile, show it on larger screens
      />
    </Flex>
  );
};

export default LoginPage;
