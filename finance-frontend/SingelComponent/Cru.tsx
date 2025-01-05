import React, { useState, useEffect, useRef } from "react";
import { Box, Flex, Heading, Text, Image, IconButton } from "@chakra-ui/react";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import { motion } from "framer-motion";
import pic1 from "../imagess/pic1.jpg";
import wm from "../imagess/women.jpg";
import ermi from "../assets/photo_2025-01-05_01-20-24.jpg";
import nati from "../assets/photo_2024-11-08_06-06-38.jpg";

const crewMembers = [
  {
    name: "Tebibu Solomon",
    role: "Product Manager",
    image: pic1,
    github: "https://github.com/teba-sol",
    linkedIn: "https://linkedin.com/in/tebibu-solomon-4aba64320",
  },
  {
    name: "Ermiyas Getahun",
    role: "Tech Lead",
    image: ermi,
    github: "https://github.com/ErmiasGet",
    linkedIn: "https://www.linkedin.com/in/ermias-getahun-919623279",
  },
  {
    name: "Hana Ross",
    role: "Frontend Developer",
    image: wm,
    github: "https://github.com/ashley-ross",
  },
  {
    name: "Bruce Rogers",
    role: "Backend Developer",
    image: nati,
    github: "https://github.com/bruce-rogers",
  },
];

const Cru: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const crewRef = useRef<HTMLDivElement | null>(null);

  const spring = { type: "spring", damping: 10, stiffness: 100 };
  const MotionBox = motion(Box);

  useEffect(() => {
    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      if (entries[0].isIntersecting) {
        setIsVisible(true);
      }
    };

    const observer = new IntersectionObserver(handleIntersection);
    if (crewRef.current) observer.observe(crewRef.current);

    return () => {
      if (crewRef.current) observer.unobserve(crewRef.current);
    };
  }, []);

  return (
    <Box bg="gray.900" py={10} px={4} ref={crewRef}>
      <Heading as="h2" size="2xl" color="white" textAlign="center" mb={8}>
        Our Dedicated Crew
      </Heading>
      <Flex
        direction={{ base: "column", md: "row" }}
        justify="center"
        align="center"
        flexWrap="wrap"
      >
        {crewMembers.map((member, index) => (
          <MotionBox
            key={index}
            bg="gray.800"
            borderRadius="md"
            boxShadow="lg"
            p={5}
            m={4}
            textAlign="center"
            maxW="250px"
            initial={{ opacity: 0, y: 50 }}
            animate={{
              opacity: isVisible ? 1 : 0,
              y: isVisible ? [0, 10, 0] : 50,
            }}
            whileHover={{
              scale: 1.05,
              y: 0,
            }}
            transition={{
              y: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 2,
                ease: "easeInOut",
              },
              opacity: { duration: 0.6 },
            }}
            display="flex"
            alignItems="center"
            justifyContent="center"
            flexDirection="column"
          >
            <Image
              src={member.image}
              alt={member.name}
              borderRadius="full"
              boxSize="100px"
              mb={4}
              objectFit="cover"
            />
            <Heading as="h3" size="lg" mb={1} color="white">
              {member.name}
            </Heading>
            <Text color="gray.300" mb={3}>
              {member.role}
            </Text>
            <Flex justify="center">
              <IconButton
                as="a"
                href={member.linkedIn}
                aria-label="LinkedIn"
                icon={<FaLinkedin />}
                colorScheme="blue"
                variant="outline"
                mr={2}
                color="black"
              />
              <IconButton
                as="a"
                href={member.github}
                aria-label="GitHub"
                icon={<FaGithub />}
                colorScheme="blue"
                variant="outline"
                color="black"
              />
            </Flex>
          </MotionBox>
        ))}
      </Flex>
    </Box>
  );
};

export default Cru;
