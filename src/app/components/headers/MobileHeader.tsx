import React, { useState } from "react";
import { Box, Button, Drawer, IconButton, Stack } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import LocalMallOutlinedIcon from "@mui/icons-material/LocalMallOutlined";
import ReceiptLongOutlinedIcon from "@mui/icons-material/ReceiptLongOutlined";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import { NavLink, useHistory, useLocation } from "react-router-dom";
import { CartItem } from "../../../lib/types/search";
import { serverApi } from "../../../lib/config";
import { useGlobals } from "../../hooks/useGlobals";
import Basket from "./Basket";

interface MobileHeaderProps {
  cartItems: CartItem[];
  onAdd: (item: CartItem) => void;
  onRemove: (item: CartItem) => void;
  onDelete: (item: CartItem) => void;
  onDeleteAll: () => void;
  setSignupOpen: (isOpen: boolean) => void;
  setLoginOpen: (isOpen: boolean) => void;
  handleLogoutRequest: () => void;
}

/**
 * MOBIL NAVIGATSIYA (autore-next'dagi Top.tsx mobil qismi bilan bir xil tuzilma):
 *  - tepada ilova paneli (logo + savat + menyu)
 *  - pastda doimiy tab bar (Home, Products, Orders, Help, My)
 *  - menyu — pastdan ochiladigan oyna (bottom sheet)
 * Ranglar, shriftlar va logo — loyihaning o'z dizayni (navbar.css'dagi o'zgaruvchilar), yangi dizayn qo'shilmagan.
 */
export default function MobileHeader(props: MobileHeaderProps) {
  const { cartItems, onAdd, onRemove, onDelete, onDeleteAll, setSignupOpen, setLoginOpen, handleLogoutRequest } = props;
  const { authMember } = useGlobals();
  const location = useLocation();
  const history = useHistory();
  const [sheetOpen, setSheetOpen] = useState<boolean>(false);

  // mahsulot sahifasida (/products/:id) pastda o'z "savatga qo'shish" paneli bo'ladi — tab bar ko'rsatilmaydi
  const isProductDetail = /^\/products\/[^/]+/.test(location.pathname);
  const isActive = (path: string) => (path === "/" ? location.pathname === "/" : location.pathname.startsWith(path));

  const tabs = [
    { to: "/", label: "Home", icon: <HomeOutlinedIcon />, auth: false },
    { to: "/products", label: "Products", icon: <LocalMallOutlinedIcon />, auth: false },
    { to: "/orders", label: "Orders", icon: <ReceiptLongOutlinedIcon />, auth: true },
    { to: "/help", label: "Help", icon: <HelpOutlineIcon />, auth: false },
    { to: "/member-page", label: "My", icon: <PersonOutlineIcon />, auth: true },
  ];

  /** HANDLERS **/
  const closeSheet = () => setSheetOpen(false);

  // login talab qiladigan tab (Orders, My) — mehmon bo'lsa login oynasi ochiladi
  const tabClickHandler = (e: React.MouseEvent, needsAuth: boolean) => {
    if (needsAuth && !authMember) {
      e.preventDefault();
      setLoginOpen(true);
    }
  };
  const loginHandler = () => {
    closeSheet();
    setLoginOpen(true);
  };
  const signupHandler = () => {
    closeSheet();
    setSignupOpen(true);
  };
  const logoutHandler = () => {
    closeSheet();
    handleLogoutRequest();
  };
  const myPageHandler = () => {
    closeSheet();
    history.push("/member-page");
  };

  const avatar = authMember?.memberImage ? `${serverApi}/${authMember.memberImage}` : "/icons/default-user.svg";

  return (
    <>
      <header className={"m-appbar"}>
        <NavLink to={"/"} className={"m-logo"} aria-label={"Yasmin home"}>
          <Box className={"brand-logo-main"}>YASMIN</Box>
          <Box className={"brand-logo-sub"}>
            COSMETICS <span className={"brand-logo-mark"}>#</span>
          </Box>
        </NavLink>
        <Stack className={"m-appbar-actions"}>
          <Basket
            mobile
            cartItems={cartItems}
            onAdd={onAdd}
            onRemove={onRemove}
            onDelete={onDelete}
            onDeleteAll={onDeleteAll}
            setLoginOpen={setLoginOpen}
          />
          <IconButton className={"m-icon-btn"} aria-label={"Open menu"} onClick={() => setSheetOpen(true)}>
            <MenuIcon />
          </IconButton>
        </Stack>
      </header>

      {!isProductDetail && (
        <nav className={"m-tabbar"} aria-label={"Main"}>
          {tabs.map((tab) => {
            const active = isActive(tab.to);
            return (
              <NavLink
                key={tab.to}
                to={tab.to}
                className={`m-tab ${active ? "is-active" : ""}`}
                aria-current={active ? "page" : undefined}
                onClick={(e) => tabClickHandler(e, tab.auth)}
              >
                <span className={"m-tab-icon"}>{tab.icon}</span>
                {tab.label}
              </NavLink>
            );
          })}
        </nav>
      )}

      <Drawer anchor={"bottom"} open={sheetOpen} onClose={closeSheet} PaperProps={{ className: "mobile-drawer m-sheet" }}>
        <span className={"m-sheet-handle"} aria-hidden={"true"} />

        {authMember ? (
          <Box className={"m-sheet-profile"}>
            <img className={"m-sheet-avatar"} src={avatar} alt={authMember.memberNick} />
            <Box className={"m-sheet-who"}>
              <strong>{authMember.memberNick}</strong>
              <span>{authMember.memberType}</span>
            </Box>
            <Button className={"drawer-btn ghost m-sheet-mypage"} onClick={myPageHandler}>
              My Page
            </Button>
          </Box>
        ) : (
          <Box className={"m-sheet-guest"}>
            <Button className={"drawer-btn"} onClick={loginHandler}>
              Login
            </Button>
            <Button className={"drawer-btn ghost"} onClick={signupHandler}>
              Sign up
            </Button>
          </Box>
        )}

        <Stack className={"mobile-drawer-links"}>
          <NavLink exact to={"/"} activeClassName={"active"} onClick={closeSheet}>
            Home
          </NavLink>
          <NavLink to={"/products"} activeClassName={"active"} onClick={closeSheet}>
            Products
          </NavLink>
          {authMember ? (
            <NavLink to={"/orders"} activeClassName={"active"} onClick={closeSheet}>
              Orders
            </NavLink>
          ) : null}
          {authMember ? (
            <NavLink to={"/member-page"} activeClassName={"active"} onClick={closeSheet}>
              My Page
            </NavLink>
          ) : null}
          <NavLink to={"/help"} activeClassName={"active"} onClick={closeSheet}>
            Help
          </NavLink>
        </Stack>

        {authMember ? (
          <Box className={"mobile-drawer-foot"}>
            <Button className={"drawer-btn ghost"} onClick={logoutHandler}>
              Logout
            </Button>
          </Box>
        ) : null}
      </Drawer>
    </>
  );
}
