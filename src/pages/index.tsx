import Head from "next/head";
import Image from "next/image";
import styles from "@/styles/Home.module.css";
import React, { useState } from 'react'

import { Heading, Box, Button, Text, Center } from '@chakra-ui/react';
import { ChakraProvider } from '@chakra-ui/react'
import { Checkbox, CheckboxGroup } from '@chakra-ui/react'
import { Stack, HStack, VStack } from '@chakra-ui/react'
import { after } from "node:test";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react'
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
} from '@chakra-ui/react'
import { Input } from '@chakra-ui/react'
import { useDisclosure } from '@chakra-ui/react'



// 現在時刻コンポーネント
const CurrentDate = () => {
  const today = new Date();

  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const day = today.getDate();

  return year + '年' + month + '月' + day + '日'
};


// to do コンポーネント
const Todo = (props) => {
  const handleCheckboxChange = () => {
    props.onCheckboxChange(props.todo.id);
  }
  return (
    <Checkbox spacing={5}
      defaultChecked={props.todo.isCompleted}
      onChange={handleCheckboxChange}>
      {props.todo.text}
    </Checkbox>
  );
};


const AddModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const initialRef = React.useRef(null)
  const finalRef = React.useRef(null)

  return (
    <>
      <Button onClick={onOpen}
        width="80px"
        height="80px"
        borderRadius="100%"
        bgColor="purple.700"
        color="white"
        fontSize="40px"
        fontWeight="light"
        float="right"
        mt="40px"
        mr="20px">
        +
      </Button>

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>タスクの追加</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <Input ref={initialRef} placeholder='TODOを入力...' />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button onClick={onClose} mr={3}>キャンセル</Button>
            <Button colorScheme='blue'>
              保存
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}



// 全体の表示
export default function Home() {
  const [todos, setTodos] = useState([
    { id: 0, text: "食料品を買い物リストに追加する", isCompleted: false },
    { id: 1, text: "新しい調味料を試してみる", isCompleted: false },
    { id: 2, text: "週末のためにおやつを購入する", isCompleted: false },
    { id: 3, text: "食料品店で買い物リストのアイテムを購入する", isCompleted: true },
    { id: 4, text: "特別なレシピに必要な材料を揃える", isCompleted: true },
    { id: 5, text: "お気に入りのコーヒー豆を補充する", isCompleted: true },
  ]);

  const handleTodoCheckboxChange = (id: number) => {
    const newTodos = todos.map((todo) => {
      return {
        id: todo.id,
        text: todo.text,
        isCompleted: todo.id === id ? !todo.isCompleted : todo.isCompleted
      };
    });
    setTodos(newTodos);
  };

  const pendingTodos = todos.map((todo) => {
    if (todo.isCompleted === false) {
      return (
        <Todo
          key={todo.id}
          todo={todo}
          onCheckboxChange={handleTodoCheckboxChange}
        />
      );
    }
  });

  const completedTodos = todos.map((todo) => {
    if (todo.isCompleted === true) {
      return (
        <Todo
          key={todo.id}
          todo={todo}
          onCheckboxChange={handleTodoCheckboxChange}
        />
      );
    }
  });

  return (
    <ChakraProvider>
      <Box w="fit-content" m="40px auto">
        <Heading marginBottom="12px">
          <CurrentDate />
        </Heading>
        <Box w="520px" bg="orange.50" p="40px 50px" borderRadius="8px">
          <Text marginBottom={8} fontWeight="bold">
            未完了
          </Text>
          <Stack marginBottom={16} spacing={6}>
            {pendingTodos}
          </Stack>
          <Text marginBottom={8} fontWeight="bold">
            完了
          </Text>
          <Stack spacing={6}>
            {completedTodos}
          </Stack>

        </Box>
        <AddModal />
      </Box>
      
    </ChakraProvider>
  );
}
