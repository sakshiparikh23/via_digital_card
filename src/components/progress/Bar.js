import { Box } from "@chakra-ui/react";

export const Bar = ({ animationDuration, progress }) => (
  <Box
    bg="greenBrand.100"
    h="0.25rem"
    w="full"
    left="0"
    top="0"
    position="fixed"
    zIndex="50"
    // className="bg-indigo-600 h-1 w-full left-0 top-0 fixed z-50"
    style={{
      marginLeft: `${(-1 + progress) * 100}%`,
      transition: `margin-left ${animationDuration}ms linear`,
    }}
  ></Box>
);
