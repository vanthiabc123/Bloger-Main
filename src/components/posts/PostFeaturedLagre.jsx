import React from "react";
import { Link } from "react-router-dom";
import * as sanitizeHtml from "sanitize-html";
const PostFeaturedLagre = (props) => {
  const cleanHtml = sanitizeHtml(props?.post?.content, {
    allowedTags: [],
  });

  return (
    <div className="flex relative bg-white shadow-md overflow-hidden rounded-md  gap-x-5 mb-5 flex-col md:flex-row">
      <img
        className="h-[433px] w-[50%] object-cover"
        src={props?.post?.image}
        alt=""
      />
      <div className="p-5">
        <Link
          to={`/post/${props?.post?.slug}`}
          className="text-2xl font-semibold text-black"
        >
          {props?.post.title}
        </Link>
        <p className="text-black line-clamp-4">{cleanHtml}</p>
        {/* category */}
        <div className="flex gap-x-2 mt-2 absolute left-0 top-0 text-white p-2">
          <a
            href={`/category/${props?.post?.category}`}
            className="px-2 py-1 rounded-md border boder-white  left-0"
          >
            {props?.post?.category}
          </a>
          <span className="px-2 py-1 rounded-md border boder-white  left-0">
            {new Date(
              props?.post?.createdAt?.seconds * 1000
            ).toLocaleDateString()}
          </span>
          <span className="px-2 py-1 rounded-md border boder-black  left-0">
            {props?.post?.author}
          </span>
        </div>
      </div>
    </div>
  );
};

export default PostFeaturedLagre;
