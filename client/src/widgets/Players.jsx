import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

// Import custom styles
import './CardSlider.css';

const PlayersSlider = () => {
  const cards = [
    {
      image: 'assets/hp.png',
      name: 'ExamplePlayer',
      description: 'Stats: Numbers: Photos: ETC',
    },
    {
      image: 'assets/hp.png',
      name: 'ExamplePlayer',
      description: 'Stats: Numbers: Photos: ETC',
    },
    {
      image: 'assets/hp.png',
      name: 'ExamplePlayer',
      description: 'Stats: Numbers: Photos: ETC',
    },
    {
      image: 'assets/hp.png',
      name: 'ExamplePlayer',
      description: 'Stats: Numbers: Photos: ETC',
    },
    {
      image: 'assets/hp.png',
      name: 'ExamplePlayer',
      description: 'Stats: Numbers: Photos: ETC',
    },
  ];

  return (
    <section className="container">
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={50}
        slidesPerView={3}
        navigation
        pagination={{ clickable: true }}
      >
        {cards.map((card, index) => (
          <SwiperSlide key={index}>
            <article className="card__article">
              <div className="card__image">
                <img src={card.image} alt="Player" className="card__img" />
                <div className="card__shadow"></div>
              </div>
              <div className="card__data">
                <h3 className="card__name">{card.name}</h3>
                <p className="card__description">{card.description}</p>
                <a href="#" className="card__button">View More</a>
              </div>
            </article>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default PlayersSlider;
