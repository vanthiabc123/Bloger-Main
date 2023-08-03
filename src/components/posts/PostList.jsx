import PostItem from "./PostItem";
import { db } from "../../firebase/firebaseConfig";
import {
  collection,
  onSnapshot,
  query,
  where,
  limit,
  startAfter,
  orderBy,
} from "firebase/firestore";
import { useEffect, useState } from "react";

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  useEffect(() => {
    const colRef = collection(db, "posts");
    const queries = query(
      colRef,
      where("featured", "==", false),
      where("status", "==", "1"),
      orderBy("createdAt", "desc"),
      limit(3)
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

  const nextPage = async () => {
    const colRef = collection(db, "posts");
    const queries = query(
      colRef,
      where("featured", "==", false),
      where("status", "==", "1"),
      orderBy("createdAt", "desc"),
      limit(2),
      startAfter(posts[posts.length - 1].createdAt)
    );
    onSnapshot(queries, (snapshot) => {
      const results = [];
      snapshot.forEach((doc) => {
        results.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setPosts([...posts, ...results]);
    });
    setPosts([...posts, ...results]);
    setPage(page + 1);
  };

  if (posts.length <= 0) return null;

  return (
    <div className="mb-5">
      <h3 className="text-2xl font-semibold mb-5 text-white">Latest Posts</h3>
      <div className="grid lg:grid-cols-4 lg:gap-5 max-lg:grid-flow-col max-lg:auto-cols-[215px] gap-5 max-lg:overflow-x-auto scroll-hidden ">
        {posts.length > 0 &&
          posts.map((post) => <PostItem key={post.id} post={post}></PostItem>)}
      </div>
      {/* loadmore */}
      <div className="flex justify-center mt-5">
        <button
          onClick={nextPage}
          className="bg-white text-black px-5 py-2 rounded-md mb-5"
        >
          Load More
        </button>
      </div>
    </div>
  );
};

export default PostList;
