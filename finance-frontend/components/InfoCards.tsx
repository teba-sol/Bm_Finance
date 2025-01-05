import { SimpleGrid, Box, Text } from "@chakra-ui/react";

interface InfoCardsProps {
  balance: number | null;
  totalIncome: number;
  totalExpenses: number;
}

const InfoCards = ({ balance, totalIncome, totalExpenses }: InfoCardsProps) => {
  const data = [
    { title: "Current Balance", value: balance !== null ? `$${balance.toFixed(2)}` : "Loading..." },
    { title: "Total Income", value: `$${totalIncome.toFixed(2)}` },
    { title: "Total Expenses", value: `$${totalExpenses.toFixed(2)}` },
  ];

  return (
    <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4} mt={4}>
      {data.map((card, index) => (
        <Box
          key={index}
          p={4}
          w="100%"
          bg="#2A004E"
          color="white"
          borderRadius="md"
          boxShadow="lg"
          border="1px solid #e2e8f0"
          transition="transform 0.2s"
          _hover={{ transform: "scale(1.05)" }}
        >
          <Text fontSize="lg" fontWeight="bold">{card.title}</Text>
          <Text fontSize="2xl" fontWeight="bold">{card.value}</Text>
        </Box>
      ))}
    </SimpleGrid>
  );
};

export default InfoCards;
