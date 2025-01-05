import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, Text, VStack, Flex } from "@chakra-ui/react";
import { Fade } from "@chakra-ui/react";

const TransactionsTable: React.FC = () => {
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    const fetchTransactions = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("No token found");
          setShowError(true);
          setLoading(false);
          setTimeout(() => setShowError(false), 2000);
          return;
        }

        const response = await axios.get("http://localhost:3000/transactions", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const { transactions } = response.data;
        setTransactions(transactions || []);
      } catch (err) {
        setError("No transaction yet sir!");
        setShowError(true);
        setTimeout(() => setShowError(false), 2000);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  const formatDate = (date: string): string => {
    const d = new Date(date);
    return d.toLocaleDateString("en-US", {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
    });
  };

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="200px"
        flexDirection="column"
      >
        <Text>Loading...</Text>
      </Box>
    );
  }

  return (
    <Box maxHeight="400px" overflowY="auto" px={4}>
      <Fade in={showError}>
        <Box color="red.500" textAlign="center" mb={4}>
          <Text>{error}</Text>
        </Box>
      </Fade>

      <VStack spacing={5} mb={5} align="stretch" justify="center">
        {transactions.map((txn, index) => (
          <Box
            key={index}
            color="white"
            border="1px solid"
            borderColor={txn.amount >= 0 ? "green.500" : "red.500"}
            borderRadius="lg"
            boxShadow="md"
            p={4}
            w={["full", "80%", "60%"]}
            maxW="1000px"
            mx="auto"
            _hover={{
              boxShadow: "xl",
              transform: "scale(1.05)",
              transition: "transform 0.2s ease-in-out",
            }}
          >
            <Flex
              direction={["column", "row"]}
              justify="space-between"
              align="flex-start"
              gap={4}
            >
              <Box>
                <Text fontSize={["sm", "md"]} fontWeight="bold" color="white">
                  Date
                </Text>
                <Text fontSize={["md", "lg"]}>{formatDate(txn.date)}</Text>
              </Box>
              <Box>
                <Text fontSize={["sm", "md"]} fontWeight="bold" color="white">
                  Description
                </Text>
                <Text fontSize={["md", "lg"]}>{txn.description}</Text>
              </Box>
              <Box>
                <Text fontSize={["sm", "md"]} fontWeight="bold" color="white">
                  Amount
                </Text>
                <Text
                  fontSize={["lg", "xl"]}
                  fontWeight="bold"
                  color={txn.amount >= 0 ? "green.500" : "red.500"}
                >
                  {txn.amount >= 0
                    ? `+ $${txn.amount}`
                    : `- $${Math.abs(txn.amount)}`}
                </Text>
              </Box>
            </Flex>
          </Box>
        ))}
      </VStack>
    </Box>
  );
};

export default TransactionsTable;
