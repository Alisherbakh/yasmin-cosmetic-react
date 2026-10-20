import React from "react";
import { Box, Button, Stack } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import Menu from "@mui/material/Menu";
import Drawer from "@mui/material/Drawer";
import CancelIcon from "@mui/icons-material/Cancel";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useHistory } from "react-router-dom";
import { CartItem } from "../../../lib/types/search";
import { Messages, serverApi } from "../../../lib/config";
import { sweetErrorHandling } from "../../../lib/sweetAlert";
import { useGlobals } from "../../hooks/useGlobals";
import OrderService from "../../services/OrderService";
import { handleImageError } from "../../../lib/image";


interface BasketProps {
  cartItems: CartItem[];
  onAdd: (item: CartItem) => void;
  onRemove: (item: CartItem) => void;
  onDelete: (item: CartItem) => void;
  onDeleteAll: () => void;
  setLoginOpen: (isOpen: boolean) => void;
  /** mobil: savat kichik dropdown o'rniga pastdan ochiladigan oyna (bottom sheet) bo'lib ochiladi */
  mobile?: boolean;
}

export default function Basket(props: BasketProps) {
  const { cartItems, onAdd, onRemove, onDelete, onDeleteAll, setLoginOpen, mobile } = props;
  const {authMember,setOrderBuilder} = useGlobals();
  const history = useHistory();
  const itemsPrice: number = cartItems.reduce(
    (a: number, c: CartItem) => a + c.quantity * c.price,
    0
  );
  const itemsCount: number = cartItems.reduce(
    (a: number, c: CartItem) => a + c.quantity,
    0
  );
const shippingCost:  number = itemsPrice < 100 ? 5 : 0;
const totalPrice = (itemsPrice + shippingCost).toFixed(1);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [ordering, setOrdering] = React.useState<boolean>(false);
  const open = Boolean(anchorEl);

  /** HANDLERS **/

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(e.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  
  const proceedOrderHandler = async () => {
    try {
        handleClose()
        // not logged in: open the login form, the cart is kept
        if (!authMember) {
          setLoginOpen(true);
          return;
        }

        setOrdering(true);
        const order = new OrderService();
        await order.createOrder(cartItems);


       onDeleteAll();
       // Refresh VIA Context
       setOrderBuilder(new Date());

       history.push("/orders");

    } catch(err) {
      console.log(err);
      sweetErrorHandling(err).then();
    } finally {
      setOrdering(false);
    }
  }





  // savat ichidagi qism — desktop (dropdown) va mobil (bottom sheet) uchun bir xil
  const basketContent = (
    <Stack className={"basket-frame"}>
      <Box className={"all-check-box"}>
        {cartItems.length === 0 ? (
          <div className={"cart-title"}>Cart is empty!</div>
          ) : (
            <Stack flexDirection={"row"} className={"cart-header-row"}>
              <div className={"cart-title"}>Cart Products ({itemsCount})</div>
              <Stack
                flexDirection={"row"}
                className={"clear-all-btn"}
                onClick={() => onDeleteAll()}
              >
                <DeleteForeverIcon sx={{ fontSize: 16 }} />
                <span>Clear all</span>
              </Stack>
            </Stack>
          )}
      </Box>

      {cartItems.length === 0 ? (
        <Box className={"basket-empty"}>
          <ShoppingCartIcon sx={{ fontSize: 26 }} />
          <p>Your cart is empty</p>
        </Box>
      ) : (
        <Box className={"orders-main-wrapper"}>
          <Box className={"orders-wrapper"}>
            {cartItems.map((item: CartItem) => {
              const imagePath = `${serverApi}/${item.image}`;
              return (
                <Box className={"basket-info-box"} key={item._id}>
                  <img src={imagePath} className={"product-img"} alt={item.name} onError={handleImageError} />
                  <Box className={"product-divider"} />
                  <Box className={"product-meta"}>
                    <span className={"product-name"}>{item.name}</span>
                    <p className={"product-price"}>
                      ${item.price} × {item.quantity}
                    </p>
                  </Box>
                  <Box className={"col-2"}>
                    <button onClick={() => onRemove(item)} className="remove">
                      −
                    </button>
                    <span className={"qty-count"}>{item.quantity}</span>
                    <button onClick={() => onAdd(item)} className="add">
                      +
                    </button>
                  </Box>
                  <div className={"cancel-btn"} onClick={() => onDelete(item)}>
                    <CancelIcon sx={{ fontSize: 18 }} />
                  </div>
                </Box>
              );
            })}
          </Box>
        </Box>
      )}

      {cartItems.length !== 0 ? (
        <Box className={"basket-order"}>
          <Box className={"basket-total-box"}>
            <span className={"total-label"}>
              Total (incl. ${shippingCost} shipping)
            </span>
            <span className={"price"}>${totalPrice}</span>
          </Box>
          <Button
            onClick={proceedOrderHandler}
            disabled={ordering}
            startIcon={<ShoppingCartIcon sx={{ fontSize: 16 }} />}
            className={"order-btn"}
          >
            {authMember ? "Order" : "Login to order"}
          </Button>
        </Box>
      ) : (
        ""
      )}
    </Stack>
  );

  return (
    <Box className={"hover-line"}>
      <IconButton
        aria-label="cart"
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <Badge badgeContent={itemsCount} color="secondary">
          <img src={"/icons/shopping-cart.svg"} alt={"Basket"} />
        </Badge>
      </IconButton>
      {mobile ? (
        <Drawer
          anchor={"bottom"}
          open={open}
          onClose={handleClose}
          PaperProps={{ className: "m-basket-sheet" }}
        >
          <span className={"m-sheet-handle"} aria-hidden={"true"} />
          {basketContent}
        </Drawer>
      ) : (
        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={handleClose}
          // onClick={handleClose}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 1.5,
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              "&:before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          {basketContent}
        </Menu>
      )}
    </Box>
  );
}
