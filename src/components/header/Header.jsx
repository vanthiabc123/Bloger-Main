const Header = () => {
  return (
    <div className="flex items-center justify-between px-5 py-3 bg-transparent text-white ">
      <img
        className="w-[40px] h-[40px] object-cover"
        src="https://source.unsplash.com/random"
        alt=""
      />
      <ul className="flex gap-x-5">
        <li>Home</li>
        <li>About</li>
        <li>Contact</li>
      </ul>
      <div>
        <button className="bg-blue-500 text-white px-5 py-2 rounded-md">
          Login
        </button>
      </div>
    </div>
  );
};

export default Header;
