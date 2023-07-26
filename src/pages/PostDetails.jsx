import React from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebase/firebaseConfig";
import { doc, query, where, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";

const PostDetails = () => {
  const { slug } = useParams();
  const [post, setPost] = useState({});

  useEffect(() => {
    const getData = async () => {
      const colRef = query(db, "posts", where("slug", "==", slug));
      onSnapshot(colRef, (snapshot) => {
        const results = [];
        snapshot.forEach((doc) => {
          results.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        setPost(results[0]);
      });
    };
    getData();
  }, [slug]);

  return (
    <div className="page-container">
      <div className="flex items-center gap-x-5 h-screen">
        <img
          src={post?.image}
          alt=""
          className="max-w-[600px] w-full object-cover h-[400px] rounded-md"
        />
        <div className="flex flex-col gap-x-5">
          <h3 className="text-2xl font-semibold">{post?.title}</h3>
          <div className="flex gap-x-2">
            <span>Category : {post?.category}</span>
            <span>1/2/2020</span>
            <span>Author</span>
          </div>
        </div>
      </div>
      <div className="mt-5 max-w-[960px] mx-auto">
        <p>
          {" "}
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Excepturi,
          nemo at! Officia blanditiis delectus recusandae suscipit dolores
          sapiente excepturi ad, eaque animi ab, soluta aliquam. Doloribus fugit
          a et dolores aut quaerat itaque! Impedit totam assumenda, nesciunt
          dolorum quas ullam a, dicta nisi quam consectetur sequi suscipit
          debitis quibusdam cum at praesentium alias? Quos a totam earum
          architecto unde ipsa animi expedita iure facere. Tenetur perspiciatis,
          dolor quisquam possimus voluptate consequuntur expedita mollitia
          inventore laboriosam deserunt ipsa soluta, veniam dolore non odio
          quaerat error provident natus eaque illo nam adipisci. Mollitia,
          temporibus. Enim facilis itaque ducimus quae maiores beatae laborum!
        </p>
        <p>
          {" "}
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Excepturi,
          nemo at! Officia blanditiis delectus recusandae suscipit dolores
          sapiente excepturi ad, eaque animi ab, soluta aliquam. Doloribus fugit
          a et dolores aut quaerat itaque! Impedit totam assumenda, nesciunt
          dolorum quas ullam a, dicta nisi quam consectetur sequi suscipit
          debitis quibusdam cum at praesentium alias? Quos a totam earum
          architecto unde ipsa animi expedita iure facere. Tenetur perspiciatis,
          dolor quisquam possimus voluptate consequuntur expedita mollitia
          inventore laboriosam deserunt ipsa soluta, veniam dolore non odio
          quaerat error provident natus eaque illo nam adipisci. Mollitia,
          temporibus. Enim facilis itaque ducimus quae maiores beatae laborum!
        </p>
      </div>
    </div>
  );
};

export default PostDetails;
