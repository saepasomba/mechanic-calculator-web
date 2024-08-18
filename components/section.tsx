"use client";
import { Box, Flex, Heading, IconButton, Text, VStack } from "@chakra-ui/react";
import React from "react";
import { IconType } from "react-icons";

interface SectionProps {
  children: React.ReactNode;
}

interface BodyProps {
  children: React.ReactNode;
}

interface HeaderInterface {
  headerTitle: string;
  headerSubTitle?: string;
  trailingButton?: IconType;
  trailingButtonHandler?: () => void;
}

function Header({
  headerTitle: title,
  headerSubTitle: subTitle,
  trailingButton: trailingIcon,
  trailingButtonHandler: trailingButtonHandler,
}: HeaderInterface) {
  return (
    <Box w={"100%"}>
      <Flex justify={"space-between"}>
        <Heading as={"h2"} fontSize={"x-large"}>
          {title}
        </Heading>
        {trailingIcon && (
          <IconButton
            as={trailingIcon}
            aria-label="cog-icon"
            size={"xs"}
            onClick={trailingButtonHandler}
          />
        )}
      </Flex>
      <Text fontSize={"2xs"} color={"gray.400"}>
        {subTitle}
      </Text>
    </Box>
  );
}

function Body({ children }: BodyProps) {
  return <Box w={"100%"}>{children}</Box>;
}

export default function Section({ children }: SectionProps) {
  return (
    <VStack gap={4} w={"100%"}>
      {children}
    </VStack>
  );
}

Section.Header = Header;
Section.Body = Body;
