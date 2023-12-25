import {
  Box,
  Button,
  Flex,
  Grid,
  IconButton,
  Image,
  Input,
  Textarea,
  Center,
  useDisclosure,
  VStack,
  SimpleGrid,
  Heading,
} from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import NoteCard from '../components/Notes/NoteCard/NoteCard';
import { createNotes, getNotes } from '../Redux/notes/note.action';
import { MdAddCircle } from 'react-icons/md';
import loginbg from '../assets/bgnotes.jpg';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';
export default function NotesPage() {
  const dispatch = useDispatch();
  const { loading, error, data } = useSelector((state) => state.noteReducer);
  console.log(data);
  const [notes, setNotes] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = useRef(null);
  const finalRef = useRef(null);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  useEffect(() => {
    dispatch(getNotes());
  }, []);

  useEffect(() => {
    setNotes(data);
  }, [data]);

  const createNote = () => {
    dispatch(createNotes({ title, body }));
    // Clear the form fields after creating a note
    setTitle('');
    setBody('');
    onClose();
  };

  return (
    <Box mt={20} padding={4}>
      {/* Grid for Note Cards */}
      <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing={4}>
        {notes?.map((el) => (
          <NoteCard {...el} key={el.id} />
        ))}
      </SimpleGrid>

      {/* Floating Action Button */}
      <IconButton
        boxShadow={
          'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;'
        }
        position={'fixed'}
        w={'80px'}
        h={'80px'}
        borderRadius={50}
        bottom={0}
        right={0}
        onClick={onOpen}
        margin={16}
        icon={<MdAddCircle style={{ fontSize: '46px' }} />}
      ></IconButton>
      {/* Modal for Creating New Note */}
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create New Note</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Input
              value={title}
              placeholder="Please enter title"
              onChange={(e) => setTitle(e.target.value)}
            />
            <Textarea
              mt={4}
              value={body}
              placeholder="Please enter description"
              onChange={(e) => setBody(e.target.value)}
            />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={createNote}>
              Create
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}
