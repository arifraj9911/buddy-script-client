import { postData } from "@/data/post-data";
import Image from "next/image";
import { Image as PictureImg } from "lucide-react";
import postImg from "@/assets/images/post_img.png";
import { getTimeAgo } from "@/lib/getTimeAgo";
import {
  EllipsisVertical,
  MessageCircleMore,
  Mic,
  Share2,
  ThumbsUp,
} from "lucide-react";

const likeShareComments = [
  { id: 1, title: "Like", icon: <ThumbsUp /> },
  { id: 2, title: "Comment", icon: <MessageCircleMore /> },
  { id: 3, title: "Share", icon: <Share2 /> },
];

export default function UserPost() {
  return (
    <section>
      <div className="grid grid-cols-1 gap-6">
        {postData?.map((post) => (
          <div key={post.id} className="bg-white py-6  rounded-lg">
            {/* user */}
            <div className="flex justify-between items-center px-6">
              <div className="flex gap-4 items-start">
                <Image src={postImg} alt="post_img" className="w-auto h-auto" />
                <div className="space-y-1">
                  <p>
                    {post.user.firstName} {post.user.lastName}
                  </p>
                  <p className="text-gray-400">
                    <span>{getTimeAgo(post.postTime)} </span>
                    <span> . </span>
                    <span>{post.isPublic ? "Public" : "Private"}</span>
                  </p>
                </div>
              </div>

              <EllipsisVertical className="text-gray-400 cursor-pointer" />
            </div>

            {/* post */}
            <div className="mt-6 space-y-4 px-6">
              <p>{post.text}</p>
              <Image
                src={post.image}
                alt="post_img"
                width={500}
                height={500}
                className="w-full h-auto rounded-lg"
              />
            </div>

            {/* Like + Comment + Share */}
            <div className="mt-12 flex items-center justify-between bg-[#f9fafbd4] p-2 ">
              {likeShareComments.map((lsc) => (
                <button
                  key={lsc.id}
                  className="w-full py-3 hover:bg-blue-50 cursor-pointer flex items-center gap-2  justify-center text-lg font-light transition-all duration-300"
                >
                  <span>{lsc.icon}</span>
                  <span>{lsc.title}</span>
                </button>
              ))}
            </div>

            {/* comment box */}
            <div className="mt-10 px-8 relative">
              <input
                type="text"
                name=""
                id=""
                placeholder="Write a comment..."
                className="bg-gray-100 py-4 px-6 w-full rounded-3xl border-none focus:outline-none  placeholder:font-medium"
              />
              <span className="absolute right-12 top-5 flex items-center gap-2">
                <Mic size={18} className=" text-gray-500" />
                <PictureImg size={18} className=" text-gray-500" />
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
