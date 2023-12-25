import { ReactNode } from 'react';
import {
  Box,
  Flex,
  Avatar,
  Link,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  useColorMode,
  Center,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
} from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { LOGOUT } from '../../../Redux/users/user.types';
import { IoMdMenu } from 'react-icons/io';

export default function Navbar() {
  const nav = useNavigate();
  const dispatch = useDispatch();
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { auth, token, loading, error } = useSelector(
    (state) => state.userReducer
  );
  const handleLoginClick = () => {
    nav('/login');
  };

  const handleLogoutClick = () => {
    dispatch({ type: LOGOUT });
  };
  console.log(auth);

  return (
    <>
      <Box
        zIndex={1000}
        position={'fixed'}
        top={0}
        w={'100%'}
        background="#A9DFBA"
        px={4}
      >
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <Box
            fontWeight={'bold'}
            cursor={'pointer'}
            onClick={() => {
              nav('/');
            }}
            color="white"
          >
            Notes App
          </Box>

          <Flex alignItems={'center'}>
            {/* Always render Menu button on smaller screens */}
            <Button
              display={{ base: 'block', md: 'none' }}
              onClick={onOpen}
              bg={'yellow'}
              m
              color={'green'}
            >
              <IoMdMenu style={{ fontSize: '25px' }} />
            </Button>

            {/* Conditionally render Navigation Buttons based on screen size */}
            <Stack
              display={{ base: isOpen ? 'flex' : 'none', md: 'flex' }}
              alignItems={'center'}
              direction={'row'}
              spacing={7}
            >
              <Button
                bg={'yellow'}
                m
                color={'green'}
                onClick={() => {
                  nav('/notes');
                }}
                display={auth == true ? 'block' : 'none'}
              >
                All Notes
              </Button>
              <Button
                bg={'yellow'}
                m
                color={'green'}
                onClick={() => {
                  nav('/register');
                }}
                display={auth == true ? 'none' : 'block'}
              >
                Sign up
              </Button>
              <Button
                bg={'yellow'}
                color={'green'}
                onClick={auth ? handleLogoutClick : handleLoginClick}
              >
                {auth ? 'Logout' : 'Login'}
              </Button>
              <Button bg={'yellow'} onClick={toggleColorMode}>
                {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
              </Button>
            </Stack>
          </Flex>
        </Flex>
      </Box>

      {/* Mobile Drawer Menu */}
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay
          css={{
            backdropFilter: isOpen ? 'blur(8px)' : 'none',
            backgroundColor: isOpen ? 'rgba(0, 0, 0, 0.5)' : 'transparent',
          }}
        />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Menu</DrawerHeader>
          <DrawerBody>
            <Stack spacing={4}>
              {/* Your mobile menu items */}
              <Button
                bg={'yellow'}
                m
                color={'green'}
                onClick={() => {
                  nav('/notes');
                }}
                display={auth == true ? 'block' : 'none'}
              >
                All Notes
              </Button>
              <Button
                bg={'yellow'}
                m
                color={'green'}
                onClick={() => {
                  nav('/register');
                }}
                display={auth == true ? 'none' : 'block'}
              >
                Sign up
              </Button>
              <Button
                bg={'yellow'}
                color={'green'}
                onClick={auth ? handleLogoutClick : handleLoginClick}
              >
                {auth ? 'Logout' : 'Login'}
              </Button>
            </Stack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
