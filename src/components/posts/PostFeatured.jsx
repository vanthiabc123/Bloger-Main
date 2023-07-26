import { db } from "../../firebase/firebaseConfig";
import {
  collection,
  where,
  limit,
  query,
  onSnapshot,
  and,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import PostItem from "./PostItem";
import PostFeaturedLagre from "./PostFeaturedLagre";

const PostFeatured = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const colRef = collection(db, "posts");
    const queries = query(
      colRef,
      where("featured", "==", true),
      where("status", "==", "1"),
      limit(5)
    );
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
  if (posts.length <= 0) return null;
  const [first, ...other] = posts;

  return (
    <div className="mb-5">
      <h3 className="text-3xl text-white font-semibold mb-5">Featured</h3>
      <PostFeaturedLagre post={first}></PostFeaturedLagre>
      <div className="grid lg:grid-cols-4 lg:gap-5 max-lg:grid-flow-col max-lg:auto-cols-[215px] gap-5 max-lg:overflow-x-auto scroll-hidden ">
        {posts.length > 0 &&
          other.map((post) => <PostItem key={post.id} post={post}></PostItem>)}
      </div>
    </div>
  );
};

export default PostFeatured;
