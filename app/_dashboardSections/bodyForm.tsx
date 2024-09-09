import Section from "@/components/section";
import {
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
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
  Text,
} from "@chakra-ui/react";
import { FaCog } from "react-icons/fa";

interface BodyFormInterface {
  componentHandler: (e: string) => void;
  profitHandler: (e: number) => void;
  profitValue: number;
  componentInput: string;
  totalComponent: number;
}

export default function BodyForm({
  componentHandler,
  profitHandler,
  profitValue,
  componentInput,
  totalComponent,
}: BodyFormInterface) {
  const labelStyles = {
    mt: "2",
    ml: "-2.5",
    fontSize: "sm",
    opacity: 0.5,
  };

  const componentStringHandler = (value: string) => componentHandler(value);
  const profitStringHandler = (value: string) => profitHandler(Number(value));

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
              <NumberInput
                min={0}
                value={componentInput}
                onChange={componentStringHandler}
              >
                <NumberInputField placeholder="0" />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>

              <FormHelperText>
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
