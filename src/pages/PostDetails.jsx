import React from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebase/firebaseConfig";
import { query, where, onSnapshot, collection } from "firebase/firestore";
import { useEffect, useState } from "react";
import PostComment from "../components/comments/PostComment";
import { useAuth } from "../contexts/authContext";

const PostDetails = () => {
  const { slug } = useParams();
  const [post, setPost] = useState({});
  const { user } = useAuth();
  const renderHTML = (escapedHTML) =>
    React.createElement("div", {
      dangerouslySetInnerHTML: { __html: escapedHTML },
    });

  useEffect(() => {
    const getData = async () => {
      const q = query(collection(db, "posts"), where("slug", "==", slug));
      onSnapshot(q, (querySnapshot) => {
        querySnapshot.forEach((doc) => {
          console.log(doc.id, " => ", doc.data());
          setPost({
            id: doc.id,
            ...doc.data(),
          });
        });
      });
    };
    getData();
    console.log(post);
  }, [slug]);

  return (
    <div className="page-container">
      <div className="flex  gap-x-5 h-full flex-col md:flex-row md:h-screen md:items-center">
        <img
          src={post?.image}
          alt=""
          className="max-w-[600px] w-full object-cover h-[400px] rounded-md"
        />
        <div className="flex flex-col gap-x-5">
          <h3 className="text-2xl font-semibold">{post?.title}</h3>
          <div className="flex gap-x-2">
            <span>Category : {post?.category}</span>
            <span>
              {new Date(post?.createdAt?.seconds * 1000).toLocaleDateString()}
            </span>
            <span>{post?.author}</span>
          </div>
        </div>
      </div>
      <div className="mt-5 max-w-[960px] w-full mx-auto">
        <div className="text-lg">{renderHTML(post?.content)}</div>
      </div>
      <div className="mt-5 max-w-[960px] w-full mx-auto">
        <PostComment postId={post?.id} user={user}></PostComment>
      </div>
    </div>
  );
};

export default PostDetails;
