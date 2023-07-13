import PostItem from "./PostItem";

const PostList = () => {
  return (
    <div className="mb-5">
      <h3 className="text-2xl font-semibold mb-5 text-white">Latest Posts</h3>
      <div className="grid lg:grid-cols-4 lg:gap-5 max-lg:grid-flow-col max-lg:auto-cols-[215px] gap-5 max-lg:overflow-x-auto scroll-hidden ">
        <PostItem></PostItem>
        <PostItem></PostItem>
        <PostItem></PostItem>
        <PostItem></PostItem>
      </div>
    </div>
  );
};

export default PostList;
