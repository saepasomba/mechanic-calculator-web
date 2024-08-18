import { Center, Flex, Text } from "@chakra-ui/react";

export default function TopCard() {
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
