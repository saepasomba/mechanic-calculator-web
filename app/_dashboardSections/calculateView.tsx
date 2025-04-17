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
  useColorMode,
  useToast,
} from "@chakra-ui/react";
import React, { useCallback, useMemo } from "react";
import { FaRegCopy } from "react-icons/fa";
import { CalculateViewProps } from "../types/calculator";

function CalculateView({
  componentInput,
  profitPercentage,
  finalPrice,
  componentPrice,
}: CalculateViewProps) {
  const toast = useToast();
  const { colorMode } = useColorMode();

  // Memoize expensive calculations
  const { capital, profit } = useMemo(() => {
    const calculatedCapital = Number(
      (componentInput * componentPrice).toFixed(2)
    );
    const calculatedProfit = Number(
      (calculatedCapital * (profitPercentage / 100)).toFixed(2)
    );

    return {
      capital: calculatedCapital,
      profit: calculatedProfit,
    };
  }, [componentInput, componentPrice, profitPercentage]);

  // Memoize event handlers
  const handleCopyToClipboard = useCallback(() => {
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
  }, [finalPrice, toast]);

  return (
    <>
      <Section>
        <Section.Header
          headerTitle="Perhitungan Harga"
          headerSubTitle={`(Comp × $${componentPrice}) × (100 + Profit)% = Harga`}
        />
        <Section.Body>
          <Flex flexDir={"column"} gap={5}>
            <Box>
              <TableContainer>
                <Table
                  variant="simple"
                  size={"sm"}
                  colorScheme={colorMode === "light" ? "blackAlpha" : "gray"}
                >
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
                            colorScheme={
                              colorMode === "light" ? "blackAlpha" : "grayAlpha"
                            }
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

// Use React.memo to prevent unnecessary re-renders
export default React.memo(CalculateView);
