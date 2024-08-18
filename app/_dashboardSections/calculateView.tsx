import Section from "@/components/section";
import {
  Box,
  Flex,
  HStack,
  Icon,
  IconButton,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useToast,
} from "@chakra-ui/react";
import React from "react";
import { FaRegCopy } from "react-icons/fa";

interface CalculateViewInterface {
  componentInput: number;
  profitPercentage: number;
  finalPrice: number;
}

export default function CalculateView({
  componentInput,
  profitPercentage,
  finalPrice,
}: CalculateViewInterface) {
  const toast = useToast();

  let capital = componentInput * 0.55;
  capital = Number(capital.toFixed(2));

  let profit = capital * (profitPercentage / 100);
  profit = Number(profit.toFixed(2));

  const handleCopyToClipboard = () => {
    const textToCopy = `\$${finalPrice}`;
    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        toast.closeAll();
        toast({
          title: "Harga Berhasil Disalin",
          description: "Kamu dapat menempelkan harga di in-game.",
          status: "success",
          duration: 4000,
          isClosable: true,
        });
      })
      .catch(() => {
        toast.closeAll();
        toast({
          title: "Harga Gagal Disalin",
          description: "Terdapat error ketika menyalin harga.",
          status: "error",
          duration: 4000,
          isClosable: true,
        });
      });
  };

  return (
    <>
      <Section>
        <Section.Header
          headerTitle="Perhitungan Harga"
          headerSubTitle="(Comp × Harga) × (100 + Profit)% = Harga"
        />
        <Section.Body>
          <Flex flexDir={"column"} gap={5}>
            {/* <HStack>
              <Text>
                ({componentInput} * 0.55) * {100 + profitPercentage}% ={" "}
              </Text>
              <Text fontSize={"3xl"} fontWeight={"bold"} color="green.500">
                ${finalPrice}
              </Text>
            </HStack> */}

            <Box>
              <TableContainer>
                <Table variant="simple" size={"sm"} colorScheme="blackAlpha">
                  <Thead>
                    <Tr>
                      <Th>Elemen</Th>
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
                      <Td>
                        <Text as={"b"}>Total</Text>
                      </Td>
                      <Td isNumeric>
                        <HStack justify={"end"}>
                          <IconButton
                            variant={"link"}
                            colorScheme="blackAlpha"
                            icon={<Icon as={FaRegCopy} />}
                            aria-label={"Copy icon"}
                            onClick={handleCopyToClipboard}
                          />
                          <Text
                            fontSize={"xl"}
                            fontWeight={"bold"}
                            color="green.500"
                          >
                            ${finalPrice}
                          </Text>
                        </HStack>
                      </Td>
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
