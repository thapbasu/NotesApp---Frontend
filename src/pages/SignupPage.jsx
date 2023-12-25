import { Box, Center, Flex, Image, VStack } from '@chakra-ui/react';
import {
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import axios from 'axios';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import register from '../assets/register.png';
import { useToast } from '@chakra-ui/react';
import { BASE_URL } from '../constants/config';

export default function SignupPage() {
  const nav = useNavigate();
  const toast = useToast();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false); // New state for loading
  const handleRegisterClick = () => {
    nav('/register');
  };
  const handleSignup = async () => {
    try {
      setIsLoading(true); // Set loading state to true

      let data = await axios.post(BASE_URL + '/user/register', {
        name,
        email,
        password,
      });

      let { message, status } = data.data;

      if (status === 1) {
        toast({
          title: 'Success',
          description: message,
          status: 'success',
          duration: 3000,
          isClosable: true,
        });

        nav('/login');
      } else {
        toast({
          title: 'Error',
          description: message,
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error('Error during signup:', error);
      toast({
        title: 'Error',
        description: 'An error occurred during signup. Please try again.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false); // Reset loading state regardless of success or error
    }
  };
  return (
    <Center h="100vh" mt={20}>
      <Flex
        padding={4}
        w={{ base: '90%', md: '60%' }} // Adjust width based on screen size
        direction="column"
        background="#C2E9CE"
        borderRadius={10} // Adjust border radius based on preference
        alignItems="center"
      >
        <Box maxW="800px" w="100%" p={4}>
          <Flex
            align="center"
            direction={{ base: 'column-reverse', sm: 'row' }}
          >
            <Image
              boxSize={{ base: '0%', md: '50%' }} // Hide on small screens, 50% on medium screens and above
              src={register}
              alt="Register Image"
            />
            <VStack w="100%" spacing={8} ml={{ base: 0, sm: 8 }}>
              <Stack spacing={8} py={12} px={6} align="center">
                <Heading
                  fontSize={{ base: '3xl', md: '4xl' }}
                  mt={{ base: 0, md: 20 }}
                >
                  Sign up with Notes App
                </Heading>
                <Text fontSize="lg" mb={{ base: -6, md: -14 }} color="gray.600">
                  to enjoy all of our cool{' '}
                  <Link color="blue.400">features</Link> ✌️
                </Text>
              </Stack>
              <Box
                rounded="lg"
                bg={useColorModeValue('white', 'gray.700')}
                boxShadow="lg"
                p={8}
              >
                <Stack spacing={4}>
                  <FormControl id="name">
                    <FormLabel>Name</FormLabel>
                    <Input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      type="text"
                    />
                  </FormControl>
                  <FormControl id="email">
                    <FormLabel>Email address</FormLabel>
                    <Input
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      type="email"
                    />
                  </FormControl>
                  <FormControl id="password">
                    <FormLabel>Password</FormLabel>
                    <Input
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      type="password"
                    />
                  </FormControl>
                  <Stack spacing={10}>
                    <Stack
                      direction={{ base: 'column', sm: 'row' }}
                      align={'start'}
                      justify={'space-between'}
                    ></Stack>
                    <Button
                      onClick={handleSignup}
                      bg={'blue.400'}
                      color={'white'}
                      _hover={{
                        bg: 'blue.500',
                      }}
                      isLoading={isLoading} // Set isLoading prop
                      loadingText="Signing up..." // Text to display during loading
                    >
                      Sign up
                    </Button>
                  </Stack>
                </Stack>
              </Box>
              <Text fontSize="m" color="gray.600" textAlign="center">
                Already Have An Account?{' '}
                <Link
                  color="blue.500"
                  onClick={() => nav('/login')}
                  _hover={{ textDecoration: 'underline' }}
                >
                  Login Now!
                </Link>
              </Text>
            </VStack>
          </Flex>
        </Box>
      </Flex>
    </Center>
  );
}
