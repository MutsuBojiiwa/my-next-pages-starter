import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { Heading, Box, Button, Text } from '@chakra-ui/react';

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <Box width="200px" background="gray">
      <Text color="blue" fontWeight="bold">
        テキスト
      </Text>
      <Heading>見出し</Heading>
      <Button>ボタン</Button>
    </Box>
  );
}
