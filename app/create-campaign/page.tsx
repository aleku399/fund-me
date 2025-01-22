import CreateCampaign from "@/components/CreateCampaign";
import Footer from "@/components/Footer";
import Navbar from "@/components/NavBar";

export default function CreateCampaignPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow">
        <CreateCampaign />
      </div>
      <Footer />
    </div>
  );
}
