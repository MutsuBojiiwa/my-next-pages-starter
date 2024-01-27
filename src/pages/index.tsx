import Head from "next/head";
import Image from "next/image";
import styles from "@/styles/Home.module.css";

import { Heading, Box, Button, Text } from '@chakra-ui/react';
import { ChakraProvider } from '@chakra-ui/react'
import { Checkbox, CheckboxGroup } from '@chakra-ui/react'
import { Stack, HStack, VStack } from '@chakra-ui/react'



export default function Home() {
  return (
    <ChakraProvider>
      <Box w="fit-content" m="40px auto">
        <Heading marginBottom="12px">日付</Heading>
        <Box w="520px" bg="orange.50" p="40px 50px">
          <Text marginBottom={8} fontWeight="bold">
            未完了
          </Text>
          <Stack marginBottom={16} spacing={6}>
            <Checkbox spacing={5}>タスク</Checkbox>
            <Checkbox spacing={5}>タスク</Checkbox>
            <Checkbox spacing={5}>タスク</Checkbox>
          </Stack>
          <Text marginBottom={8} fontWeight="bold">
            完了
          </Text>
          <Stack spacing={6}>
            <Checkbox spacing={5} defaultChecked>タスク</Checkbox>
            <Checkbox spacing={5} defaultChecked>タスク</Checkbox>
            <Checkbox spacing={5} defaultChecked>タスク</Checkbox>
            <Checkbox spacing={5} defaultChecked>タスク</Checkbox>
          </Stack>

        </Box>
      </Box>
    </ChakraProvider>
  );
}
