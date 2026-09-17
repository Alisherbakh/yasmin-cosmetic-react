import React from "react";
import { Box, Container, Stack } from "@mui/material";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useHistory } from "react-router-dom";

import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { retrievePopularDishes } from "./selector";
import { Product } from "../../../lib/types/product";
import { serverApi } from "../../../lib/config";
import StarRating from "../../components/common/StarRating";

/** REDUX SELECTOR define process */
const popularDishesRetriever = createSelector(
  retrievePopularDishes,
  (popularDishes) => ({ popularDishes })
);




export default function PopularDishes() {

  const { popularDishes } = useSelector(popularDishesRetriever); // selector calling
  const history = useHistory();

  console.log("popularDishes:", popularDishes);

  const chooseDishHandler = (id: string) => {
    history.push(`/products/${id}`);
  };

  return (
    <div className="popular-dishes-frame">
      <Container>
        <Stack className="popular-section">
          <Stack className={"sec-head"} flexDirection={"row"} justifyContent={"space-between"} alignItems={"flex-end"}>
            <Box>
              <Box className={"sec-tag"}>Fan favorites</Box>
              <Box className="category-title">Popular products</Box>
            </Box>
          </Stack>
          <Stack className="cards-frame">
            {popularDishes.length !== 0 ? (
              popularDishes.map((product: Product) => {
                const imagePath = `${serverApi}/${product.productImages[0]}`;
                return (
                  <Box key={product._id} className={"pcard"} onClick={() => chooseDishHandler(product._id)}>
                    <Box className={"pcard-img"}>
                      <img src={imagePath} alt={product.productName} />
                      <span className={"pcard-chip"}>{product.productCollection}</span>
                      <span className={"pcard-fav"} onClick={(e) => e.stopPropagation()}><FavoriteBorderIcon sx={{ fontSize: 15 }} /></span>
                    </Box>
                    <Box className={"pcard-body"}>
                      <Box className={"pcard-name"}>{product.productName}</Box>
                      <StarRating productId={product._id} className={"pcard-stars"} />
                      <Box className={"pcard-desc"}>
                        {product.productDesc ? product.productDesc : "No description"}
                      </Box>
                      <Stack flexDirection={"row"} justifyContent={"space-between"} alignItems={"center"} className={"pcard-row"}>
                        <span className={"pcard-price"}>${product.productPrice}</span>
                        <span className={"pcard-views"}>
                          <VisibilityOutlinedIcon sx={{ fontSize: 14 }} /> {product.productViews}
                        </span>
                      </Stack>
                    </Box>
                  </Box>
                );
              })
            ) : (
              <Box className="no-data">Popular products are not available!</Box>
            )}
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}
