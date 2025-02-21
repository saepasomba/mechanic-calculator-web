"use client";

import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { Center, Box, useColorMode, IconButton, Flex } from "@chakra-ui/react";
import React, { ReactNode } from "react";

interface MainLayoutInterface {
  children: ReactNode;
}

export default function MainLayout({ children }: MainLayoutInterface) {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Center
      flexDir="column"
      bg="gray.50"
      color="gray.900"
      _dark={{ bg: "gray.800", color: "gray.300" }}
      maxW="100%"
      position="relative"
    >
      <Box
        minH="100vh"
        maxW="25rem"
        py={5}
        mx={2}
      >
        {children}
      </Box>

      <Flex justifyContent="space-between" alignItems="center" position="absolute" bottom="5%" right="5%">
        <IconButton
          aria-label="Toggle dark mode"
          icon={colorMode === "light" ? <SunIcon/> : <MoonIcon/>}
          onClick={toggleColorMode}
          variant="outline"
        />
      </Flex>
    </Center>
  );
}