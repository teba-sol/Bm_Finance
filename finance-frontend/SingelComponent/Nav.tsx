import React, { useEffect, useState } from "react";
import { useColorModeValue } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  Flex,
  HStack,
  Link,
  Show,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  IconButton,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { NavLink } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll"; // Import scroll Link for smooth scrolling
import bmm from "../assets/svg/bmm.png";
import { useNavigate } from "react-router-dom";

interface NavBarProps {
  onAboutClick: () => void;
}

const NavBar: React.FC<NavBarProps> = ({ onAboutClick }) => {
  const navigate = useNavigate();

  const handlelogin = () => {
    navigate("/login");
  };

  const [isSticky, setIsSticky] = useState(false);

  const handleScroll = () => {
    const scrollTop = window.scrollY;
    setIsSticky(scrollTop > 100);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const textColor = useColorModeValue(
    isSticky ? "white" : "white",
    isSticky ? "#ffffff" : "white"
  );

  const buttonColorScheme = useColorModeValue("blue", "teal");

  return (
    <Container maxW="full" py="" px="0">
      <Flex
        align="center"
        justify="space-between"
        bg="gray.800"
        position={isSticky ? "fixed" : "relative"}
        top={0}
        left={0}
        right={0}
        zIndex={1000}
        transition="background-color 0.3s ease, box-shadow 0.3s ease"
        boxShadow={isSticky ? "lg" : "none"}
        py={isSticky ? "0.7rem" : "1rem"}
      >
        <Box>
          <Image
            src={bmm}
            alt="BA Logo"
            boxSize="60px"
            objectFit="cover"
            borderRadius="full"
            ml="30px"
          />
        </Box>

        <Show above="md">
          <HStack spacing="5rem" flex="1" justify="end" mr={45}>
            <Link
              as={NavLink}
              to="/"
              fontWeight="bold"
              color={textColor}
              _hover={{
                textDecoration: "none",
                color: useColorModeValue("#FFD700", "#ff9800"),
              }}
              transition="color 0.3s ease"
            >
              Home
            </Link>

            <Link
              onClick={onAboutClick}
              fontWeight="bold"
              color={textColor}
              _hover={{
                textDecoration: "none",
                color: useColorModeValue("#FFD700", "#ff9800"),
              }}
              transition="color 0.3s ease"
              style={{ cursor: "pointer" }}
            >
              About
            </Link>
            <Link
              as={NavLink}
              to="/signup"
              fontWeight="bold"
              color={textColor}
              _hover={{
                textDecoration: "none",
                color: useColorModeValue("#FFD700", "#ff9800"),
              }}
              transition="color 0.3s ease"
            >
              Sign Up
            </Link>
          </HStack>
        </Show>

        <Show below="md">
  <Menu>
    <MenuButton
      as={IconButton}
      aria-label="Navigation Menu"
      icon={<HamburgerIcon />}
      variant="outline"
      color={textColor}
    />
    <MenuList>
      {["Home", "About", "Sign Up"].map((item) => (
        <MenuItem key={item}>
          {item === "About" ? (
            <Link
              onClick={onAboutClick}
              fontWeight="bold"
              color="black"
              style={{ cursor: "pointer" }}
            >
              {item}
            </Link>
          ) : item === "Sign Up" ? (
            <RouterLink
              to="/signup"
              color="black"
            >
              {item}
            </RouterLink>
          ) : (
            <ScrollLink
              to={item.toLowerCase()} 
              smooth={true}
              duration={500}
              offset={-70} 
            >
              {item}
            </ScrollLink>
          )}
        </MenuItem>
      ))}
    </MenuList>
  </Menu>
</Show>


        <Box>
          <Button
            onClick={handlelogin}
            bgGradient="linear(to-r, #1e3c72, #2a5298)"
            color="white"
            fontWeight="400"
            mr="50px"
            _hover={{
              bgGradient: "linear(to-r, #2a5298, #1e3c72)",
              transform: "scale(1.05)",
            }}
            transition="transform 0.2s ease"
          >
            Sign In
          </Button>
        </Box>
      </Flex>
    </Container>
  );
};

export default NavBar;
