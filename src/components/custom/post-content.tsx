import Image from "next/image";
import userImg from "@/assets/images/mini_pic.png";
import {
  CalendarDays,
  NotepadText,
  Image as PhotoImage,
  Send,
  Video,
} from "lucide-react";

const postMenu = [
  { id: 1, title: "Photo", icon: <PhotoImage /> },
  { id: 2, title: "Video", icon: <Video /> },
  { id: 3, title: "Event", icon: <CalendarDays /> },
  { id: 4, title: "Article", icon: <NotepadText /> },
];

export default function PostContent() {
  return (
    <section className="bg-white py-6 px-4 mb-6 rounded-lg">
      {/* user image + input */}
      <div className="flex items-start gap-4">
        <Image src={userImg} alt="user" className="w-10 h-auto" />

        <textarea
          placeholder="Write Something..."
          rows={5}
          className=" flex-1 focus:outline-none focus:placeholder-transparent p-2 rounded resize-none mb-4 scrollbar-hide"
        ></textarea>
      </div>

      {/* image + post submit section */}
      <div className="flex items-center justify-between bg-blue-50 rounded-lg px-4 py-2">
        {postMenu.map((post) => (
          <div
            key={post.id}
            className="flex items-center gap-2 text-gray-600 cursor-pointer hover:text-blue-400 transition-all duration-200 text-lg"
          >
            <span className="">{post.icon}</span>
            <span>{post.title}</span>
          </div>
        ))}
        <button className="bg-blue-400 text-white py-3 px-6 text-lg font-medium flex items-center gap-2 rounded-lg cursor-pointer">
          <Send />
          Post
        </button>
      </div>
    </section>
  );
}
