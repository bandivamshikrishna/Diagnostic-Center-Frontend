import { CircularProgress, Box } from "@mui/material";

export const Loading = () => {
  return (
    <>
      <Box
        position="fixed"
        top={0}
        left={0}
        width="100vw"
        height="100vh"
        display="flex"
        justifyContent="center"
        alignItems="center"
        bgcolor="rgba(255, 255, 255, 0.7)"
        zIndex={9999}
      >
        <CircularProgress />
      </Box>
    </>
  );
};
