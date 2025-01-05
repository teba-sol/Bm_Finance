import { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Flex,
  Container,
  VStack,
  Text,
  ChakraProvider,
  useBreakpointValue,
  useDisclosure,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from "@chakra-ui/react";
import Header from "./Header";
import InfoCards from "./InfoCards";
import Sidebar from "./Sidebar";
import TransactionsTable from "./TransactionsTable ";
const DashboardPage = () => {
  const [balance, setBalance] = useState<number>(0);
  const [totalIncome, setTotalIncome] = useState<number>(0);
  const [totalExpenses, setTotalExpenses] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  const { isOpen, onOpen, onClose } = useDisclosure(); 
  const sidebarWidth = useBreakpointValue({ base: "full", md: "20%" });
  const mainContentPadding = useBreakpointValue({ base: 4, md: 6 });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("No token found");
          return;
        }

        const balanceResponse = await axios.get(
          "http://localhost:3000/current-balance",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setBalance(balanceResponse.data?.balance || 0);

        const transactionResponse = await axios.get(
          "http://localhost:3000/transactions",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const { totalIncome, totalExpenses } = transactionResponse.data;
        setTotalIncome(totalIncome || 0);
        setTotalExpenses(totalExpenses || 0);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <ChakraProvider>
      <Flex minH="100vh" bg="gray.900" direction={['column', 'row']}>
        <Box
          display={{ base: "none", md: "block" }}
          w={sidebarWidth}
          bg="gray.100"
          shadow="lg"
          h="100vh"
        >
          <Sidebar />
        </Box>

        <Drawer isOpen={isOpen} onClose={onClose} size="full">
          <DrawerOverlay>
            <DrawerContent>
              <DrawerCloseButton />
              <DrawerHeader>Sidebar</DrawerHeader>
              <DrawerBody>
                <Sidebar />
              </DrawerBody>
            </DrawerContent>
          </DrawerOverlay>
        </Drawer>

        <Box
          flex="1"
          p={mainContentPadding}
          bg="gray.900"
          h="100vh"
          overflow="hidden"
        >
          <Header onSidebarToggle={onOpen} />
          <Container maxW="container.xl" mt={4} h="full">
            <Flex direction="column" gap={6} h="full">
              <Box p={6} pt={4} shadow="lg" rounded="lg" bgGradient="#2A004E" color="black">
                <InfoCards
                  balance={balance}
                  totalIncome={totalIncome}
                  totalExpenses={totalExpenses}
                />
              </Box>

              <Box p={6} pt={0} shadow="lg" rounded="lg" bg="gray.900">
                <Text color="white" align="center" fontSize={['xl', '2xl']} mb="4" fontWeight="bold">
                  Transactions
                </Text>
                <TransactionsTable />
              </Box>
            </Flex>
          </Container>
        </Box>
      </Flex>
    </ChakraProvider>
  );
};

export default DashboardPage;
