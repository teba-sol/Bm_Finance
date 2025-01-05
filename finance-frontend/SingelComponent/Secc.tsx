// import React from 'react';
// import { Box, Button, Heading, Text, Flex, Image, Stack } from '@chakra-ui/react';
// import adobe from "../assets/svg/logo-adobe.svg";
// import apple from "../assets/svg/logo-apple.svg";
// import google from "../assets/svg/logo-google.svg";
// import slack from "../assets/svg/logo-slack.svg";
// import spotify from "../assets/svg/logo-spotify.svg";
// import myim from "../assets/svg/hero-image.png";

// const Secc: React.FC = () => {
//   return (
//     <>
//       <Box bg="white" py={10}>
//         <Flex direction={{ base: 'column', md: 'row' }} align="center" justify="center" maxW="container.xl" mx="auto" px={4}>
//           {/* Text and Button Section */}
//           <Stack spacing={6} flex={1} mb={{ base: 8, md: 0 }} mr={{ base: 0, md: 10 }}>
//             <Heading as="h1" size="2xl" fontWeight="bold">
//               Manage Payroll
//               <br />
//               Like an Expert
//             </Heading>
//             <Text fontSize="lg" color="gray.600">
//               Payna helps you set up payroll without
//               <br />
//                requiring any finance skills or prior knowledge.
//             </Text>
//             <Button colorScheme="blue" width={90} mt={4}>
//               Get Started
//             </Button>
//             <Flex align="center" mt={76}>
//               <Text fontSize="3xl" color="gray.500" mr={2}>
//                 Trusted by
//               </Text>
//               <Image src={apple} alt="Apple" boxSize="130px" mx={1} />
//               <Image src={adobe} alt="Adobe" boxSize="130px" mx={1} />
//               <Image src={slack} alt="Slack" boxSize="130px" mx={1} />
//               <Image src={spotify} alt="Spotify" boxSize="130px" mx={1} />
//               <Image src={google} alt="Google" boxSize="130px" mx={1} />
//             </Flex>
//           </Stack>

//           {/* Image Section */}
//           <Box flex={1} textAlign="center">
//             <Image
//               src={myim} // Replace with actual image URL
//               alt="Payroll"
//               mb={100}
//               boxShadow="xl"
//               width="100%" // Adjusted for better visibility
//               borderRadius="full"
//               boxSize={{ base: '100%', md: '500px' }} // Adjusted for better visibility
//               objectFit="cover"
//             />
//           </Box>
//         </Flex>
//       </Box>
//     </>
//   );
// };

// export default Secc;