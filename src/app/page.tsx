import Navbar from "@/components/feed/navbar/navbar";
import LayoutFeed from "@/components/layout/layout-feed";

export default function Home() {
  return (
    <section className="min-h-screen overflow-hidden">
      <Navbar />

      {/* Layout Feed */}
      <div className="bg-gray-100 px-6 py-6">
        <LayoutFeed />
      </div>
    </section>
  );
}
