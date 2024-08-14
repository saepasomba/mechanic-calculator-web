import { Center, Text, Box, Link } from "@chakra-ui/react";
import React, { ReactNode } from "react";

interface MainLayoutInterface {
  children: ReactNode;
}

export default function MainLayout({ children }: MainLayoutInterface) {
  return (
    <Center flexDir={"column"} bg="gray.800" maxW={"100%"}>
      <Box minH="100vh" maxW="25rem" py={5} mx={2} color="white">
        {children}
      </Box>
      <Center bg="black" color="gray.400" w={"100vw"} py={1}>
        <Text textAlign={"center"} fontSize={"sm"}>
          Made by{" "}
          <Link href="https://jogjagamers.org/profile/18469-overcast/">
            <Text as={"u"}>@Overcast</Text>
          </Link>{" "}
          / Len Duffield (( Sae )) with ❤️
        </Text>
      </Center>
    </Center>
  );
}
