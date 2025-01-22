import { CampaignDetail } from "@/components/CampaignDetail";
import Footer from "@/components/Footer";
import Navbar from "@/components/NavBar";

export default function CampaignPage() {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex-grow">
          <CampaignDetail />
        </div>
        <Footer />
      </div>
    </>
  );
}
