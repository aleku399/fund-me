import Dashboard from "@/components/Campaigns";
import Footer from "@/components/Footer";
import Navbar from "@/components/NavBar";

export default function DashboardPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow">
        <Dashboard />
      </div>
      <Footer />
    </div>
  );
}
