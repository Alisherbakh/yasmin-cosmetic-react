import React from "react";
import { Box, Stack } from "@mui/material";
import Button from "@mui/material/Button";
import TabPanel from "@mui/lab/TabPanel";
import moment from "moment";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { retrievePausedOrders } from "./selector";
import { Messages, serverApi } from "../../../lib/config";
import { Order, OrderItem, OrderUpdateInput } from "../../../lib/types/order";
import { Product } from "../../../lib/types/product";
import { useGlobals } from "../../hooks/useGlobals";
import { sweetErrorHandling } from "../../../lib/sweetAlert";
import { OrderStatus } from "../../../lib/enums/order.enum";
import OrderService from "../../services/OrderService";
import { T } from "../../../lib/types/common";

/** REDUX SELECTOR define process */
const pausedOrdersRetriever = createSelector(
  retrievePausedOrders,
  (pausedOrders) => ({ pausedOrders })
);

interface PausedOrdersProps {
  setValue: (input: string) => void;
}

export default function PausedOrders(props: PausedOrdersProps) {
  const {setValue} = props;
  const {authMember, setOrderBuilder} = useGlobals();
  const { pausedOrders } = useSelector(pausedOrdersRetriever); // selector calling

  /** HANDLER **/
  // cancel Orders
  const deleteOrderHandler = async (e: T) => {
    try{
      if (!authMember) throw new Error(Messages.error2);
      const orderId = e.target.value;
      const input: OrderUpdateInput = {
        orderId: orderId,
        orderStatus: OrderStatus.DELETE,
      };

      const confirmation = window.confirm("Do you want to delete the order?");
      if (confirmation) {
        const order = new OrderService();
        await order.updateOrder(input);

        // ReBuild ORDER
        setOrderBuilder(new Date());

      }

    } catch (err){
      console.log(err);
      sweetErrorHandling(err).then();
    }
  }

  // paused orders to process orders
   const processOrderHandler = async (e: T) => {
    try{
      if (!authMember) throw new Error(Messages.error2);
      // Payment Process is here

      const orderId = e.target.value;
      const input: OrderUpdateInput = {
        orderId: orderId,
        orderStatus: OrderStatus.PROCESS,
      };

      const confirmation = window.confirm("Do you want to proceed with payment?");
      if (confirmation) {
        const order = new OrderService();
        await order.updateOrder(input);
         // move to Process
        setValue("2");
        // ReBuild ORDER
        setOrderBuilder(new Date());

      }

    } catch (err){
      console.log(err);
      sweetErrorHandling(err).then();
    }
  }


  return (
    <TabPanel value={"1"}>
      <Stack>
        {pausedOrders?.map((order: Order) => {
          return (
            <Box key={order._id} className={"order-main-box"}>
              <Box className={"order-head"}>
                <span className={"order-id"}>
                  Order <b>#{order._id.slice(-6).toUpperCase()}</b> · {moment(order.createdAt).format("MMM D")}
                </span>
                <span className={"status-chip paused"}>Paused</span>
              </Box>
              <Box className={"order-box-scroll"}>
                {order?.orderItems?.map((item: OrderItem) => {
                  const product: Product = order.productData.filter(
                    (ele: Product) => item.productId === ele._id
                  )[0];
                  const imagePath = `${serverApi}/${product.productImages[0]}`;
                  return (
                    <Box key={item._id} className={"item-row"}>
                      <img src={imagePath} className={"item-img"} />
                      <div className={"item-name"}>{product.productName}</div>
                      <div className={"item-calc"}>${item.itemPrice} × {item.itemQuantity}</div>
                      <div className={"item-sub"}>${item.itemQuantity * item.itemPrice}</div>
                    </Box>
                  );
                })}
              </Box>

              <Box className={"totals"}>
                <div className={"totals-row"}>
                  <span>Product price</span><span>${order.orderTotal - order.orderDelivery}</span>
                </div>
                <div className={"totals-row"}>
                  <span>Delivery</span><span>${order.orderDelivery}</span>
                </div>
                <div className={"totals-row total"}>
                  <span>Total</span><span>${order.orderTotal}</span>
                </div>
              </Box>

              <Box className={"actions"}>
                <Button
                  value={order._id}
                  className={"btn-pill btn-ghost"}
                  onClick={deleteOrderHandler}
                >
                  Cancel
                </Button>
                <Button
                  value={order._id}
                  className={"btn-pill btn-primary"}
                  onClick={processOrderHandler}
                >
                  Payment
                </Button>
              </Box>
            </Box>
          );
        })}

        {!pausedOrders || (pausedOrders.length === 0 && (
          <Box className={"no-data"}>No paused orders yet.</Box>
        ))}
      </Stack>
    </TabPanel>
  );
}
