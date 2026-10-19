import { Box } from "@mui/material";

/** Placeholder card shown while products are loading (uses the same pcard layout) */
export default function ProductCardSkeleton() {
  return (
    <Box className={"pcard pcard-skeleton"} aria-hidden={"true"}>
      <Box className={"pcard-img skeleton-block"} />
      <Box className={"pcard-body"}>
        <Box className={"skeleton-line w-70"} />
        <Box className={"skeleton-line w-40"} />
        <Box className={"skeleton-line w-90"} />
        <Box className={"skeleton-line w-30"} />
      </Box>
    </Box>
  );
}
