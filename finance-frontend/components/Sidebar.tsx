import { VStack, Text, Box, Button } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");

    navigate("/"); 
  };

  return (
    <Box
      h="100%"
      p={4}
      bg="gray.900"
      color="white"
      boxShadow="xl"
      borderRadius="none"
      position="relative"
      _after={{
        content: '""',
        position: "absolute",
        top: 0,
        right: 0,
        height: "100%",
        width: "10px",
        background: "rgba(255, 255, 255, 0.2)",
        boxShadow: "0 4px 12px rgba(255, 255, 255, 0.3)", 
      }}
      display="flex"
      flexDirection="column"
      justifyContent="space-between" 
    >
      <VStack spacing={6} align="flex-start">
        <Text fontSize="3xl" fontWeight="bold" mb={8}>
          Dashboard
        </Text>
        {["Transaction"].map((item) => (
          <Link key={item} to={item === "Transaction" ? "/transaction" : ""}>
            <Button
            ml="7"
              variant="solid"
              colorScheme="blue"
              size="lg"
              width="100%"
              _hover={{
                bg: "blue.800",
                transform: "scale(1.05)",
                transition: "all 0.3s ease-in-out",
              }}
              mb={4}
            >
              {item}
            </Button>
          </Link>
        ))}
      </VStack>
      <Button
        mb="6"
        ml="7"
        onClick={handleLogout}
        colorScheme="red"
        w="50%"
        mt="auto"
        _hover={{ bg: "red.600" }}
      >
        Logout
      </Button>
    </Box>
  );
};

export default Sidebar;
