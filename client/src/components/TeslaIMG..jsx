import img from "../assets/Tesla.jpg";

const TeslaIMG = () => {
  return (
    <div className="teslaImgContainer">
      <img className="teslaImg" src={img} alt="tesla" />
    </div>
  );
};

export default TeslaIMG;
