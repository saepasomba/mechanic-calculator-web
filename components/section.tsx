"use client";
import { Box, Heading, Text, VStack } from "@chakra-ui/react";
import React from "react";

interface SectionProps {
  children: React.ReactNode;
}

interface BodyProps {
  children: React.ReactNode;
}

interface HeaderInterface {
  headerTitle: string;
  headerSubTitle?: string;
}

function Header({
  headerTitle: title,
  headerSubTitle: subTitle,
}: HeaderInterface) {
  return (
    <Box w={"100%"}>
      <Heading as={"h2"} fontSize={"x-large"}>
        {title}
      </Heading>
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
