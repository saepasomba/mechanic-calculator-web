"use client";

import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { Center, Box, useColorMode, IconButton, Flex, Text, Link } from "@chakra-ui/react";
import React, { cloneElement, ReactElement, ReactNode, useEffect, useState } from "react";

interface MainLayoutInterface {
  children: ReactNode;
}

export default function MainLayout({ children }: MainLayoutInterface) {
  const { colorMode, toggleColorMode } = useColorMode();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <Center
      flexDir="column"
      bg="gray.50"
      color="gray.900"
      _dark={{ bg: "blackAlpha.500", color: "gray.300" }}
      maxW="100%"
      position="relative"
    >
      <HighlightText text={
        <Text>
          Dukung saya dengan memberikan like di {" "}
          <Link
            href={"https://jogjagamers.org/topic/320807-guidetool-website-mechanic-calculator-⚙%EF%B8%8F👨%E2%80%8D🔧/"}
            target="_blank">
            <Text
              as={"span"}
              fontWeight={"bold"}
              textDecor={"underline"}
              cursor={""}
              display="inline-block"
            >
              forum Jogjagamers ini
            </Text>
          </Link> 👍
        </Text>
      }/>
      <Box
        minH="100vh"
        maxW="25rem"
        py={5}
        mx={2}
      >
        {children}
      </Box>

      <Flex justifyContent="space-between" alignItems="center" position="fixed" bottom="5%" right="5%">
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

const HighlightText = ({ text }: { text: ReactElement<typeof Text> }) => {

  return (
    <Box
      bgGradient="linear(to-r, gray.200, gray.300, gray.200)"
      _dark={{ bgGradient: "linear(to-r, gray.700, gray.600, gray.700)" }}
      py={1}
      w="100%"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      {cloneElement(text as ReactElement, { textAlign: "center", fontSize: "small", opacity: 0.8 })}
    </Box>
  );
};