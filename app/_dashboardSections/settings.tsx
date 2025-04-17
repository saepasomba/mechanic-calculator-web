import Section from "@/components/section";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  HStack,
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { SettingsIcon } from "@chakra-ui/icons";
import React, { useState } from "react";

interface SettingsProps {
  componentPrice: number;
  setComponentPrice: (value: number) => void;
}

export default function Settings({
  componentPrice,
  setComponentPrice,
}: SettingsProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [internalComponentPrice, setInternalComponentPrice] = useState<string>(
    componentPrice.toString()
  );

  const handleComponentPriceChange = (valueAsString: string) => {
    setInternalComponentPrice(valueAsString);
    const value = parseFloat(valueAsString);
    if (!isNaN(value) && value >= 0) {
      setComponentPrice(value);
    } else {
      setComponentPrice(0);
    }
  };

  const format = (val: string) => `$` + val;

  return (
    <>
      <Button
        leftIcon={<SettingsIcon />}
        size="sm"
        onClick={onOpen}
        variant="outline"
        aria-label="Settings"
      >
        Settings
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Calculator Settings</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex flexDir="column" gap={4}>
              <FormControl>
                <FormLabel fontSize="sm">Harga Component</FormLabel>
                <HStack>
                  <NumberInput
                    value={format(internalComponentPrice)}
                    onChange={handleComponentPriceChange}
                    min={0}
                    w="100%"
                  >
                    <NumberInputField />
                  </NumberInput>
                </HStack>
                <FormHelperText fontSize="xs">
                  Default: 0.6. Dapat diubah jika ada perubahan harga component.
                </FormHelperText>
              </FormControl>
            </Flex>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
