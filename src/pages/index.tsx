import Head from "next/head";
import Image from "next/image";
import styles from "@/styles/Home.module.css";

import { Heading, Box, Button, Text } from '@chakra-ui/react';
import { ChakraProvider } from '@chakra-ui/react'
import { Checkbox, CheckboxGroup } from '@chakra-ui/react'
import { Stack, HStack, VStack } from '@chakra-ui/react'
import { after } from "node:test";

const Todo = (props) => {
  return (
    <Checkbox spacing={5} defaultChecked={props.todo.isCompleted}>
      {props.todo.text}
    </Checkbox>
  );
};

export default function Home() {
  const todos = [
    { id: 0, text: "食料品を買い物リストに追加する", isCompleted: false },
    { id: 1, text: "新しい調味料を試してみる", isCompleted: false },
    { id: 2, text: "週末のためにおやつを購入する", isCompleted: false },
    { id: 3, text: "食料品店で買い物リストのアイテムを購入する", isCompleted: true },
    { id: 4, text: "特別なレシピに必要な材料を揃える", isCompleted: true },
    { id: 5, text: "お気に入りのコーヒー豆を補充する", isCompleted: true },
  ];

  const pendingTodos = todos.map((todo) => {
    if (todo.isCompleted === false) {
      return (
        <Todo
          key={todo.id}
          todo={todo}
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
        />
      );
    }
  });

  return (
    <ChakraProvider>
      <Box w="fit-content" m="40px auto">
        <Heading marginBottom="12px">日付</Heading>
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
