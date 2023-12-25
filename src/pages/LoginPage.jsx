import { useState } from 'react';
import { Box, Center, Flex, Image, Stack, VStack } from '@chakra-ui/react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Heading,
  Text,
  Link,
  useColorModeValue,
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import login from '../assets/loginpage.png';
import { getUser } from '../Redux/users/user.action';
import { useToast } from '@chakra-ui/react';

export default function LoginPage() {
  const nav = useNavigate();
  const toast = useToast();
  const dispatch = useDispatch();

  const { auth, loading, error } = useSelector((state) => state.userReducer);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (auth) {
    nav('/notes'); // Redirect only if auth is true
  }
  const handleLogin = async () => {
    try {
      setIsLoading(true);
      await dispatch(getUser({ email, password }));
      setIsLoading(false);

      // Check the value of auth after dispatching the action
      console.log('Auth state after login:', auth);

      // Check if the login was successful
    } catch (error) {
      console.error('Error during login:', error);
      setIsLoading(false);
      toast({
        title: 'Error',
        description:
          error.message || 'An error occurred during login. Please try again.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Center h="100vh" mt={20}>
      <Flex
        padding={4}
        w={{ base: '90%', md: '60%' }}
        direction="column"
        background="#C2E9CE"
        borderRadius={10}
        alignItems="center"
      >
        <Box maxW="800px" w="100%" p={4}>
          <Flex align="center">
            <Image
              boxSize={{ base: '0%', md: '50%' }}
              src={login}
              alt="Login Image"
            />
            <VStack
              w={{ base: '100%', md: '50%' }}
              spacing={8}
              ml={{ base: '0', md: '8' }}
            >
              <Stack spacing={8} py={12} px={6} align="center">
                <Heading fontSize={{ base: '3xl', md: '4xl' }} mt={20}>
                  Sign in to your account
                </Heading>
                <Text fontSize="lg" color="gray.600">
                  to enjoy all of our cool{' '}
                  <Link color="blue.400">features</Link> ✌️
                </Text>
              </Stack>
              <Box
                rounded="lg"
                bg={useColorModeValue('white', 'gray.700')}
                boxShadow="lg"
                p={8}
                w="100%"
              >
                <Stack spacing={4}>
                  <FormControl id="email">
                    <FormLabel>Email address</FormLabel>
                    <Input
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      type="email"
                      required
                    />
                  </FormControl>
                  <FormControl id="password">
                    <FormLabel>Password</FormLabel>
                    <Input
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      type="password"
                      required
                    />
                  </FormControl>
                  <Stack spacing={10}>
                    <Stack
                      direction={{ base: 'column', sm: 'row' }}
                      align={'start'}
                      justify={'space-between'}
                    ></Stack>
                    <Button
                      onClick={handleLogin}
                      bg={'blue.400'}
                      color={'white'}
                      _hover={{
                        bg: 'blue.500',
                      }}
                      isLoading={isLoading}
                      loadingText="Signing in..."
                    >
                      Sign in
                    </Button>
                  </Stack>
                </Stack>
              </Box>
              <Text fontSize="m" color="gray.600" textAlign="center">
                Don't Have An Account?{' '}
                <Link
                  color="blue.500"
                  onClick={() => nav('/register')}
                  _hover={{ textDecoration: 'underline' }}
                >
                  Register Now!
                </Link>
              </Text>
            </VStack>
          </Flex>
        </Box>
      </Flex>
    </Center>
  );
}
