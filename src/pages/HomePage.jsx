import Banner from "../components/banner/Banner";
import PostFeatured from "../components/posts/PostFeatured";
import PostList from "../components/posts/PostList";

const HomePage = () => {
  return (
    <div>
      <Banner></Banner>
      <div className="page-container">
        <PostFeatured></PostFeatured>
        <PostList></PostList>
      </div>
    </div>
  );
};

export default HomePage;
