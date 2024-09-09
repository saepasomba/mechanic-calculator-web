"use client";
import Section from "@/components/section";
import {
  Badge,
  Box,
  Center,
  Divider,
  Flex,
  Heading,
  Link,
  Text,
  VStack,
} from "@chakra-ui/react";
import React, { ChangeEvent, useEffect, useState } from "react";
import CalculateView from "./_dashboardSections/calculateView";
import BodyForm from "./_dashboardSections/bodyForm";
import { Analytics } from "@vercel/analytics/react";

export default function Dashboard() {
  const [componentInput, setComponentInput] = useState("");
  const [profitPercentage, setProfitPercentage] = useState(20);
  const [finalPrice, setFinalPrice] = useState(0);
  const [totalComponent, setTotalComponent] = useState(0);

  const handleInputChange = (e: string) => setComponentInput(e);
  const handleProfitChange = (e: number) => setProfitPercentage(e);

  useEffect(() => {
    if (profitPercentage.toString() == "-") {
      setProfitPercentage(0);
    }

    if (profitPercentage > 100) {
      setProfitPercentage(100);
    } else if (profitPercentage < 0) {
      setProfitPercentage(0);
    }
  }, [profitPercentage]);

  useEffect(() => {
    if (componentInput.length == 1 && /^[+\-*/\s]+$/.test(componentInput)) {
      setComponentInput("");
    }

    let result: number = 0;
    let processedInput = sanitizeAndValidateInput(componentInput);

    if (processedInput !== componentInput) {
      setComponentInput(processedInput);
    }
    processedInput = trimOperators(processedInput);

    if (/^[0-9+\-*/\s]+$/.test(processedInput)) {
      result = eval(processedInput);
      setTotalComponent(result);
    } else {
      setTotalComponent(0);
    }
  }, [componentInput]);

  useEffect(() => {
    let capital: number = totalComponent * 0.55;
    let finalPrice = capital * ((100 + profitPercentage) / 100);
    finalPrice = Number(finalPrice.toFixed(2));
    setFinalPrice(finalPrice);
  }, [componentInput, profitPercentage, totalComponent]);

  function trimOperators(str: string): string {
    // Remove leading and trailing operators
    return str.replace(/^[+\-*/]+|[+\-*/]+$/g, "");
  }

  function sanitizeAndValidateInput(input: string): string {
    // Remove any characters that are not digits, +, or -
    const sanitizedInput = input.replace(/[^0-9+-]/g, "");

    // Prevent consecutive operators
    let validatedInput = sanitizedInput.replace(/([+-]){2,}/g, "$1"); // Replace sequences of more than one operator with a single one

    // Remove leading zeros from numbers, but keep the operators intact
    validatedInput = validatedInput
      .split(/([+-])/)
      .map((part) => (part.match(/^\d+$/) ? part.replace(/^0+/, "") : part))
      .join("");

    return validatedInput;
  }

  return (
    <Box>
      <Center my={5} flexDir={"column"}>
        <Heading as={"h1"} fontSize={"xx-large"} textAlign={"left"}>
          Mechanic Calculator
          <Badge ml={2} fontSize={"xl"} colorScheme={"blue"}>
            Lite
          </Badge>
        </Heading>
        <Text textAlign={"left"} w="100%" fontSize={"sm"} color={"gray.400"}>
          Made by{" "}
          <Link
            href="https://jogjagamers.org/profile/18469-overcast/"
            target="_blank"
          >
            <Text
              as={"span"}
              fontWeight={"bold"}
              textDecor={"underline"}
              cursor={""}
            >
              @Overcast
            </Text>
          </Link>{" "}
          / Len Duffield
        </Text>
      </Center>

      <Divider my={5} />

      <VStack spacing={12}>
        <CalculateView
          componentInput={totalComponent}
          profitPercentage={profitPercentage}
          finalPrice={finalPrice}
        />

        <BodyForm
          componentHandler={handleInputChange}
          profitHandler={handleProfitChange}
          profitValue={profitPercentage}
          componentInput={componentInput}
          totalComponent={totalComponent}
        />
      </VStack>
    </Box>
  );
}
