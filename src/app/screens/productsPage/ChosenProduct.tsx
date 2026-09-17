import React, { useEffect, useState } from "react";
import { Container, Stack, Box } from "@mui/material";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import CheckIcon from "@mui/icons-material/Check";
import BoltIcon from "@mui/icons-material/Bolt";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import Button from "@mui/material/Button";
import { Link, useParams } from "react-router-dom"; // @ts-ignore

import { useDispatch, useSelector  } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { setStore, setChosenProduct} from "./slice";
import { createSelector } from "reselect";
import { retrieveStore, retrieveChosenProduct} from "./selector";
import { Product } from "../../../lib/types/product";
import ProductService from "../../services/ProductService";
import MemberService from "../../services/MemberService";
import { Member } from "../../../lib/types/member";
import { serverApi } from "../../../lib/config";
import { CartItem } from "../../../lib/types/search";
import StarRating from "../../components/common/StarRating";

/** REDUX SLICE define process */
const actionDispatch = (dispatch: Dispatch) => ({
  setStore: (data: Member)=> dispatch(setStore(data)),
  setChosenProduct: (data: Product)=> dispatch(setChosenProduct(data)),
});

/** REDUX SELECTOR define process */
const storeRetriever = createSelector(retrieveStore, (store) => ({
  store })
);
const chosenProductRetriever = createSelector(retrieveChosenProduct, (chosenProduct) => ({
  chosenProduct })
);


interface ChosenProductsProps {
  onAdd: (item: CartItem) => void;
};


export default function ChosenProduct(props: ChosenProductsProps) {
  const { onAdd } = props;
  const { productId } = useParams<{ productId: string }>(); // URL manzilidagi dinamik parametrlarni (URL params) o'qish uchun ishlatiladi.
  const {setStore, setChosenProduct} = actionDispatch(useDispatch()); // slice
  // selector
  const { chosenProduct } = useSelector(chosenProductRetriever);
  const { store } = useSelector(storeRetriever);
  const [activeImage, setActiveImage] = useState<number>(0);

  useEffect(() => {
    const product = new ProductService();
    product.getProduct(productId)
    .then((data) => setChosenProduct(data))
    .catch((err) => console.log(err));

    const member = new MemberService();
    member
    .getStore()
    .then((data) => setStore(data))
    .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    setActiveImage(0);
  }, [productId]);


  if (!chosenProduct) return null;

  const mainImage = `${serverApi}/${chosenProduct.productImages[activeImage]}`;
  const inStock = chosenProduct.productLeftCount > 0;

  return (
    <div className={"chosen-product"}>
      <Container className={"pdp-wrap"}>
        <div className={"crumb"}>
          <Link to={"/"}>Home</Link> / <Link to={"/products"}>Products</Link> / <span>{chosenProduct.productName}</span>
        </div>

        <Stack className={"pdp-grid"} flexDirection={"row"}>
          <Box className={"gallery-col"}>
            <Box className={"gallery-main"}>
              <img src={mainImage} alt={chosenProduct.productName} />
            </Box>
            <Stack className={"thumbs"} flexDirection={"row"}>
              {chosenProduct.productImages.map((ele: string, index: number) => {
                const thumbPath = `${serverApi}/${ele}`;
                return (
                  <Box
                    key={index}
                    className={`thumb ${activeImage === index ? "active" : ""}`}
                    onClick={() => setActiveImage(index)}
                  >
                    <img src={thumbPath} alt={`${chosenProduct.productName} ${index + 1}`} />
                  </Box>
                );
              })}
            </Stack>
          </Box>

          <Box className={"info-col"}>
            <span className={"pill-tag"}>
              {chosenProduct.productCollection} · {chosenProduct.productVolume}
            </span>
            <h1 className={"product-name"}>{chosenProduct.productName}</h1>
            <StarRating productId={chosenProduct._id} interactive />
            <Stack className={"meta-line"} flexDirection={"row"} alignItems={"center"} flexWrap={"wrap"}>
              Sold by <b>{store?.memberNick}</b>
              <span className={"meta-dot"} /> {store?.memberPhone}
              <span className={"meta-dot"} />
              <RemoveRedEyeIcon sx={{ fontSize: 14 }} /> {chosenProduct.productViews} views
            </Stack>
            <p className={"product-desc"}>
              {chosenProduct.productDesc ? chosenProduct.productDesc : "No description"}
            </p>

            <Box className={"buy-card"}>
              <Stack className={"price-row"} flexDirection={"row"} justifyContent={"space-between"} alignItems={"baseline"}>
                <span className={"price"}>${chosenProduct.productPrice}</span>
                <span className={inStock ? "stock in" : "stock out"}>
                  {inStock ? `${chosenProduct.productLeftCount} in stock` : "Out of stock"}
                </span>
              </Stack>
              <Button
                className={"add-btn"}
                variant={"contained"}
                disabled={!inStock}
                onClick={(e) => {
                  onAdd({
                    _id: chosenProduct._id,
                    quantity: 1,
                    name: chosenProduct.productName,
                    price: chosenProduct.productPrice,
                    image: chosenProduct.productImages[0],
                  });
                  e.stopPropagation();
                }}
              >
                Add to basket
              </Button>
              <Stack className={"trust-mini"} flexDirection={"row"} justifyContent={"space-between"}>
                <Box className={"item"}>
                  <span className={"ico"}><CheckIcon sx={{ fontSize: 16 }} /></span>
                  Cruelty free
                </Box>
                <Box className={"item"}>
                  <span className={"ico"}><BoltIcon sx={{ fontSize: 16 }} /></span>
                  Fast delivery
                </Box>
                <Box className={"item"}>
                  <span className={"ico"}><AutorenewIcon sx={{ fontSize: 16 }} /></span>
                  Easy returns
                </Box>
              </Stack>
            </Box>
          </Box>
        </Stack>
      </Container>
    </div>
  );
}
