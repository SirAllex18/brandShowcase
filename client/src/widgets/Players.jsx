import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { useEffect, useState } from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import "../customCSS/CardSlider.css";
import { Typography } from "@mui/material";

const PlayersSlider = () => {
  const [players, setNewPlayers] = useState([]);
  useEffect(() => {
    const getPlayers = async () => {
      try {
        const response = await fetch(
          "http://localhost:3001/players/getAllPlayers"
        );

        if (response.ok) {
          const data = await response.json();
          setNewPlayers(data);
        } else {
          console.log("Error fetching data");
        }
      } catch (err) {
        throw new Error("Error fetching players", err);
      }
    };

    getPlayers();
  }, []);

  return (
    <section className="container">
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={15}
        slidesPerView={3}
        navigation
        pagination={{ clickable: true }}
      >
        {players.map((item, index) => (
          <SwiperSlide key={index}>
            <article className="card__article">
              <div className="card__image">
                <img
                  src={`${process.env.PUBLIC_URL}/assets/player.jpg`}
                  alt="Player"
                  className="card__img"
                />
                <div className="card__shadow"></div>
              </div>
              <div className="card__data">
                <h3 className="card__name">
                <Typography
                    variant="h2"
                    sx={{
                      color: "#7CB9E8", 
                      textShadow: "1px 1px 2px rgba(0, 0, 0, 0.7)", 
                    }}
                  >{item.name}</Typography>
                </h3>
                <p className="card__description">
                  {" "}
                  <Typography
                    variant="h3"
                    sx={{
                      color: "#7CB9E8",
                      fontWeight: 'bold'
                    }}
                  >
                    {item.kitNumber}
                  </Typography>
                </p>
                <a href="/players" className="card__button">
                  <Typography variant="h4" sx={{ color: "#7CB9E8"}}> View More </Typography>
                </a>
              </div>
            </article>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default PlayersSlider;
