import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebase/firebaseConfig";
import { query, where, onSnapshot, collection } from "firebase/firestore";
import { useState } from "react";
import PostItem from "../components/posts/PostItem";

const CategoryPage = () => {
  const { slug } = useParams();
  const [posts, setPosts] = useState([]);
  console.log(posts);
  useEffect(() => {
    const colRef = collection(db, "posts");
    const q = query(colRef, where("category", "==", slug));
    onSnapshot(q, (querySnapshot) => {
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPosts(data);
    });
  }, [slug]);
  return (
    <div className="page-container h-screen">
      <h1 className="text-4xl text-white font-medium mb-5">Danh Mục: {slug}</h1>
      <div className="grid lg:grid-cols-4 lg:gap-5 max-lg:grid-flow-col max-lg:auto-cols-[215px] gap-5 max-lg:overflow-x-auto scroll-hidden ">
        {posts.map((post) => (
          <PostItem key={post.id} post={post}></PostItem>
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;
