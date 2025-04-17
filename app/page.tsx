"use client";
import {
  Badge,
  Box,
  Center,
  Divider,
  Heading,
  Link,
  Text,
  VStack,
  HStack,
} from "@chakra-ui/react";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import CalculateView from "./_dashboardSections/calculateView";
import BodyForm from "./_dashboardSections/bodyForm";
import Settings from "./_dashboardSections/settings";
import {
  sanitizeAndValidateInput,
  trimOperators,
  safeEvaluate,
} from "./utils/calculatorUtils";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { CalculationResult } from "./types/calculator";

export default function Dashboard() {
  // Use custom hook for localStorage with debouncing
  const [profitPercentage, setProfitPercentage] = useLocalStorage<number>(
    "profitPercentage",
    20
  );
  const [componentPrice, setComponentPrice] = useLocalStorage<number>(
    "componentPrice",
    0.6
  );

  const [componentInput, setComponentInput] = useState("");
  const [calculationResult, setCalculationResult] = useState<CalculationResult>(
    {
      totalComponent: 0,
      capital: 0,
      profit: 0,
      finalPrice: 0,
    }
  );

  // Memoize handler functions to prevent recreation on each render
  const handleInputChange = useCallback((value: string) => {
    setComponentInput(value);
  }, []);

  const handleProfitChange = useCallback(
    (value: number) => {
      // Validate profit percentage
      if (value.toString() === "-") {
        setProfitPercentage(0);
      } else if (value > 100) {
        setProfitPercentage(100);
      } else if (value < 0) {
        setProfitPercentage(0);
      } else {
        setProfitPercentage(value);
      }
    },
    [setProfitPercentage]
  );

  const handleComponentPriceChange = useCallback(
    (value: number) => {
      setComponentPrice(value < 0 ? 0 : value);
    },
    [setComponentPrice]
  );

  // Consolidated effect for all calculations
  useEffect(() => {
    // Handle component input validation
    if (componentInput.length === 1 && /^[+\-*/\s]+$/.test(componentInput)) {
      setComponentInput("");
      return;
    }

    // Process input
    let processedInput = sanitizeAndValidateInput(componentInput);
    if (processedInput !== componentInput) {
      setComponentInput(processedInput);
    }
    processedInput = trimOperators(processedInput);

    // Calculate component total
    const totalComponent = safeEvaluate(processedInput);

    // Calculate financial data
    const capital = Number((totalComponent * componentPrice).toFixed(2));
    const profit = Number((capital * (profitPercentage / 100)).toFixed(2));
    const finalPrice = Number(
      (capital * ((100 + profitPercentage) / 100)).toFixed(2)
    );

    // Update state with all calculations at once
    setCalculationResult({
      totalComponent,
      capital,
      profit,
      finalPrice,
    });
  }, [componentInput, profitPercentage, componentPrice]);

  // Get values from calculation result
  const { totalComponent, finalPrice } = calculationResult;

  return (
    <Box>
      <Center my={5} flexDir={"column"}>
        <HStack w="full" justify="space-between" align="center">
          <Heading as={"h1"} fontSize={"xx-large"} textAlign={"left"}>
            Mechanic Calculator
            <Badge ml={2} fontSize={"xl"} colorScheme={"blue"}>
              Lite
            </Badge>
          </Heading>
        </HStack>
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
        <HStack
          w="full"
          justify="space-between"
          align="end"
          justifyContent={`end`}
        >
          <Settings
            componentPrice={componentPrice}
            setComponentPrice={handleComponentPriceChange}
          />
        </HStack>
      </Center>

      <Divider my={5} />

      <VStack spacing={12}>
        <CalculateView
          componentInput={totalComponent}
          profitPercentage={profitPercentage}
          finalPrice={finalPrice}
          componentPrice={componentPrice}
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
