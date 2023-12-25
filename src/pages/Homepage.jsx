import {
  Box,
  Button,
  Heading,
  Image,
  ListItem,
  Text,
  UnorderedList,
} from '@chakra-ui/react';
import note from '../assets/note.jpg';
import { Navbar } from '../components/home page/navbar';
import { useNavigate } from 'react-router-dom';

export default function Homepage() {
  const nav = useNavigate();
  const handleLoginClick = () => {
    nav('/login');
  };
  return (
    <>
      <Box padding={8}>
        <Image
          float="right"
          w={{ base: '100%', md: '500px' }} // Set width to 100% on smaller screens, 500px on medium screens and above
          mb={8}
          mt={{ base: 20, md: 40 }} // No margin top on smaller screens, 40 on medium screens and above
          src={note}
          alt="Note App Image"
          borderRadius="lg"
          boxShadow="md"
        />
        <Heading
          mt={16}
          textAlign={'start'}
          size={'3xl'}
          fontWeight="bold" // Set font weight to bold
          color="teal.500" // Change text color
        >
          Note App
        </Heading>

        <Text fontSize={'2xl'} fontWeight="bold" mt={10} color="#3182CE">
          Ready to start creating notes?{' '}
          <span
            style={{
              color: '#F56565',
              cursor: 'pointer',
              textDecoration: 'underline',
              marginLeft: '4px',
              display: 'inline-block',
              transition: 'color 0.3s ease-in-out',
            }}
            onClick={handleLoginClick}
            onMouseOver={(e) => (e.target.style.color = '#E53E3E')}
            onMouseOut={(e) => (e.target.style.color = '#F56565')}
          >
            Login now
          </span>{' '}
          to get started!
        </Text>
        <Box>
          <Text mt={4} fontSize="xl" color="gray.600">
            A note application is a versatile software program designed to help
            users create, organize, and manage digital notes.
            <br /> Whether you're a student, professional, or anyone striving
            for better organization and productivity, a note application is an
            indispensable tool in your arsenal.
          </Text>
          <Text mt={8} fontSize="lg" fontWeight="bold" color="teal.500">
            Key Features:
            <UnorderedList mt={2} pl={6} color="gray.700">
              <ListItem>Create and Edit Notes with ease.</ListItem>
              <ListItem>
                Add text, images, and voice memos to your notes.
              </ListItem>
              <ListItem>Organize notes using tags or categories.</ListItem>
              <ListItem>
                Powerful search functionality for quick access.
              </ListItem>
              <ListItem>
                Collaborate by sharing notes with colleagues or friends.
              </ListItem>
              <ListItem>
                Advanced features like syncing across multiple devices.
              </ListItem>
            </UnorderedList>
          </Text>
          <Text mt={8} fontSize="lg" color="gray.600">
            Whether you're working on a team project, collaborating on
            assignments, or staying organized in your daily life, a note
            application ensures you have seamless access to your information
            wherever you go.
          </Text>
          <Text mt={8} fontSize="lg" fontWeight="bold" color="teal.500">
            Embrace the power of a note application and elevate your
            organizational skills and productivity to new heights!
          </Text>
        </Box>
      </Box>
    </>
  );
}
