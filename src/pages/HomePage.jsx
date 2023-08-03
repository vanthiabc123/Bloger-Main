import Banner from "../components/banner/Banner";
import PostFeatured from "../components/posts/PostFeatured";
import PostList from "../components/posts/PostList";
import Footer from "../components/posts/footer";

const HomePage = () => {
  return (
    <div>
      <Banner></Banner>
      <div className="page-container">
        <PostFeatured></PostFeatured>
        <PostList></PostList>
        <Footer></Footer>
      </div>
    </div>
  );
};

export default HomePage;
