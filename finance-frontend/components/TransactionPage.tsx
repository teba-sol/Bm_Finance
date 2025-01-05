import React, { useState, useEffect } from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  useToast,
  Stack,
  Text,
  RadioGroup,
  Radio,
  HStack,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Select } from "@chakra-ui/react";

const TransactionPage = () => {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [transactionType, setTransactionType] = useState("deposit");
  const [currentBalance, setCurrentBalance] = useState(0);
  const toast = useToast();
  const navigate = useNavigate();

  const fetchBalance = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found");

      const response = await axios.get(
        "http://localhost:3000/current-balance",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setCurrentBalance(response.data.balance);
    } catch (error) {
      console.error("Error fetching balance:", error);
      toast({
        title: "Error",
        description: "Failed to fetch your current balance.",
        status: "error",
        duration: 3000,
      });
    }
  };

  useEffect(() => {
    fetchBalance();
  }, []);

  const validateDate = () => {
    const selectedDate = new Date(date);
    const today = new Date();
    return selectedDate <= today;
  };

  const handleTransactionSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const parsedAmount = parseFloat(amount);

    if (
      !amount ||
      !date ||
      isNaN(parsedAmount) ||
      parsedAmount <= 0 ||
      !validateDate() ||
      (transactionType === "withdraw" && !description)
    ) {
      toast({
        title: "Invalid Input",
        description: "Please provide valid values for all fields.",
        status: "error",
        duration: 3000,
      });
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const email = localStorage.getItem("email");

      if (!token || !email) throw new Error("Missing authentication details");

      const transactionData = {
        description,
        amount: parsedAmount,
        date,
        email,
      };

      const endpoint =
        transactionType === "deposit"
          ? "http://localhost:3000/deposit"
          : "http://localhost:3000/withdraw";

      await axios.post(endpoint, transactionData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      fetchBalance();

      toast({
        title: "Success",
        description: `Your ${transactionType} has been recorded.`,
        status: "success",
        duration: 3000,
      });

      setDescription("");
      setAmount("");
      setDate("");
      navigate("/dashboard");
    } catch (error) {
      console.error("Transaction error:", error);
      toast({
        title: "Error",
        description: "An error occurred while processing your transaction.",
        status: "error",
        duration: 3000,
      });
    }
  };

  const isAmountExceedsBalance =
    transactionType === "withdraw" && parseFloat(amount) > currentBalance;

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      bg="gray.900"
      minH="100vh"
      p={6}
    >
      <Box
        bg="gray.800"
        p={6}
        borderRadius="lg"
        boxShadow="lg"
        color="white"
        maxW="500px"
        w="full"
      >
        <Text fontSize="2xl" fontWeight="bold" mb={4}>
          Make Transaction
        </Text>
        <form onSubmit={handleTransactionSubmit}>
          <Stack spacing={4}>
            <FormControl isRequired>
              <FormLabel>Transaction Type</FormLabel>
              <RadioGroup value={transactionType} onChange={setTransactionType}>
                <HStack spacing={4}>
                  <Radio value="deposit">Deposit</Radio>
                  <Radio value="withdraw">Withdraw</Radio>
                </HStack>
              </RadioGroup>
            </FormControl>

            <FormControl isRequired>
              <FormLabel>
                {transactionType === "deposit"
                  ? "Amount to Deposit"
                  : "Amount to Withdraw"}
              </FormLabel>
              <Input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter the amount"
                size="lg"
                bg="gray.700"
                color="white"
                _focus={{
                  borderColor: "teal.300",
                  boxShadow: "0 0 0 1px teal",
                }}
                _hover={{ bg: "gray.600" }}
                isDisabled={isAmountExceedsBalance}
              />
              {isAmountExceedsBalance && (
                <Text color="red.300" fontSize="sm">
                  Insufficient balance for withdrawal
                </Text>
              )}
            </FormControl>

            <FormControl isRequired={transactionType === "withdraw"}>
              <FormLabel>Description</FormLabel>

              <Select
                placeholder="Select description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                size="lg"
                bg="gray.700"
                color="white"
                borderColor="teal.300"
                _focus={{
                  borderColor: "teal.500",
                  boxShadow: "0 0 0 1px teal.500",
                }}
                _hover={{
                  bg: "gray.600",
                }}
                sx={{
                  option: {
                    backgroundColor: "#2d3748",
                    color: "white",
                    _hover: {
                      backgroundColor: "#38b2ac",
                    },
                    _checked: {
                      backgroundColor: "#38b2ac",
                      color: "white",
                    },
                  },
                }}
              >
                <option value="food">Food</option>
                <option value="clothes">Clothes</option>
                <option value="charity">Charity</option>
                <option value="lend">Lend</option>
                <option value="household">Household</option>
                <option value="vacation">Vacation</option>
                <option value="work">Work</option>
                <option value="other">Other</option>
              </Select>
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Date</FormLabel>
              <Input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                size="lg"
                bg="gray.700"
                color="white"
                _focus={{
                  borderColor: "teal.300",
                  boxShadow: "0 0 0 1px teal",
                }}
                _hover={{ bg: "gray.600" }}
              />
            </FormControl>

            <Button
              type="submit"
              colorScheme="teal"
              size="lg"
              width="full"
              mt={4}
              _hover={{ bg: "teal.600" }}
              isDisabled={isAmountExceedsBalance}
            >
              Submit Transaction
            </Button>
          </Stack>
        </form>
      </Box>
    </Box>
  );
};

export default TransactionPage;
