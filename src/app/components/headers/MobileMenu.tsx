import React, { useState } from "react";
import { Box, Button, Drawer, IconButton, Stack } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { NavLink } from "react-router-dom";
import { useGlobals } from "../../hooks/useGlobals";

interface MobileMenuProps {
  setSignupOpen: (isOpen: boolean) => void;
  setLoginOpen: (isOpen: boolean) => void;
  handleLogoutRequest: () => void;
}

/** Hamburger button + side drawer, only visible on tablet / mobile widths (see navbar.css) */
export default function MobileMenu(props: MobileMenuProps) {
  const { setSignupOpen, setLoginOpen, handleLogoutRequest } = props;
  const { authMember } = useGlobals();
  const [open, setOpen] = useState<boolean>(false);

  /** HANDLERS **/
  const closeMenu = () => setOpen(false);

  const loginHandler = () => {
    closeMenu();
    setLoginOpen(true);
  };

  const signupHandler = () => {
    closeMenu();
    setSignupOpen(true);
  };

  const logoutHandler = () => {
    closeMenu();
    handleLogoutRequest();
  };

  return (
    <>
      <IconButton
        className={"mobile-menu-btn"}
        aria-label={"Open menu"}
        onClick={() => setOpen(true)}
      >
        <MenuIcon />
      </IconButton>

      <Drawer
        anchor={"right"}
        open={open}
        onClose={closeMenu}
        PaperProps={{ className: "mobile-drawer" }}
      >
        <Box className={"mobile-drawer-head"}>
          <Box className={"brand-logo"}>
            <Box className={"brand-logo-main"}>YASMIN</Box>
            <Box className={"brand-logo-sub"}>COSMETICS</Box>
          </Box>
          <IconButton aria-label={"Close menu"} onClick={closeMenu}>
            <CloseIcon />
          </IconButton>
        </Box>

        <Stack className={"mobile-drawer-links"}>
          <NavLink exact to={"/"} activeClassName={"active"} onClick={closeMenu}>
            Home
          </NavLink>
          <NavLink to={"/products"} activeClassName={"active"} onClick={closeMenu}>
            Products
          </NavLink>
          {authMember ? (
            <NavLink to={"/orders"} activeClassName={"active"} onClick={closeMenu}>
              Orders
            </NavLink>
          ) : null}
          {authMember ? (
            <NavLink to={"/member-page"} activeClassName={"active"} onClick={closeMenu}>
              My Page
            </NavLink>
          ) : null}
          <NavLink to={"/help"} activeClassName={"active"} onClick={closeMenu}>
            Help
          </NavLink>
        </Stack>

        <Box className={"mobile-drawer-foot"}>
          {authMember ? (
            <Button className={"drawer-btn ghost"} onClick={logoutHandler}>
              Logout
            </Button>
          ) : (
            <>
              <Button className={"drawer-btn"} onClick={loginHandler}>
                Login
              </Button>
              <Button className={"drawer-btn ghost"} onClick={signupHandler}>
                Sign up
              </Button>
            </>
          )}
        </Box>
      </Drawer>
    </>
  );
}
