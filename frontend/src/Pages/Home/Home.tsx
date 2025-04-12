import { useTitle } from "../../component/hook/useTitle";
import NewBanner from "../SharedPage/NewBanner/NewBanner";
import HomeBook from "./HomeBook/HomeBook";
import ImageGallery from "./ImageGallery/ImageGallery";
import Testimonial from "./Testimonial/Testimonial";

const Home = () => {
  useTitle("Home");
  return (
    <div>
      <div className="">
        {/* <Banner /> */}
        <div className="max-w-[100rem] mx-auto">
          <NewBanner />
        </div>
        <div className="max-w-[100rem] mx-auto ">
          <ImageGallery />
        </div>
        <div className="max-w-[100rem] mx-auto ">
          <HomeBook />
        </div>
        <Testimonial />
      </div>
    </div>
  );
};

export default Home;
