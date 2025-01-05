import React from 'react';
import {
  Box,
  Container,
  Flex,
  Heading,
  Text,
  Link,
  Stack,
  Divider,
  useColorModeValue,
} from '@chakra-ui/react';

const Footer: React.FC = () => {
  return (
    <Box bg="gray.800" color="white" py={10}>
      <Container maxW="container.xl">
        <Flex
          direction={{ base: 'column', md: 'row' }}
          justify="space-between"
          align="flex-start"
        >
          <Stack spacing={4} flex="1" mb={{ base: 4, md: 0 }}>
            <Heading as="h3" size="lg">
              <span className='text-orange-800'>BM SOLUTION</span>
            </Heading>
            <Stack spacing={2}>
              <Link href="#" fontWeight="bold" _hover={{ color: 'orange.400' }}>
                Manage now
              </Link>
              <Link href="#" fontWeight="bold" _hover={{ color: 'orange.400' }}>
                Join Hub
              </Link>
            </Stack>
          </Stack>

          <Stack spacing={4} flex="1" mb={{ base: 4, md: 0 }}>
            <Heading as="h4" size="md">
              Links
            </Heading>
            <Stack spacing={1}>
              <Link href="#" _hover={{ color: 'orange.400' }}>
                Blog
              </Link>
              <Link href="#" _hover={{ color: 'orange.400' }}>
                White Paper
              </Link>
              <Link href="#" _hover={{ color: 'orange.400' }}>
                Github
              </Link>
              <Link href="#" _hover={{ color: 'orange.400' }}>
                Brand Asset Guide
              </Link>
            </Stack>
          </Stack>

          <Stack spacing={4} flex="1" mb={{ base: 4, md: 0 }}>
            <Heading as="h4" size="md">
              Community
            </Heading>
            <Stack spacing={1}>
              <Link href="#" _hover={{ color: 'orange.400' }}>
                Discord
              </Link>
              <Link href="#" _hover={{ color: 'orange.400' }}>
                Forums
              </Link>
              <Link href="#" _hover={{ color: 'orange.400' }}>
                Youtube
              </Link>
            </Stack>
          </Stack>

          <Stack spacing={4} flex="1">
            <Heading as="h4" size="md">
              Webapp
            </Heading>
            <Text>Feel free to know your your money goes!.</Text>
            <Link href="#" color="teal.400" _hover={{ color: 'orange.400' }}>
              Testnet Faucet
            </Link>
          </Stack>
        </Flex>
      </Container>
      <Divider orientation="horizontal" borderColor="rgba(255, 255, 255, 0.2)" my={4} />
    </Box>
  );
};

export default Footer;
