import React from "react";
import { Box, Stack } from "@mui/material";
import TabPanel from "@mui/lab/TabPanel";
import moment from "moment";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { retrieveFinishedOrders } from "./selector";
import { serverApi } from "../../../lib/config";
import { Order, OrderItem } from "../../../lib/types/order";
import { Product } from "../../../lib/types/product";
import { handleImageError } from "../../../lib/image";

/** REDUX SELECTOR define process */
const finishedOrdersRetriever = createSelector(
  retrieveFinishedOrders,
  (finishedOrders) => ({ finishedOrders })
);

export default function FinishedOrders() {
  const { finishedOrders } = useSelector(finishedOrdersRetriever); // selector calling


  return (
    <TabPanel value={"3"}>
      <Stack>
        {finishedOrders?.map((order: Order) => {
          return (
            <Box key={order._id} className={"order-main-box"}>
              <Box className={"order-head"}>
                <span className={"order-id"}>
                  Order <b>#{order._id.slice(-6).toUpperCase()}</b> · {moment(order.updatedAt).format("MMM D")}
                </span>
                <span className={"status-chip finished"}>Finished</span>
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
            </Box>
          );
        })}

        {(!finishedOrders || finishedOrders.length === 0) && (
          <Box className={"no-data"}>No finished orders yet.</Box>
        )}
      </Stack>
    </TabPanel>
  );
}
