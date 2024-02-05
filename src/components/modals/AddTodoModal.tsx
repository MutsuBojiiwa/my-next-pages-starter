import React, { useState, useMemo } from 'react';

import axios from 'axios';

import { Heading, Box, Button, Text, Center } from '@chakra-ui/react';
import { Input } from '@chakra-ui/react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
} from '@chakra-ui/react';
import { useToast } from '@chakra-ui/react';



// modal
export const AddTodoModal = (props: any) => {
  const [inputText, setInputText] = React.useState("");

  // メソッドたちを受け渡し
  const isOpen = props.isOpen;
  const onClose = () => {
    props.onClose();
    setInputText("");
  };
  const initialRef = props.initialFocusRef;
  const finalRef = props.finalFocusRef;

  const handleAddTextSubmit = (text: string) => {
    const newTodos = [...props.todos];
    newTodos.push({
      id: Date.now(),
      title: text,
      isCompleted: false
    });
    props.setTodos(newTodos);
    console.log("props.todos : " + props.todos);
    axios.post('http://api.laravel-v10-starter.localhost/api/todos', { title: "test", is_conpleted: false })
      .then(response => console.log('New todo created:', response.data.todo))
      .catch(error => console.error('Error creating todo:', error));

  }

  const handleSubmit = (e: any) => {
    e.preventDefault();
    handleAddTextSubmit(inputText);
    setInputText("");
  }

  const handleTextChange = (e: any) => {
    setInputText(e.currentTarget.value);
  }

  const isSaveButtonDisabled = () => {
    return inputText === "" || inputText.length > 191;
  };



  const toast = useToast();

  return (

    <Modal
      initialFocusRef={initialRef}
      finalFocusRef={finalRef}
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalOverlay />
      <ModalContent>
        <form onSubmit={handleSubmit}>
          <ModalHeader>タスクの追加</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <Input
                ref={initialRef}
                placeholder='TODOを入力...'
                value={inputText}
                onChange={handleTextChange}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose} mr={3}>キャンセル</Button>
            <Button colorScheme='blue' type="submit" isDisabled={isSaveButtonDisabled()}
              onClick={() =>
                toast({
                  title: 'TODOタスクを保存しました',
                  status: 'success',
                  duration: 3000,
                  isClosable: true,
                })
              }>
              保存
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};