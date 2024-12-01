import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import Box from "@mui/material/Box";
import splide1 from "../assets/splide1.jpg";
import splide2 from "../assets/splide2.jpg";
import splide3 from "../assets/splide3.jpg";
import splide4 from "../assets/splide4.jpg";
import splide5 from "../assets/splide5.jpg";
import splide6 from "../assets/splide6.jpg";

const Carrusel = () => {
  const images = [splide1, splide2, splide3, splide4, splide5, splide6];

  const groupedImages = [];
  for (let i = 0; i < images.length; i += 3) {
    groupedImages.push(images.slice(i, i + 3));
  }

  return (
    <Box
      sx={{
        width: "100%",
        paddingBlock: 2,
      }}
    >
      <Splide
        options={{
          type: "loop",
          perPage: 1,
          pagination: true,
          arrows: true,
          autoplay: true,
          interval: 4000,
          pauseOnHover: false,
          pauseOnFocus: false,
          gap: "1rem",
          breakpoints: {
            1024: { perPage: 1 },
            768: { perPage: 1 },
          },
        }}
      >
        {groupedImages.map((group, index) => (
          <SplideSlide key={index}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                gap: "1rem",
              }}
            >
              {group.map((src, imgIndex) => (
                <Box
                  key={imgIndex}
                  component="img"
                  src={src}
                  alt={`Slide ${imgIndex + 1}`}
                  sx={{
                    width: "calc(100% / 3 - 1rem)",
                    maxHeight: "500px",
                    borderRadius: "8px",
                    objectFit: "cover",
                  }}
                />
              ))}
            </Box>
          </SplideSlide>
        ))}
      </Splide>
    </Box>
  );
};

export default Carrusel;
