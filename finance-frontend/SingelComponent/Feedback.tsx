import React from "react";
import {
  Box,
  Text,
  Heading,
  SimpleGrid,
  Container,
  HStack,
} from "@chakra-ui/react";
import { FaStar } from "react-icons/fa";

const feedbacks = [
  {
    name: "Bibe Solomon",
    comment: "This app is awesome!",
    rating: 5,
  },
  {
    name: "Jane Smith",
    comment: "A fantastic experience using this app!",
    rating: 4,
  },
  {
    name: "Tomi Abera",
    comment: "Highly recommend for anyone looking to manage finances!",
    rating: 5,
  },
  {
    name: "Saron Solomon",
    comment: "User-friendly and efficient!",
    rating: 3,
  },
  {
    name: "Alex Dawit",
    comment: "Great features and support!",
    rating: 4,
  },
  {
    name: "Sarah Wilson",
    comment: "A must-have app for tracking expenses!",
    rating: 5,
  },
];

const Feedback: React.FC = () => {
  return (
    <Box bg="gray.900" py={10} mt={7}>
      <Container maxW="container.xl">
        <Heading as="h2" size="xl" textAlign="center" color="white" mb={8}>
          Discover Why People Love This Service
        </Heading>
        <Text color="gray.400" textAlign="center" mb={8}>
          helps users track expenses, manage transactions, and visualize their
          financial health with an intuitive dashboard.
        </Text>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
          {feedbacks.map((feedback, index) => (
            <Box
              key={index}
              bg="gray.700"
              borderRadius="md"
              p={5}
              boxShadow="lg"
              transition="transform 0.2s"
              _hover={{ transform: "scale(1.05)" }}
              color="white"
              textAlign="center"
            >
              <Text fontWeight="bold" mt={3} fontSize="lg">
                {feedback.name}
              </Text>
              <Text mt={2} fontStyle="italic" color="gray.300">
                {feedback.comment}
              </Text>

              <HStack spacing={1} justify="center" mt={4}>
                {[...Array(5)].map((_, i) => (
                  <FaStar
                    key={i}
                    color={i < feedback.rating ? "yellow" : "gray.300"}
                    size={20}
                  />
                ))}
              </HStack>
            </Box>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
};

export default Feedback;
