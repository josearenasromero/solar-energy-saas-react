import { Box, CircularProgress } from "@lib/mui";
const containerStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "80vh",
};

export default function Loading() {
  return (
    <div>
      <Box style={containerStyle}>
        <CircularProgress color="inherit" />
      </Box>
    </div>
  );
}
