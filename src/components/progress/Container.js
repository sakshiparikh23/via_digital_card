import { Box } from "@chakra-ui/react";

export const Container = ({ animationDuration, children, isFinished }) => (
  <Box
    pointerEvents="none"
    // className="pointer-events-none"
    style={{
      opacity: isFinished ? 0 : 1,
      transition: `opacity ${animationDuration}ms linear`,
    }}
  >
    {children}
  </Box>
);
