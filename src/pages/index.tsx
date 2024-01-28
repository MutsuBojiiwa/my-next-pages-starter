import Head from "next/head";
import Image from "next/image";
import styles from "@/styles/Home.module.css";
import React, { useState } from 'react'

import { Heading, Box, Button, Text } from '@chakra-ui/react';
import { ChakraProvider } from '@chakra-ui/react'
import { Checkbox, CheckboxGroup } from '@chakra-ui/react'
import { Stack, HStack, VStack } from '@chakra-ui/react'
import { after } from "node:test";


const CurrentDate = () => {
  const today = new Date();

  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const day =  today.getDate();

  return year + '年' + month + '月' + day + '日'
};



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




export default function Home() {
  const [todos, setTodos] = useState([
    { id: 0, text: "食料品を買い物リストに追加する", isCompleted: false },
    { id: 1, text: "新しい調味料を試してみる", isCompleted: false },
    { id: 2, text: "週末のためにおやつを購入する", isCompleted: false },
    { id: 3, text: "食料品店で買い物リストのアイテムを購入する", isCompleted: true },
    { id: 4, text: "特別なレシピに必要な材料を揃える", isCompleted: true },
    { id: 5, text: "お気に入りのコーヒー豆を補充する", isCompleted: true },
  ]);

  const handleTodoCheckboxChange = (id) => {
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
        <Box w="520px" bg="orange.50" p="40px 50px">
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
      </Box>
    </ChakraProvider>
  );
}
