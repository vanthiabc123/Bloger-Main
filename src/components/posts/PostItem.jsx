/* eslint-disable react/prop-types */
const PostItem = ({ post }) => {
  console.log(post);
  return (
    <div className="product-item bg-white rounded-md overflow-hidden">
      <a
        href="https://puce-determined-raven.cyclic.app/"
        target="_blank"
        rel="noreferrer"
        className="h-[133px] lg:h-[200px] border border-dark3  block overflow-hidden group relative"
      >
        <img
          src={post?.image}
          alt="product"
          className="w-full  h-96 object-cover"
        />
      </a>
      <div className="flex flex-col gap-2 mt-2 p-3">
        <a
          href="#"
          target="_blank"
          rel="noreferrer"
          className="text-xl font-semibold "
        >
          {post?.title}
        </a>
        <p className="line-clamp-3">{post?.content}</p>
      </div>
    </div>
  );
};

export default PostItem;
