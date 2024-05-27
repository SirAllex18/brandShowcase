import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../customCSS/CardSlider.css";

const PlayerCard = () => {

  return (
    <>
      <div class="container">
        <div class="card__container">
          <article class="card__article">
            <img src="assets/logo.jpg" alt="" class="card__img" />
            <div class="card__data">
              <span class="card__description">Player 1 Name</span>
              <h2 class="card__title">Goluri marcate: 20</h2>
            </div>
          </article>
        </div>
      </div>
    </>
  );
};

export default PlayerCard;
