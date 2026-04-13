import Hero from "../components/Hero/Hero";
import VideoSection from "../components/VideoSection/VideoSection";
import HomeIntro from "../components/HomeIntro/HomeIntro";
import PortfolioPreview from "../components/PortfolioPreview/PortfolioPreview";
import ServicesSection from "../components/ServicesSection/ServicesSection";
import ValuesSection from "../components/ValuesSection/ValuesSection";
import ManifestoTicker from "../components/ManifestoTicker/ManifestoTicker";
import ConnectSection from "../components/ConnectSection/ConnectSection";
import Footer from "../components/Footer/Footer";

function Home() {
  return (
    <>
      <Hero />
      <VideoSection />
      <HomeIntro />
      <PortfolioPreview />
      <ServicesSection />
      <ValuesSection />
      < ManifestoTicker />
      < ConnectSection />
      < Footer />
      
    </>
  );
}

export default Home;
