import React from "react";
import { Box, Container, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useGlobals } from "../../hooks/useGlobals";

const Footers = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  background: #20161a;
  background-size: cover;
`;

export default function Footer() {
  const { authMember } = useGlobals();

  return (
    <Footers>
      <Container>
        <Stack flexDirection={"row"} justifyContent={"space-between"} sx={{ mt: "64px", flexWrap: "wrap", rowGap: "40px" }}>
          <Stack flexDirection={"column"} style={{ width: "300px" }}>
            <Box className={"foot-brand"}>
              <Box className={"foot-brand-main"}>YASMIN</Box>
              <Box className={"foot-brand-sub"}>COSMETICS</Box>
            </Box>
            <Box className={"foot-desc-txt"}>
              Skincare and beauty products crafted to bring out your natural
              glow — safe, dermatologically tested, and made for every skin
              type.
            </Box>
            <Box className="sns-context">
              <img src={"/icons/facebook.svg"} alt={"facebook"} />
              <img src={"/icons/twitter.svg"} alt={"twitter"} />
              <img src={"/icons/instagram.svg"} alt={"instagram"} />
              <img src={"/icons/youtube.svg"} alt={"youtube"} />
            </Box>
          </Stack>
          <Stack flexDirection={"row"} sx={{ columnGap: "80px" }}>
            <Stack>
              <Box>
                <Box className={"foot-category-title"}>Shop</Box>
                <Box className={"foot-category-link"}>
                  <Link to="/">Home</Link>
                  <Link to="/products">Products</Link>
                  {authMember && <Link to="/orders">Orders</Link>}
                  <Link to="/help">Help</Link>
                </Box>
              </Box>
            </Stack>
            <Stack>
              <Box>
                <Box className={"foot-category-title"}>Find us</Box>
                <Box
                  flexDirection={"column"}
                  sx={{ mt: "20px" }}
                  className={"foot-category-link"}
                  justifyContent={"space-between"}
                >
                  <Box flexDirection={"row"} className={"find-us"}>
                    <span>L.</span>
                    <div>Downtown, Tashkent</div>
                  </Box>
                  <Box className={"find-us"}>
                    <span>P.</span>
                    <div>+998 90 123 4567</div>
                  </Box>
                  <Box className={"find-us"}>
                    <span>E.</span>
                    <div>hello@yasmincosmetics.com</div>
                  </Box>
                  <Box className={"find-us"}>
                    <span>H.</span>
                    <div>Mon – Sat, 9am – 8pm</div>
                  </Box>
                </Box>
              </Box>
            </Stack>
          </Stack>
        </Stack>
        <Stack
          style={{ border: "1px solid #4a3a3f", width: "100%", opacity: "0.6" }}
          sx={{ mt: "60px" }}
        ></Stack>
        <Stack className={"copyright-txt"}>
          © 2026 Yasmin Cosmetics. All rights reserved.
        </Stack>
      </Container>
    </Footers>
  );
}
