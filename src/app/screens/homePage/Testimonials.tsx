import { Box, Stack } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react"; // @ts-ignore
import SwiperCore, { Autoplay, Navigation, Pagination } from "swiper";
import { testimonials } from "../../../lib/data/testimonials";

SwiperCore.use([Autoplay, Navigation, Pagination]);

export default function Testimonials() {
  return (
    <div className={"testimonials-frame"}>
      <Stack className={"testimonials-main"}>
        <Box className={"testimonials-text"}>
          <span className={"sec-tag"}>Community</span>
          <span className={"category-title"}>Loved by our customers</span>
        </Box>

        <Swiper
          className={"testimonials-info swiper-wrapper"}
          slidesPerView={"auto"}
          centeredSlides={true}
          spaceBetween={30}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
          pagination={{
            el: ".swiper-pagination",
            clickable: true,
          }}
          autoplay={{
            delay: 2500,
            disableOnInteraction: true,
          }}
        >
          {testimonials.map((value, number) => {
            return (
              <SwiperSlide key={number} className={"testimonial-card"}>
                <Box className={"testimonial-product-img"}>
                  <img src={value.productImg} alt={value.productName} />
                  <span className={"testimonial-product-chip"}>{value.productName}</span>
                </Box>
                <Box className={"testimonial-body"}>
                  <Box className={"quote-mark"}>&#8220;</Box>
                  <Box className={"stars"}>
                    {Array.from({ length: value.rating }).map((_, i) => (
                      <span key={i}>&#9733;</span>
                    ))}
                  </Box>
                  <p className={"quote-text"}>{value.quote}</p>
                  <Box className={"testimonial-user"}>
                    <img className={"avatar"} src={value.img} alt={value.name} />
                    <Box>
                      <div className={"t-name"}>{value.name}</div>
                      <div className={"t-role"}>
                        <span className={"verified"}>&#10003;</span> {value.role}
                      </div>
                    </Box>
                  </Box>
                </Box>
              </SwiperSlide>
            );
          })}
        </Swiper>
        <Box className={"prev-next-frame"}>
          <img
            src={"/icons/arrow-right.svg"}
            className={"swiper-button-prev"}
          />
          <div className={"dot-frame-pagination swiper-pagination"}></div>
          <img
            src={"/icons/arrow-right.svg"}
            className={"swiper-button-next"}
            style={{ transform: "rotate(-180deg)" }}
          />
        </Box>
      </Stack>
    </div>
  );
}
