import { Box, Flex, Text } from "@chakra-ui/react"
import { Link } from "react-router-dom"

export default function Header() {
  return (
    <Box as="header" bg="gray.800" w="100%" h="20">
      <Flex
        as="nav"
        w="100%"
        h="100%"
        maxW={1200}
        mx="auto"
        align="center"
        justify="space-between"
        px="6"
      >
        <Text fontSize="3xl" fontWeight="bold" color="white">
          Workshop
        </Text>
        <Flex as="ul" listStyleType="none">
          <Box as="li" mx="4">
            <Link to="/">
              <Text color="white">Home</Text>
            </Link>
          </Box>
          <Box as="li" mx="4">
            <Link to="/about">
              <Text color="white">Sobre o projeto</Text>
            </Link>
          </Box>
        </Flex>
      </Flex>
    </Box>
  )
}