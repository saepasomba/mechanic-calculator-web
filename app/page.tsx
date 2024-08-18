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
  const [componentInput, setComponentInput] = useState(0);
  const [profitPercentage, setProfitPercentage] = useState(15);
  const [finalPrice, setFinalPrice] = useState(0);

  const handleInputChange = (e: number) => setComponentInput(e);
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
    if (componentInput < 0) {
      setComponentInput(0);
    }
  }, [componentInput]);

  useEffect(() => {
    let capital: number = componentInput * 0.55;
    let finalPrice = capital * ((100 + profitPercentage) / 100);
    finalPrice = Number(finalPrice.toFixed(2));
    setFinalPrice(finalPrice);
  }, [componentInput, profitPercentage]);

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
          componentInput={componentInput}
          profitPercentage={profitPercentage}
          finalPrice={finalPrice}
        />

        <BodyForm
          componentHandler={handleInputChange}
          profitHandler={handleProfitChange}
          profitValue={profitPercentage}
          componenInput={componentInput}
        />
      </VStack>
    </Box>
  );
}
