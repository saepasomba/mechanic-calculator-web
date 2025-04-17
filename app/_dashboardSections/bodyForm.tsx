import Section from "@/components/section";
import {
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  HStack,
  Input,
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
  Text,
} from "@chakra-ui/react";
import React, { useCallback } from "react";
import { BodyFormProps } from "../types/calculator";

function BodyForm({
  componentHandler,
  profitHandler,
  profitValue,
  componentInput,
  totalComponent,
}: BodyFormProps) {
  const labelStyles = {
    mt: "2",
    ml: "-2.5",
    fontSize: "sm",
    opacity: 0.5,
  };

  // Memoize handler functions
  const componentStringHandler = useCallback(
    (value: string) => componentHandler(value),
    [componentHandler]
  );

  const profitStringHandler = useCallback(
    (value: string) => profitHandler(Number(value)),
    [profitHandler]
  );

  const handleInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) =>
      componentStringHandler(event.target.value),
    [componentStringHandler]
  );

  return (
    <>
      <Section>
        <Section.Header headerTitle="Input Detail" />
        <Section.Body>
          <Flex flexDir={"column"} gap={5}>
            <FormControl>
              <FormLabel>Persentase Keuntungan</FormLabel>
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
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
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
              <FormLabel>Jumlah Component</FormLabel>
              <Input
                value={componentInput}
                onChange={handleInputChange}
                placeholder="0"
              ></Input>

              <FormHelperText color={"gray.500"}>
                {/[+\-*/]/.test(componentInput)
                  ? `Total Component: ${totalComponent}`
                  : "Tips: Kamu bisa menggunakan + dan -"}
              </FormHelperText>
            </FormControl>
          </Flex>
        </Section.Body>
      </Section>
    </>
  );
}

// Use React.memo to prevent unnecessary re-renders
export default React.memo(BodyForm);
