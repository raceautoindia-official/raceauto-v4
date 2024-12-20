
import HomeBanner from "@/components/Homebanner/HomeBanner";
import MagazineAd from "@/components/MagazineAd/MagazineAd";
import MainComponent from "@/components/HomeCategories/MainComponent";
import Sidebar from "@/components/Sidebar/Sidebar";
import BreakingNews from "@/components/BreakingNews/BreakingNews";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import HeaderAd from "@/components/HeaderAd/HeaderAd";
import GreenBar from "@/components/GreenBar/MagazineBar";


export default function Home() {
  return (
    <>
      <div>
        <BreakingNews />
        <Navbar />
        <div className="main_content__position">
          <div className="container">
            <HeaderAd />
            <HomeBanner />
            <MagazineAd />
            <div className="row mt-4">
              <div className="col-lg-8">
                <MainComponent />
              </div>
              <Sidebar />
            </div>
          </div>
        </div>
        <Footer />
        <GreenBar />
      </div>
    </>
  );
}
