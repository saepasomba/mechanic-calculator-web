import { Center, Text, Box, Link } from "@chakra-ui/react";
import React, { ReactNode } from "react";

interface MainLayoutInterface {
  children: ReactNode;
}

export default function MainLayout({ children }: MainLayoutInterface) {
  return (
    <Center flexDir={"column"} bg="gray.50" maxW={"100%"}>
      <Box minH="100vh" maxW="25rem" py={5} mx={2} color="gray.900">
        {children}
      </Box>
    </Center>
  );
}
