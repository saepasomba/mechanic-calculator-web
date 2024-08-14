"use client";
import Section from "@/components/section";
import {
  Badge,
  Box,
  Button,
  Center,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Slider,
  SliderFilledTrack,
  SliderMark,
  SliderThumb,
  SliderTrack,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Text,
  Tfoot,
  Th,
  Thead,
  Tr,
  VStack,
} from "@chakra-ui/react";
import React, { ChangeEvent, useEffect, useState } from "react";

function TopCard() {
  return (
    <>
      <Center bg="" color={"white"} my={10}>
        <Center
          flexDir={"column"}
          bg="blue.900"
          w="100%"
          px={5}
          py={3}
          borderRadius={15}
          boxShadow={"dark-lg"}
        >
          <Flex w="100%">
            <Text fontSize={"xl"} fontWeight={"bold"} mb={2}>
              Quick Info
            </Text>
          </Flex>

          <Flex justifyContent={"space-between"} w="100%">
            <Text fontWeight={"bold"}>Total Penghasilan</Text>
            <Text>$0</Text>
          </Flex>

          <Flex justifyContent={"space-between"} w="100%">
            <Text opacity={0.4}>Total Modal</Text>
            <Text>$0</Text>
          </Flex>

          <Flex justifyContent={"space-between"} w="100%">
            <Text opacity={0.4}>Total Keuntungan</Text>
            <Text>$0</Text>
          </Flex>
        </Center>
      </Center>
    </>
  );
}

interface BodyFormInterface {
  componentHandler: (e: number) => void;
  profitHandler: (e: number) => void;
  profitValue: number;
  componenInput: number;
}

function BodyForm({
  componentHandler,
  profitHandler,
  profitValue,
  componenInput,
}: BodyFormInterface) {
  const labelStyles = {
    mt: "2",
    ml: "-2.5",
    fontSize: "sm",
    opacity: 0.5,
  };

  const componentStringHandler = (value: string) =>
    componentHandler(Number(value));
  const profitStringHandler = (value: string) => profitHandler(Number(value));

  return (
    <>
      <Section>
        <Section.Header headerTitle="Input Detail" />
        <Section.Body>
          <Flex flexDir={"column"} gap={5}>
            <FormControl>
              <FormLabel color="white">Persentase Keuntungan</FormLabel>
              <HStack w={"100%"}>
                <HStack mr={1} w="50%">
                  <NumberInput
                    value={`${profitValue}`}
                    onChange={profitStringHandler}
                    min={0}
                    max={100}
                  >
                    <NumberInputField />
                    <NumberInputStepper>
                      <NumberIncrementStepper color="white" />
                      <NumberDecrementStepper color="white" />
                    </NumberInputStepper>
                  </NumberInput>
                  <Text>%</Text>
                </HStack>
                <Slider
                  focusThumbOnChange={false}
                  value={profitValue}
                  onChange={profitHandler}
                  w={"100%"}
                >
                  <SliderMark value={25} {...labelStyles}>
                    25%
                  </SliderMark>
                  <SliderMark value={50} {...labelStyles}>
                    50%
                  </SliderMark>
                  <SliderMark value={75} {...labelStyles}>
                    75%
                  </SliderMark>
                  <SliderTrack>
                    <SliderFilledTrack />
                  </SliderTrack>
                  <SliderThumb fontSize="sm" boxSize={5} />
                </Slider>
              </HStack>
            </FormControl>

            <FormControl>
              <FormLabel color="white">Jumlah Component</FormLabel>
              <NumberInput
                min={0}
                value={componenInput}
                onChange={componentStringHandler}
              >
                <NumberInputField placeholder="0" />
                <NumberInputStepper>
                  <NumberIncrementStepper color="white" />
                  <NumberDecrementStepper color="white" />
                </NumberInputStepper>
              </NumberInput>
            </FormControl>
          </Flex>
        </Section.Body>
      </Section>
    </>
  );
}

interface CalculateViewInterface {
  componentInput: number;
  profitPercentage: number;
  finalPrice: number;
}

function CalculateView({
  componentInput,
  profitPercentage,
  finalPrice,
}: CalculateViewInterface) {
  let capital = componentInput * 0.55;
  capital = Number(capital.toFixed(2));

  let profit = capital * (profitPercentage / 100);
  profit = Number(profit.toFixed(2));

  return (
    <>
      <Section>
        <Section.Header
          headerTitle="Perhitungan Harga"
          headerSubTitle="(Jumlah comp * Harga comp) * (100 + persentase profit)% = harga"
        />
        <Section.Body>
          <Flex flexDir={"column"} gap={5}>
            <HStack>
              <Text>
                ({componentInput} * 0.55) * {100 + profitPercentage}% ={" "}
              </Text>
              <Text fontSize={"3xl"} fontWeight={"bold"} color="green.500">
                ${finalPrice}
              </Text>
            </HStack>

            <Box>
              <Text fontSize={"l"} fontWeight={"bold"}>
                Detail
              </Text>

              <TableContainer>
                <Table variant="simple" size={"sm"} colorScheme="whiteAlpha">
                  <Thead>
                    <Tr>
                      <Th>Perhitungan</Th>
                      <Th isNumeric>Nominal</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    <Tr>
                      <Td>Modal</Td>
                      <Td isNumeric>${capital}</Td>
                    </Tr>
                    <Tr>
                      <Td>Untung</Td>
                      <Td isNumeric>${profit}</Td>
                    </Tr>
                    <Tr>
                      <Td>Total</Td>
                      <Td isNumeric>${finalPrice}</Td>
                    </Tr>
                  </Tbody>
                </Table>
              </TableContainer>
            </Box>
          </Flex>
        </Section.Body>
      </Section>
    </>
  );
}

export default function Dashboard() {
  const [componentInput, setComponentInput] = useState(0);
  const [profitPercentage, setProfitPercentage] = useState(10);
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
      <Center color="white" my={5}>
        <Heading as={"h1"} textAlign={"center"}>
          Mechanic Calculator{" "}
          <Badge ml={2} fontSize={"xl"}>
            Lite
          </Badge>
        </Heading>
      </Center>

      <Divider my={5} />

      <VStack spacing={12}>
        {/* <TopCard /> */}

        {/* <Divider /> */}

        <CalculateView
          componentInput={componentInput}
          profitPercentage={profitPercentage}
          finalPrice={finalPrice}
        />

        {/* <Divider /> */}

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
