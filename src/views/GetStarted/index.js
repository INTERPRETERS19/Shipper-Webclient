// import React, { Component } from "react";
// import ReactDOM from "react-dom";
// import Feedback from "./data";
// import cx from "classnames";
// import NonPassiveTouchTarget from "./NonPassiveTouchTarget";
// import TouchCarousel, { clamp } from "react-touch-carousel";
// import touchWithMouseHOC from "react-touch-carousel/lib/touchWithMouseHOC";

// import "./styles.css";

// const cardSize = 300;
// const cardPadCount = 3;
// const carouselWidth = clamp(window.innerWidth, 0, 960);

// function CarouselContainer(props) {
//   const {
//     cursor,
//     carouselState: { active, dragging },
//     ...rest
//   } = props;
//   let current = -Math.round(cursor) % Feedback.length;
//   while (current < 0) {
//     current += Feedback.length;
//   }
//   // Put current card at center
//   const translateX =
//     (cursor - cardPadCount) * cardSize + (carouselWidth - cardSize) / 2;
//   return (
//     <NonPassiveTouchTarget
//       className={cx("carousel-container", {
//         "is-active": active,
//         "is-dragging": dragging
//       })}
//     >
//       <NonPassiveTouchTarget
//         className="carousel-track"
//         style={{ transform: `translate3d(${translateX}px, 0, 0)` }}
//         {...rest}
//       />

//       <div className="carousel-pagination-wrapper">
//         <ol className="carousel-pagination">
//           {Feedback.map((_, index) => (
//             <li key={index} className={current === index ? "current" : ""} />
//           ))}
//         </ol>
//       </div>
//     </NonPassiveTouchTarget>
//   );
// }

// const Container = touchWithMouseHOC(CarouselContainer);

// class App extends Component {
//   renderCard(index, modIndex) {
//     const item = Feedback[modIndex];
//     return (
//       <div
//         key={index}
//         className="carousel-card"
//         onClick={() => console.log(`clicked card ${1 + modIndex}`)}
//       >
//         <div
//           className="carousel-card-inner"
//           style={{ backgroundColor: item.background }}
//         >
//           <div className="carousel-title">{item.title}</div>
//           <div className="carousel-text">{item.text}</div>
//         </div>
//       </div>
//     );
//   }

//   render() {
//     return (
//       <React.StrictMode>
//         <TouchCarousel
//           component={Container}
//           cardSize={cardSize}
//           cardCount={Feedback.length}
//           cardPadCount={cardPadCount}
//           loop={true}
//           // autoplay={enableAutoplay ? 2e3 : false}
//           renderCard={this.renderCard}
//           onRest={index => console.log(`rest at index ${index}`)}
//           onDragStart={() => console.log("dragStart")}
//           onDragEnd={() => console.log("dragEnd")}
//           onDragCancel={() => console.log("dragCancel")}
//         />
//       </React.StrictMode>
//     );
//   }
// }

// const rootElement = document.getElementById("root");
// ReactDOM.render(<App />, rootElement);

// export default App;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card } from "@mui/material";
import Rating from "@mui/material/Rating";
const App = () => {
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    fetchProducts();
  }, []);
  const fetchProducts = () => {
    axios
      .get("/review")
      .then((res) => {
        console.log(res.data.data);
        setReviews(res.data.data.review);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <div
        className="item-container"
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        {reviews.map((review) => (
          <Card sx={{ padding: "10px", margin: "10px", width: "150px" }}>
            <div className="card" key={review._id}>
              <h3>{review.name}</h3>
              <div>
                <Rating name="rating" value={review.rating} />{" "}
              </div>
              <p>{review.comment}</p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
export default App;
