import { useAuth } from "../../contexts/authContext";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/firebaseConfig";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { db } from "../../firebase/firebaseConfig";
import { collection, onSnapshot, query, where } from "firebase/firestore";

const Header = () => {
  const { user } = useAuth();
  console.log(user);
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const colRef = collection(db, "categories");
    onSnapshot(colRef, (snapshot) => {
      const results = [];
      snapshot.forEach((doc) => {
        results.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setCategories(results);
    });
  }, []);

  return (
    <div className="navbar bg-[#010406]">
      <div className="flex-1">
        <a href="/" className="btn btn-ghost normal-case text-white text-xl">
          Blogger
        </a>
      </div>
      <ul className="menu menu-horizontal px-1">
        <li>
          <Link to={"/"} className="text-white">
            Trang Chủ
          </Link>
        </li>
        <li>
          <details>
            <summary className="text-white">Category</summary>
            <ul className="p-2 bg-base-100 z-10">
              {categories.map((category) => (
                <li key={category.id}>
                  <Link to={"/category/" + category.slug} className="text-black">
                    {category.category}
                  </Link>
                </li>
              ))}
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
                <Link
                  to={"/profile/" + user?.uid}
                  className="justify-between text-black"
                >
                  Profile
                  <span className="badge">New</span>
                </Link>
              </li>
              <li>
                <Link to={"/admin/products"} className="text-black">
                  Blog
                </Link>
              </li>
              <li>
                <span
                  onClick={() => {
                    signOut(auth);
                    navigate("/sign-in");
                  }}
                  className="text-black"
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
