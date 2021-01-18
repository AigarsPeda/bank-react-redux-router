import React from "react";
import Img from "./images/img1.jpg";
import "./styles.scss";

const App: React.FC = () => {
  return (
    <div>
      <p>Hello World</p>
      <img src={Img} />
    </div>
  );
};

export default App;
