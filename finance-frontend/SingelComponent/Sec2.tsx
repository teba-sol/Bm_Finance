import React from 'react';
import { Box, Text, SimpleGrid, Heading, VStack, HStack, Container, Image } from '@chakra-ui/react';
import { FaRegCheckCircle, FaChartLine, FaLock, FaFileAlt } from 'react-icons/fa';

import userImage1 from '../imagess/pic1.jpg'; 
import userImage2 from '../imagess/pic2.jpg';
import userImage3 from '../imagess/pic3.jpg';
import userImage4 from '../imagess/koko.jpg';

const features = [
    {
      title: 'Easy Setup',
      description: 'Get started with our intuitive onboarding process.',
      icon: <FaRegCheckCircle size={50} style={{ color: '#3182ce' }} />,
    },
    {
      title: 'Real-time Analytics',
      description: 'Instant insights into your financial data.',
      icon: <FaChartLine size={50} style={{ color: '#3182ce' }} />,
    },
    {
      title: 'Secure Transactions',
      description: 'Your data is protected with top-notch security measures.',
      icon: <FaLock size={50} style={{ color: '#3182ce' }} />,
    },
    {
      title: 'Comprehensive Reports',
      description: 'Detailed reports to track your financial performance.',
      icon: <FaFileAlt size={50} style={{ color: '#3182ce' }} />,
    },
  ];
  
  const feedbacks = [
    {
      name: 'John Doe',
      rating: 4.5,
      comment: 'This app has simplified my payroll process significantly!',
      image: userImage1,
    },
    {
      name: 'Teba Bibe',
      rating: 5,
      comment: 'I love the real-time analytics feature, it’s incredibly helpful.',
      image: userImage2,
    },
    {
      name: 'Mahder Johnson',
      rating: 4,
      comment: 'User-friendly interface and great support.',
      image: userImage3,
    },
    {
      name: 'Alex Dawit',
      rating: 5,
      comment: 'Highly secure and reliable. Highly recommend!',
      image: userImage4,
    },
  ];
  
  const Sec2 = () => {
    return (
        <>
      <Box py={7} bg="gray.50">
        <Container maxW="container.xl">
          <Heading as="h2" color="gray.900"  size="xl" textAlign="center" mb={10}>
            Key Features of Our Finance Management App
          </Heading>
          <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={8}>
            {features.map((feature, index) => (
              <Box
                key={index}
                borderWidth={1}
                borderRadius="lg"
                overflow="hidden"
                boxShadow="md"
                transition="transform 0.3s, box-shadow 0.3s"
                _hover={{ transform: 'scale(1.05)', boxShadow: 'lg' }}
                bg="white"
                p={5}
                textAlign="center"
              >
                {feature.icon}
                <VStack spacing={4} align="center" mt={4}>
                  <Heading as="h3" size="md">
                    {feature.title}
                  </Heading>
                  <Text color="gray.600">
                    {feature.description}
                  </Text>
                </VStack>
              </Box>
            ))}
          </SimpleGrid>
  
          </Container>
          
            </Box>
         
         </>
    );
  };
  
  export default Sec2;