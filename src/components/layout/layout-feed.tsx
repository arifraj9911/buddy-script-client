"use client"

import { useAuth } from "@/hooks/useAuth";
import ContentStory from "../custom/content-story";
import MiddleContent from "../feed/middle-content/middle-content";

export default function LayoutFeed() {
  useAuth(true);
  return (
    <main className="max-w-7xl mx-auto h-screen grid grid-cols-[300px_1fr_300px] gap-6 overflow-hidden ">
      {/* left sidebar */}
      <aside className=" bg-white rounded-lg overflow-y-auto scrollbar-hide">
        <div className="py-6 px-4 ">Left Content</div>
        {[...Array(40)].map((_, i) => (
          <div key={i} className="p-3 mb-2 bg-green-50 rounded">
            Right Widget {i + 1}
          </div>
        ))}
      </aside>

      {/* middle content */}
      <section className="overflow-y-auto scrollbar-hide">
        <ContentStory />
        <div className="min-h-screen">
          <MiddleContent />
        </div>
      </section>

      {/* Right Sidebar */}
      <aside className=" bg-white rounded-lg  overflow-y-auto  scrollbar-hide">
        {" "}
        <div className="py-6 px-4 ">Right Content</div>
        {[...Array(40)].map((_, i) => (
          <div key={i} className="p-3 mb-2 bg-green-50 rounded">
            Right Widget {i + 1}
          </div>
        ))}
      </aside>
    </main>
  );
}
