import {
  ChakraProvider,
  Button,
  Heading,
  Text,
  Flex,
  Container,
  VStack,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import myim from "../assets/svg/hero-image.png";

import { FaApple, FaGoogle, FaAmazon } from "react-icons/fa";
import { useInView } from "react-intersection-observer";

import alibabaLogo from "../imagess/alibaba.jpg";

export default function Sec1() {
  const navigate = useNavigate();

  const handleGetStartedClick = () => {
    navigate("/signup");
  };

  const { ref, inView } = useInView({ triggerOnce: true });

  return (
    <ChakraProvider>
      <Container
        maxW="container.xl"
        pt={{ base: "1rem", md: "3rem" }}
        pb="4rem"
      >
        <Flex
          direction={{ base: "column", xl: "row" }}
          gap={8}
          align="center"
          justify="space-between"
          w="100%"
        >
          <VStack
            maxW={{ base: "100%", md: "28rem", xl: "40%" }}
            align={{ base: "center", xl: "flex-start" }}
            spacing={4}
            textAlign={{ base: "center", xl: "left" }}
          >
            <Heading
              as="h1"
              color="gray.900"
              size={{ base: "xl", md: "2xl" }}
              fontWeight="bold"
              mt={{ base: 8, md: 20 }}
            >
              Manage Payroll Like an Expert
            </Heading>
            <Text
              color="gray.800"
              lineHeight="tall"
              fontSize={{ base: "md", md: "lg" }}
            >
              BM helps you set up payroll without any finance skills or prior
              knowledge.
            </Text>
            <Button
              onClick={handleGetStartedClick}
              bg="gray.900"
              color="white"
              size={{ base: "md", lg: "lg" }}
              borderRadius="md"
              _hover={{
                bg: "rgba(139, 69, 19, 0.8)",
                filter: "blur(0.3px)",
                transform: "scale(1.05)",
                transition: "all 0.3s ease",
              }}
            >
              Get Started
            </Button>
          </VStack>

          <motion.div>
            <motion.img
              src={myim}
              alt="Hero Image"
              whileHover={{ scale: 1.1 }}
              style={{
                marginTop: "5%",
                maxWidth: "100%",
                height: "auto",
                display: "flex",
                margin: "0 auto",
              }}
            />
          </motion.div>
        </Flex>

        <Text
          as="h2"
          color="gray.900"
          fontSize={{ base: "lg", md: "xl", lg: "2xl" }}
          fontWeight="bold"
          mb={6}
          mt={10}
          textAlign="center"
        >
          Trusted by Global Companies
        </Text>

        <Flex
          direction="row"
          align="center"
          justify="space-around"
          wrap="wrap"
          w="80%"
          maxW="1000px"
          mx="auto"
          overflow="hidden"
          position="relative"
          gap={6}
        >
          {[FaApple, FaGoogle, FaAmazon].map((Icon, index) => (
            <motion.div
              key={index}
              ref={ref}
              animate={inView ? { x: [200, 0], y: [0, -10, 0] } : {}}
              transition={{
                type: "spring",
                stiffness: 40,
                damping: 20,
                duration: 3,
                ease: "easeInOut",
              }}
              whileHover={{ scale: 1.1 }}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "#f0f0f0",
                borderRadius: "50%",
                width: "60px",
                height: "60px",
              }}
            >
              <Icon size="30px" color="#333" />
            </motion.div>
          ))}

          <motion.div
            ref={ref}
            animate={inView ? { x: [200, 0], y: [0, -10, 0] } : {}}
            transition={{
              type: "spring",
              stiffness: 40,
              damping: 20,
              duration: 3,
              ease: "easeInOut",
            }}
            whileHover={{ scale: 1.1 }}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "#f0f0f0",
              borderRadius: "50%",
              width: "60px",
              height: "60px",
            }}
          >
            <img
              src={alibabaLogo}
              alt="Alibaba Logo"
              style={{ width: "40px", height: "40px" }}
            />
          </motion.div>
        </Flex>
      </Container>
    </ChakraProvider>
  );
}
