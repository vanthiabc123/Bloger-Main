import { db } from "../../firebase/firebaseConfig";
import {
  collection,
  getDocs,
  where,
  limit,
  orderBy,
  query,
  onSnapshot,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import PostItem from "./PostItem";

const PostFeatured = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const colRef = collection(db, "posts");
    const queries = query(colRef, where("featured", "==", true), limit(5));
    onSnapshot(queries, (snapshot) => {
      const results = [];
      snapshot.forEach((doc) => {
        results.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setPosts(results);
    });
  }, []);
  return (
    <div className="mb-5">
      <h3 className="text-3xl text-white font-semibold mb-5">Featured</h3>
      <div className="flex bg-white shadow-md overflow-hidden rounded-md  gap-x-5 mb-5 flex-col md:flex-row">
        <img
          className="h-[433px] w-full object-cover"
          src="https://source.unsplash.com/random"
          alt=""
        />
        <div className="p-5">
          <h3 className="text-2xl font-semibold text-black">Post Title</h3>
          <p className="text-black ">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
            voluptatum, voluptate, quibusdam, quia voluptas quod quos
            voluptatibus quae doloribus quas natus. Quisquam voluptatum,
          </p>
          {/* category */}
          <div className="flex gap-x-2 mt-2">
            <span className="text-black">Category:</span>
          </div>
        </div>
      </div>
      <div className="grid lg:grid-cols-4 lg:gap-5 max-lg:grid-flow-col max-lg:auto-cols-[215px] gap-5 max-lg:overflow-x-auto scroll-hidden ">
        {posts.length > 0 &&
          posts.map((post) => <PostItem key={post.id} post={post}></PostItem>)}
      </div>
    </div>
  );
};

export default PostFeatured;
