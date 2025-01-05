import React, { useEffect, useState, useRef } from "react";
import {
  Box,
  Text,
  Heading,
  Flex,
  Image,
  Stack,
  Button,
  SimpleGrid,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import bmm from "../imagess/bmm.jpg";

const AboutCompany: React.FC = () => {
  const [users, setUsers] = useState(0);
  const [subscribers, setSubscribers] = useState(0);
  const [downloads, setDownloads] = useState(0);
  const [products, setProducts] = useState(0);
  const [hasStartedCounting, setHasStartedCounting] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const aboutRef = useRef<HTMLDivElement | null>(null);

  const spring = {
    type: "spring",
    damping: 8,
    stiffness: 120,
  };

  const MotionBox = motion(Box);

  const countUp = (
    setter: React.Dispatch<React.SetStateAction<number>>,
    target: number
  ) => {
    let count = 0;
    const increment = 10;
    const interval = setInterval(() => {
      if (count < target) {
        count += increment;
        setter(count > target ? target : count);
      } else {
        clearInterval(interval);
      }
    }, 10);
  };

  useEffect(() => {
    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      if (entries[0].isIntersecting && !hasStartedCounting) {
        setHasStartedCounting(true);
        countUp(setUsers, 600);
        countUp(setSubscribers, 300);
        countUp(setDownloads, 112);
        countUp(setProducts, 50);
        setTimeout(() => {
          setIsVisible(true);
        }, 300);
      }
    };

    const observer = new IntersectionObserver(handleIntersection);
    if (aboutRef.current) {
      observer.observe(aboutRef.current);
    }

    return () => {
      if (aboutRef.current) {
        observer.unobserve(aboutRef.current);
      }
    };
  }, [hasStartedCounting]);

  return (
    <Box
      bgGradient="linear(to-r, #1a202c, #2d3748)"
      py={16}
      ref={aboutRef}
      id="about"
    >
      <Flex
        direction={{ base: "column", md: "row" }}
        align="stretch"
        justify="space-between"
        maxW="container.xl"
        mx="auto"
        px={{ base: 4, md: 6 }}
      >
        <Stack spacing={6} flex={1} color="white" justify="space-between">
          <MotionBox
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 50 }}
            transition={{ duration: 0.6 }}
          >
            <Heading
              as="h2"
              size="xl"
              textTransform="uppercase"
              letterSpacing="wide"
            >
              About Our App
            </Heading>
            <Text fontSize={{ base: "md", md: "lg" }} mt={4} color="gray.300">
              We aim to revolutionize how you manage finances. Offering
              cutting-edge tools for tracking and analyzing your financial
              activities, our app is designed to empower users with intuitive
              and secure solutions.
            </Text>
          </MotionBox>

          <SimpleGrid columns={{ base: 2, md: 4 }} spacing={4} mt={6}>
            {[
              { label: "Users", value: users },
              { label: "Subscribers", value: subscribers },
              { label: "Downloads", value: downloads },
              { label: "Products", value: products },
            ].map((stat, index) => (
              <MotionBox
                key={index}
                p={6}
                bg="gray.700"
                borderRadius="lg"
                boxShadow="xl"
                textAlign="center"
                whileHover={{ scale: 1.08, rotate: 1 }}
                transition={spring}
              >
                <Text
                  fontSize={{ base: "3xl", md: "4xl" }}
                  fontWeight="bold"
                  color="teal.300"
                >
                  {stat.value}+
                </Text>
                <Text fontSize={{ base: "sm", md: "md" }} color="gray.400">
                  {stat.label}
                </Text>
              </MotionBox>
            ))}
          </SimpleGrid>

          <MotionBox
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : -50 }}
            transition={{ duration: 0.7 }}
            mt={8}
          >
            <Heading as="h3" size="lg" color="teal.300">
              Why Choose Us?
            </Heading>
            <Text mt={2} fontSize={{ base: "sm", md: "md" }} color="gray.300">
              - Seamlessly manage your finances with real-time updates.
              <br />- Track expenses and income with ease.
              <br />- Intuitive dashboards for clear financial insights.
              <br />- Secure and user-friendly experience.
            </Text>
            <Button
              mt={4}
              bgGradient="linear(to-r, teal.500, blue.500)"
              color="white"
              _hover={{
                bgGradient: "linear(to-r, blue.500, teal.500)",
                boxShadow: "lg",
                transform: "scale(1.05)",
              }}
              onClick={() => (window.location.href = "/learn-more")}
            >
              Learn More
            </Button>
          </MotionBox>
        </Stack>

        <MotionBox
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : 50 }}
          transition={{ duration: 0.7 }}
          mt={{ base: 10, md: 0 }}
          ml={{ md: 6 }}
          flex={1}
          maxW="450px"
        >
          <Image
            src={bmm}
            alt="Finance"
            borderRadius="lg"
            boxShadow="3xl"
            objectFit="cover"
            height="auto"
            mt={10}
            width="100%"
          />
        </MotionBox>
      </Flex>
    </Box>
  );
};

export default AboutCompany;
