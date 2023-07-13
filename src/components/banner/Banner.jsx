import { Typewriter } from "react-simple-typewriter";

const Banner = () => {
  return (
    <div className="w-full h-screen relative">
      <img
        src="banner.png"
        alt=""
        className="w-full h-full object-cover banner-img"
      />
      <div className="absolute top-0 left-0 w-full h-full text-[#ECB365] font-medium bg-opacity-50 flex items-center p-5 text-6xl max-w-[500px]">
        <h1>
          <Typewriter
            words={["Welcome to my website", "I am a web developer"]}
            loop={0}
            cursor
            cursorStyle="_"
            typeSpeed={70}
            deleteSpeed={50}
            delaySpeed={1000}
            onLoopDone={() => console.log(`Done after 5 loops!`)}
          />
        </h1>
      </div>
    </div>
  );
};

export default Banner;
