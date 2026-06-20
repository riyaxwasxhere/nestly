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
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };
  return (
    <Slider {...settings}>
      <div>
        <CategoryCard
          photo="https://plus.unsplash.com/premium_photo-1725443314762-f3feff2e7d68?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Z2lybHMlMjBwZ3xlbnwwfHwwfHx8MA%3D%3D"
          category="PGs for Girls"
        />
      </div>
      <div>
        <CategoryCard
          photo="https://plus.unsplash.com/premium_photo-1717014211334-8ae3b98a5965?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8Ym95cyUyMHBnfGVufDB8fDB8fHww"
          category="PGs for Boys"
        />
      </div>
      <div>
        <CategoryCard
          photo="https://images.unsplash.com/photo-1615874959474-d609969a20ed?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmVkcm9vbXN8ZW58MHx8MHx8fDA%3D"
          category="1 BHK Apartments"
        />
      </div>
      <div>
        <CategoryCard
          photo="shttps://images.unsplash.com/photo-1617098900591-3f90928e8c54?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGJlZHJvb21zfGVufDB8fDB8fHww"
          category="2 BHK Apartments"
        />
      </div>
      <div>
        <CategoryCard
          photo="https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YmVkcm9vbXN8ZW58MHx8MHx8fDA%3D"
          category="3 BHK Apartments"
        />
      </div>
    </Slider>
  );
}
