import React from "react";
import Slider from "react-slick";
import CategoryCard from "./CategoryCard";

export default function SimpleSlider() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
  };
  return (
    <Slider {...settings}>
      <div>
        <CategoryCard photo="src/assets/images/girls-pg.jpg" category="PGs for Girls"/>
      </div>
      <div>
        <CategoryCard photo="src/assets/images/boys-pg.jpg"
        category="PGs for Boys"/>
      </div>
      <div>
        <CategoryCard photo="src/assets/images/1bhk.jpg" 
        category="1 BHK Apartments"/>
      </div>
      <div>
        <CategoryCard photo="src/assets/images/2bhk.jpg" category="2 BHK Shared Flats"/>
      </div>
      <div>
        <CategoryCard
        photo="src/assets/images/3bhk.jpg" category="3 BHK Shared Flats"/>
      </div>
      <div>
        <CategoryCard 
        photo="src/assets/images/rentals.jpg" category="Short-Term Rentals"/>
      </div>
    </Slider>
  );
}