import { Link } from "react-router-dom";
import React from "react";
import * as sanitizeHtml from "sanitize-html";

/* eslint-disable react/prop-types */
const PostItem = ({ post }) => {
  const cleanHtml = sanitizeHtml(post?.content, {
    allowedTags: [],
  });
  return (
    <div className="product-item bg-white rounded-md overflow-hidden relative">
      <Link
        to={`/post/${post?.slug}`}
        className="h-[133px] lg:h-[200px] border border-dark3  block overflow-hidden group relative"
      >
        <img
          src={post?.image}
          alt="product"
          className="w-full  h-full object-cover"
        />
      </Link>
      <div className="flex flex-col gap-2 mt-2 p-3">
        <Link to={`/post/${post?.slug}`} className="text-xl font-semibold ">
          {post?.title}
        </Link>
        <div className="flex gap-x-2 items-center text-xs absolute top-0 pt-2 text-white">
          <a
            href={`/category/${post?.category}`}
            className="font-medium  border border-white rounded-md px-2 py-1 "
          >
            {post?.category}
          </a>
          <a href="" className="border border-white rounded-md px-2 py-1">
            {post?.author}
          </a>
          <span className="border border-white rounded-md px-2 py-1">
            {new Date(post?.createdAt?.seconds * 1000).toLocaleDateString()}
          </span>
        </div>
        <p className="line-clamp-3">{cleanHtml}</p>
      </div>
    </div>
  );
};

export default PostItem;
