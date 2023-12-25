import {
  Button,
  Card,
  CardBody,
  Flex,
  Heading,
  Input,
  Text,
  Textarea,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import './style.css';
import notebg from '../../../assets/bgnotes.jpg';
import { useDispatch } from 'react-redux';
import { deleteNotes, updateNotes } from '../../../Redux/notes/note.action';
import { LiaEdit } from 'react-icons/lia';

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';
import { useRef, useState } from 'react';
import { MdDelete } from 'react-icons/md';

export default function NoteCard({ title, body, user, _id }) {
  const dispatch = useDispatch();
  const [notes, setNotes] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = useRef(null);
  const finalRef = useRef(null);
  const [tempTitle, setTitle] = useState(title);
  const [tempBody, setBody] = useState(body);

  const updateNote = () => {
    dispatch(updateNotes(_id, { title: tempTitle, body: tempBody }));
    onClose();
  };

  return (
    <Card backgroundImage={`url(${notebg})`}>
      <CardBody>
        <VStack>
          <Heading>{title}</Heading>
          <Text>{body}</Text>

          <Flex gap={2}>
            <>
              <Button onClick={onOpen} style={{ width: '100px' }}>
                <LiaEdit style={{ fontSize: '24px' }} />
              </Button>

              <Modal
                initialFocusRef={initialRef}
                finalFocusRef={finalRef}
                isOpen={isOpen}
                onClose={onClose}
              >
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader>Update Note</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody pb={6}>
                    <Input
                      value={tempTitle}
                      m
                      placeholder="Please enter title"
                      onChange={(e) => setTitle(e.target.value)}
                    ></Input>
                    <Textarea
                      mt={8}
                      value={tempBody}
                      placeholder={'Please enter description'}
                      onChange={(e) => setBody(e.target.value)}
                    ></Textarea>
                  </ModalBody>

                  <ModalFooter>
                    <Button colorScheme="blue" mr={3} onClick={updateNote}>
                      Update
                    </Button>
                    <Button onClick={onClose}>Cancel</Button>
                  </ModalFooter>
                </ModalContent>
              </Modal>
            </>
            <Button
              style={{ width: '100px' }}
              onClick={() => {
                dispatch(deleteNotes(_id));
              }}
            >
              <MdDelete style={{ fontSize: '24px' }} />
            </Button>
          </Flex>
        </VStack>
      </CardBody>
    </Card>
  );
}
