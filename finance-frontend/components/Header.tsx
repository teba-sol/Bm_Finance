import { useEffect, useState } from "react";
import { Flex, Text } from "@chakra-ui/react";
import axios from "axios";

interface HeaderProps {
  direction?: { base: string; md: string }; 
  onSidebarToggle: () => void;
}

const Header: React.FC<HeaderProps> = ({ direction, onSidebarToggle }) => {
  const [userName, setUserName] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          setError("No token found, user not logged in");
          setLoading(false);
          return;
        }

        const response = await axios.get("http://localhost:3000/user", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data.name) {
          setUserName(response.data.name);
        } else {
          setError("User name not found in response");
        }
      } catch (err) {
        setError("Error fetching user data");
      } finally {
        setLoading(false);
      }
    };

    fetchUserName();
  }, []);

  return (
    <Flex
      justify="space-between"
      p={4}
      bg="#2A004E"
      color="white"
      width="100%"
      boxShadow="lg"
      borderRadius="md"
    >
      <Text onClick={onSidebarToggle} display={{ base: "block", md: "none" }} fontSize="lg">
        &#9776;
      </Text>
      <Text fontSize="lg">
        {loading
          ? "Loading..."
          : error
          ? error
          : `Hello ${userName || "User"}, Welcome Back!`}
      </Text>
    </Flex>
  );
};

export default Header;
