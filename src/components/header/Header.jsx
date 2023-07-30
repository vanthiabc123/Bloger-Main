import { useAuth } from "../../contexts/authContext";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/firebaseConfig";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const { user } = useAuth();
  console.log(user);
  const navigate = useNavigate();

  return (
    <div className="navbar bg-[#041c32]">
      <div className="flex-1">
        <a href="/" className="btn btn-ghost normal-case text-xl">
          Blogger
        </a>
      </div>
      <ul className="menu menu-horizontal px-1">
        <li>
          <a href="/">Trang Chủ</a>
        </li>
        <li>
          <details>
            <summary>Parent</summary>
            <ul className="p-2 bg-base-100">
              <li>
                <a>Link 1</a>
              </li>
              <li>
                <a>Link 2</a>
              </li>
            </ul>
          </details>
        </li>
      </ul>
      {user ? (
        <div className="flex-none">
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img src={user?.photoURL} />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <Link to={"/profile/" + user?.uid} className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </Link>
              </li>
              <li>
                <Link to={"/admin/products"}>Blog</Link>
              </li>
              <li>
                <span
                  onClick={() => {
                    signOut(auth);
                    navigate("/sign-in");
                  }}
                >
                  Logout
                </span>
              </li>
            </ul>
          </div>
        </div>
      ) : (
        <div>
          <Link to={"/sign-in"} className="btn btn-primary">
            Sign In
          </Link>
        </div>
      )}
    </div>
  );
};

export default Header;
