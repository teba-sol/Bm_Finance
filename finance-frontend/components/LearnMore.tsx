import { Box, Heading, Text, SimpleGrid, Button, Stack, Divider } from '@chakra-ui/react';

const LearnMorePage = () => {
  return (
    <Box className="bg-gray-50 min-h-screen p-6">
      <Box maxW="7xl" mx="auto" p={{ base: 4, md: 8 }}>
        <Heading as="h1" className="text-5xl font-bold text-gray-900 text-center mb-6">
          Welcome to BM-Finance
        </Heading>
        <Text className="text-lg text-gray-600 text-center mb-12">
          Your personal finance management tool for tracking expenses, income, and managing your transactions.
        </Text>

        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10} mb={16}>
          {[
            {
              title: "Manage Transactions",
              description: "Record income and expenses to maintain a clear financial overview.",
              link: "Go to Dashboard",
            },
            {
              title: "Visualize Finances",
              description: "Get insights with an interactive dashboard that shows your financial health.",
              link: "View Financial Overview",
            },
            {
              title: "Transaction History",
              description: "Easily access your past transactions for better budgeting.",
              link: "View Transaction History",
            },
          ].map((item, index) => (
            <Box
              key={index}
              className="bg-white rounded-lg p-6 border border-gray-200 shadow-md transition-transform duration-300 transform hover:scale-105"
              display="flex"
              flexDirection="column"
              justifyContent="space-between"
            >
              <Heading as="h3" className="text-xl font-semibold text-gray-800 mb-4">
                {item.title}
              </Heading>
              <Text className="text-gray-600 mb-4">{item.description}</Text>
              <Button
                colorScheme="teal"
                variant="outline"
                className="mt-4"
                onClick={() => window.location.href = ''}
              >
                {item.link}
              </Button>
            </Box>
          ))}
        </SimpleGrid>

        <Box className="bg-white shadow-lg p-8 rounded-lg max-w-4xl mx-auto mb-16">
          <Heading as="h2" className="text-3xl font-semibold text-gray-800 mb-6">
            How to Use BM-Finance
          </Heading>
          <Stack spacing={4}>
            {[
              "Create an Account — Sign up with your email to access your dashboard.",
              "Add Your Transactions — Record income and expenses using the transaction form.",
              "Track Your Expenses — View real-time transaction breakdowns and balances.",
              "Visualize Your Financial Data — Use charts to analyze spending habits.",
              "Review Your Transaction History — Access and review your financial history anytime.",
            ].map((step, index) => (
              <Text key={index} className="text-lg text-gray-600">
                <strong>{step.split(' — ')[0]}</strong> {step.split(' — ')[1]}
              </Text>
            ))}
          </Stack>
          <Button
            colorScheme="teal"
            variant="solid"
            className="mt-8"
            onClick={() => window.location.href = '/signup'}
          >
            Get Started Now
          </Button>
        </Box>

        <Divider my={8} borderColor="gray.300" />

        <Box className="mt-16 text-center">
          <Text className="text-lg text-gray-600">
            Need help? Visit our{' '}
            <a href="/help" className="text-teal-500 hover:underline">
              Help Center
            </a>.
          </Text>
        </Box>
      </Box>
    </Box>
  );
};

export default LearnMorePage;