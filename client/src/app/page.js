import Footer from './components/Footer';
import CategorySection from './components/pages/Home/CategorySection';
import HeroSlider from './components/pages/Home/HeroSlider';
import SectionTwo from './components/pages/Home/SectionTwo';
import SocialMediaBar from './components/pages/Home/SocialMediaBar';

export default function Home() {
  return (
    <div className="overflow-hidden bg-black">
      <HeroSlider />
      <SocialMediaBar />
      < SectionTwo/>
      <CategorySection/>
      <Footer/>
    </div>
  );
}
