import { useAuth } from "../../contexts/authContext";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/firebaseConfig";
import { Link } from "react-router-dom";

const Header = () => {
  const { user } = useAuth();
  console.log(user);

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
        {user ? (
          <div className="flex gap-x-2 items-center">
            <span className="text-white text-sm font-medium">
              Welcome, {user.email}
            </span>
            <button
              onClick={() => signOut(auth)}
              className="bg-blue-500 text-white px-5 py-2 rounded-md"
            >
              Logout
            </button>
          </div>
        ) : (
          <Link
            to={"/sign-in"}
            className="bg-blue-500 text-white px-5 py-2 rounded-md"
          >
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default Header;
