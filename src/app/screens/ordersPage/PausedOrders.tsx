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
import { sweetConfirm, sweetErrorHandling } from "../../../lib/sweetAlert";
import { OrderStatus } from "../../../lib/enums/order.enum";
import OrderService from "../../services/OrderService";
import { handleImageError } from "../../../lib/image";

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
  const deleteOrderHandler = async (orderId: string) => {
    try{
      if (!authMember) throw new Error(Messages.error2);
      const input: OrderUpdateInput = {
        orderId: orderId,
        orderStatus: OrderStatus.DELETE,
      };

      const confirmation = await sweetConfirm(
        "Cancel this order?",
        "The order will be removed from your list.",
        "Yes, cancel it"
      );
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
   const processOrderHandler = async (orderId: string) => {
    try{
      if (!authMember) throw new Error(Messages.error2);
      // Payment Process is here

      const input: OrderUpdateInput = {
        orderId: orderId,
        orderStatus: OrderStatus.PROCESS,
      };

      const confirmation = await sweetConfirm(
        "Proceed with payment?",
        "Your order will move to processing.",
        "Pay now"
      );
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
                  const product: Product | undefined = order.productData?.find(
                    (ele: Product) => item.productId === ele._id
                  );
                  const imagePath = product?.productImages?.[0]
                    ? `${serverApi}/${product.productImages[0]}`
                    : "/icons/noimage-list.svg";
                  return (
                    <Box key={item._id} className={"item-row"}>
                      <img src={imagePath} className={"item-img"} alt={product?.productName ?? ""} onError={handleImageError} />
                      <div className={"item-name"}>{product?.productName ?? "Product unavailable"}</div>
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
                  className={"btn-pill btn-ghost"}
                  onClick={() => deleteOrderHandler(order._id)}
                >
                  Cancel
                </Button>
                <Button
                  className={"btn-pill btn-primary"}
                  onClick={() => processOrderHandler(order._id)}
                >
                  Payment
                </Button>
              </Box>
            </Box>
          );
        })}

        {(!pausedOrders || pausedOrders.length === 0) && (
          <Box className={"no-data"}>No paused orders yet.</Box>
        )}
      </Stack>
    </TabPanel>
  );
}
