import { CampaignDetail } from "@/components/CampaignDetail";
import Footer from "@/components/Footer";
import Navbar from "@/components/NavBar";

export async function generateStaticParams() {
  try {
    const loginResponse = await fetch("https://hagfish-vocal-scarcely.ngrok-free.app/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: "abc@gmail.com",
        pass_word: "123456789@Dev",
      }),
    });

    const loginData = await loginResponse.json();

    if (!loginData.user_access_token) {
      throw new Error("Failed to obtain token");
    }

    const token = loginData.user_access_token;

    const campaignsResponse = await fetch("https://hagfish-vocal-scarcely.ngrok-free.app/api/jebafundme", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const campaignsData = await campaignsResponse.json();

    return campaignsData.fundme_campaigns.map((campaign: { id: string }) => ({
      id: campaign.id,
    }));
  } catch (error) {
    console.error("Error in generateStaticParams:", error);
    return [];
  }
}

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
