import Layout from "../../components/layout/Layout";
import HeroSection from "../../components/heroSection/HeroSection";
import Category from "../../components/category/Category";
import HomePageProductCard from "../../components/homePageProductCard/HomePageProductCard";
import Footer from "../../components/footer/Footer";
import Track from "../../components/track/Track";
import Testimonial from "../../components/testimonial/Testimonial";

const HomePage = () => {
  return (
    <div className="home-page">
      <Layout>
        <HeroSection />
        <Category />

        <HomePageProductCard />

        <Track />
        <Testimonial />
        <Footer />
      </Layout>
    </div>
  );
};

export default HomePage;
