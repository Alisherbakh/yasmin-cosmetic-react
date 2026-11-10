import React from "react";
import { Box, Container, Stack } from "@mui/material";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useHistory } from "react-router-dom";

import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { retrieveNewProducts } from "./selector";
import { Product } from "../../../lib/types/product";
import { serverApi } from "../../../lib/config";
import StarRating from "../../components/common/StarRating";
import ProductCardSkeleton from "../../components/common/ProductCardSkeleton";
import { handleImageError } from "../../../lib/image";

/** REDUX SELECTOR define process */
const newProductsRetriever = createSelector(
  retrieveNewProducts,
  (newProducts) => ({ newProducts })
);

interface NewProductsProps {
  loading: boolean;
}


export default function NewProducts(props: NewProductsProps) {
const { loading } = props;
const { newProducts } = useSelector(newProductsRetriever); // selector calling
const history = useHistory();

const chooseProductHandler = (id: string) => {
  history.push(`/products/${id}`);
};
  return (
    <div className={"new-products-frame"}>
      <Container>
        <Stack className={"main"}>
          <Stack className={"sec-head"} flexDirection={"row"} justifyContent={"space-between"} alignItems={"flex-end"}>
            <Box>
              <Box className={"sec-tag"}>Just landed</Box>
              <Box className="category-title">New arrivals</Box>
            </Box>
          </Stack>
          <Stack className={"cards-frame"}>
            {loading ? (
              [0, 1, 2, 3].map((index) => <ProductCardSkeleton key={index} />)
            ) : newProducts.length !== 0 ? (
              newProducts.map((product: Product) => {
                const imagePath = `${serverApi}/${product.productImages[0]}`;
                const sizeVolume = product.productVolume;
                return (
                  <Box
                    key={product._id}
                    className={"pcard"}
                    role={"link"}
                    tabIndex={0}
                    onClick={() => chooseProductHandler(product._id)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") chooseProductHandler(product._id);
                    }}
                  >
                    <Box className={"pcard-img"}>
                      <img src={imagePath} alt={product.productName} onError={handleImageError} />
                      <span className={"pcard-chip sale"}>New · {sizeVolume}</span>
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
              <Box className="no-data">New products are not available!</Box>
            )}
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}
