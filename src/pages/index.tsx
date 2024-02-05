
import axios from "axios";

import React, { useState, useMemo, useEffect } from 'react';

import { Heading, Box, Button, Text, Center } from '@chakra-ui/react';
import { ChakraProvider } from '@chakra-ui/react'
import { Checkbox, CheckboxGroup } from '@chakra-ui/react'
import { Stack, HStack, VStack } from '@chakra-ui/react'
import { after } from "node:test";

import { useDisclosure } from '@chakra-ui/react'
import { useToast } from '@chakra-ui/react'

import { AddTodoModal } from "@/components/modals/AddTodoModal";

const url = "http://api.laravel-v10-starter.localhost/api/todos";


// 現在時刻コンポーネント
const CurrentDate = () => {
  const today = new Date();

  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const day = today.getDate();

  return year + '年' + month + '月' + day + '日'
};


// to do コンポーネント
const Todo = (props: any) => {
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







type Todo = {
  id: number,
  title: string,
  is_completed: boolean,
  created_at?: Date,
  updated_at?: Date
}


// 全体の表示
export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);


  useEffect(() => {
    // APIからデータを取得するためのAxiosリクエスト
    axios.get(url)
      .then(response => setTodos(response.data.todos))
      .catch(error => console.error('Error fetching todos:', error));
  }, []);

  const { isOpen, onOpen, onClose } = useDisclosure()

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);






  const handleTodoCheckboxChange = (id: number) => {
    const newTodos = todos.map((todo) => {
      return {
        id: todo.id,
        title: todo.title,
        is_completed: todo.id === id ? !todo.is_completed : todo.is_completed
      };
    });
    setTodos(newTodos);
  };

  const pendingTodos = useMemo(() => {
    const pendingItems = todos.map(todo => {
      if (!todo.is_completed) {
        return (
          <Todo
            key={todo.id}
            todo={todo}
            onCheckboxChange={handleTodoCheckboxChange}
          />
        );
      }
    });
    return pendingItems
  }, [todos]);


  const completedTodos = useMemo(() => {
    const completedItems = todos.map((todo) => {
      if (todo.is_completed) {
        return (
          <Todo
            key={todo.id}
            todo={todo}
            onCheckboxChange={handleTodoCheckboxChange}
          />
        );
      }
    });
    return completedItems;
  }, [todos]);




  const toast = useToast();




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
          mr="20px"
        >
          +
        </Button>

        <AddTodoModal
          initialFocusRef={initialRef}
          finalFocusRef={finalRef}
          isOpen={isOpen}
          onClose={onClose}
          todos={todos}
          setTodos={setTodos}
          url={url}
        />

      </Box>
    </ChakraProvider>
  );
}
