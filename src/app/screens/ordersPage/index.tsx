import { useState, SyntheticEvent, useEffect} from "react";
import { Container, Stack, Box } from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PausedOrders from "./PausedOrders";
import ProcessOrders from "./ProcessOrders";
import FinishedOrders from "./FinishedOrders";
import { Order, OrderInquiry } from "../../../lib/types/order";
import { setFinishedOrders, setPausedOrders, setProcessOrders } from "./slice";
import { useDispatch } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { OrderStatus } from "../../../lib/enums/order.enum";
import OrderService from "../../services/OrderService";
import { useGlobals } from "../../hooks/useGlobals";
import "../../../css/order.css";
import { useHistory } from "react-router-dom";
import { serverApi } from "../../../lib/config";


/** REDUX SLICE define process */
const actionDispatch = (dispatch: Dispatch) => ({
  setPausedOrders: (data: Order[])=> dispatch(setPausedOrders(data)),
  setProcessOrders: (data: Order[])=> dispatch(setProcessOrders(data)),
  setFinishedOrders: (data: Order[])=> dispatch(setFinishedOrders(data))
});


export default function OrdersPage() {
  const {setPausedOrders,setProcessOrders,setFinishedOrders} = 
   actionDispatch(useDispatch());
   const {orderBuilder, authMember} = useGlobals();
   const history = useHistory();
  const [value, setValue] = useState("1");
  const [orderInquiry, setOrderInquiry] = useState<OrderInquiry>({
    page: 1,
    limit: 5,
    orderStatus: OrderStatus.PAUSE,
  });

  useEffect(() => {
    const order = new OrderService();

    order
    .getMyOrders({ ...orderInquiry, orderStatus: OrderStatus.PAUSE})
    .then((data) => setPausedOrders(data))
    .catch((err) => console.log(err));

    order
    .getMyOrders({ ...orderInquiry, orderStatus: OrderStatus.PROCESS})
    .then((data) => setProcessOrders(data))
    .catch((err) => console.log(err));

    order
    .getMyOrders({ ...orderInquiry, orderStatus: OrderStatus.FINISH})
    .then((data) => setFinishedOrders(data))
    .catch((err) => console.log(err));

  },[orderInquiry, orderBuilder]);

  /** HANDLERS **/

  const handleChange = (e: SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  if (!authMember) history.push("/");
  return (
    <div className={"order-page"}>
      <Container className="order-container">
        <Box className={"page-title"}>My orders</Box>
        <Stack className={"order-body"} flexDirection={"row"}>
          <Stack className={"order-left"}>
            <TabContext value={value}>
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="order status tabs"
                className={"order-tabs"}
              >
                <Tab label="Paused" value={"1"} />
                <Tab label="Processing" value={"2"} />
                <Tab label="Finished" value={"3"} />
              </Tabs>
              <Stack className={"order-main-content"}>
                <PausedOrders setValue={setValue}/>
                <ProcessOrders setValue={setValue}/>
                <FinishedOrders />
              </Stack>
            </TabContext>
          </Stack>

          <Stack className={"order-right"}>
            <Box className={"side-card"}>
              <Box className={"profile-top"}>
                <img
                  src={authMember?.memberImage
                   ? `${serverApi}/${authMember.memberImage}`
                   : "/icons/default-user.svg"}
                  className={"order-user-avatar"}
                />
                <Box>
                  <div className={"profile-name"}>{authMember?.memberNick}</div>
                  <div className={"profile-type"}>{authMember?.memberType}</div>
                </Box>
              </Box>
              <Box className={"addr-row"}>
                <LocationOnIcon sx={{ fontSize: 18 }} />
                <div>{authMember?.memberAddress
                     ? authMember.memberAddress
                     : "Do not exist"}</div>
              </Box>
            </Box>
            <Box className={"side-card"}>
              <h3>Payment method</h3>
              <span className={"field-label"}>Card number</span>
              <input
                type={"text"}
                name={"cardNumber"}
                placeholder={"**** 4090 2002 7495"}
                className={"card-input"}
              />
              <div className={"card-half-row"}>
                <Box sx={{ flex: 1 }}>
                  <span className={"field-label"}>Expiry</span>
                  <input
                    type={"text"}
                    name={"cardPeriod"}
                    placeholder={"07 / 24"}
                    className={"card-half-input"}
                  />
                </Box>
                <Box sx={{ flex: 1 }}>
                  <span className={"field-label"}>CVV</span>
                  <input
                    type={"text"}
                    name={"cardCVV"}
                    placeholder={"010"}
                    className={"card-half-input"}
                  />
                </Box>
              </div>
              <span className={"field-label"}>Name on card</span>
              <input
                type={"text"}
                name={"cardCreator"}
                placeholder={"Full name"}
                className={"card-input"}
              />
              <div className={"cards-box"}>
                <img src={"/icons/western-card.svg"} />
                <img src={"/icons/master-card.svg"} />
                <img src={"/icons/paypal-card.svg"} />
                <img src={"/icons/visa-card.svg"} />
              </div>
            </Box>
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}
