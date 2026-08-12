import React from "react";
import { Box, Container, Stack } from "@mui/material";
import WorkspacePremiumOutlinedIcon from "@mui/icons-material/WorkspacePremiumOutlined";
import HealthAndSafetyOutlinedIcon from "@mui/icons-material/HealthAndSafetyOutlined";
import FaceRetouchingNaturalOutlinedIcon from "@mui/icons-material/FaceRetouchingNaturalOutlined";
import PetsOutlinedIcon from "@mui/icons-material/PetsOutlined";

export default function Statistics() {
  return (
    <div className={"static-frame"}>
      <Container>
        <Stack className="info">
          <Box className="static-box">
            <WorkspacePremiumOutlinedIcon className="static-icon" />
            <Box className="static-text-frame">
              <Box className="static-title">Premium Quality</Box>
              <Box className="static-desc">Carefully selected products</Box>
            </Box>
          </Box>
          <Box className="static-box">
            <HealthAndSafetyOutlinedIcon className="static-icon" />
            <Box className="static-text-frame">
              <Box className="static-title">Safe &amp; Tested</Box>
              <Box className="static-desc">Dermatologically tested</Box>
            </Box>
          </Box>
          <Box className="static-box">
            <FaceRetouchingNaturalOutlinedIcon className="static-icon" />
            <Box className="static-text-frame">
              <Box className="static-title">For Every Skin</Box>
              <Box className="static-desc">For all skin types</Box>
            </Box>
          </Box>
          <Box className="static-box">
            <PetsOutlinedIcon className="static-icon" />
            <Box className="static-text-frame">
              <Box className="static-title">Cruelty Free</Box>
              <Box className="static-desc">Not tested on animals</Box>
            </Box>
          </Box>
        </Stack>
      </Container>
    </div>
  );
}
