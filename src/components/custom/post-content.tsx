"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */

import Image from "next/image";
import userImg from "@/assets/images/mini_pic.png";
import {
  CalendarDays,
  NotepadText,
  Image as PhotoImage,
  Send,
  Video,
  X,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import axios from "axios";

interface IFormInput {
  text: string;
  image?: FileList;
}

const postMenu = [
  { id: 1, title: "Photo", icon: <PhotoImage />, type: "photo" },
  { id: 2, title: "Video", icon: <Video />, type: "video" },
  { id: 3, title: "Event", icon: <CalendarDays />, type: "event" },
  { id: 4, title: "Article", icon: <NotepadText />, type: "article" },
];

export default function PostContent() {
  const { register, handleSubmit, setValue } = useForm<IFormInput>();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const rawToken =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const token = rawToken ? JSON.parse(rawToken) : null;

  // Handle image selection
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Remove selected image
  const removeImage = () => {
    setSelectedImage(null);
    setImageFile(null);
    setValue("image", undefined);
  };

  const onSubmit = async (data: IFormInput) => {
    const formData = new FormData();
    formData.append("text", data.text);

    if (imageFile) {
      formData.append("image", imageFile);
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/post/create",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: token,
          },
        }
      );

      console.log("Post created successfully:", response.data);
      window.location.reload();
    } catch (error: any) {
      console.error("Error submitting post:", error);
      console.error("Error response:", error.response?.data);
    }
  };
  return (
    <section className="bg-white py-6 px-4 mb-6 rounded-lg">
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* user image + input */}
        <div className="flex items-start gap-4">
          <Image src={userImg} alt="user" className="w-10 h-auto" />

          <textarea
            {...register("text", { required: true })}
            placeholder="Write Something..."
            rows={5}
            className="flex-1 focus:outline-none focus:placeholder-transparent p-2 rounded resize-none mb-4 scrollbar-hide"
          ></textarea>
        </div>

        {/* Image preview */}
        {selectedImage && (
          <div className="relative mb-4 ">
            <div className="relative inline-block">
              <img
                src={selectedImage}
                alt="Preview"
                className="max-h-20 rounded-lg"
              />
              <button
                type="button"
                onClick={removeImage}
                className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition"
              >
                <X size={16} />
              </button>
            </div>
          </div>
        )}

        {/* image + post submit section */}
        <div className="flex items-center justify-between bg-blue-50 rounded-lg px-4 py-2">
          <div className="flex items-center gap-6">
            {postMenu.map((post) => (
              <div key={post.id}>
                {post.type === "photo" ? (
                  <label
                    htmlFor="imageInput"
                    className="flex items-center gap-2 text-gray-600 cursor-pointer hover:text-blue-400 transition-all duration-200 text-lg"
                  >
                    <span>{post.icon}</span>
                    <span>{post.title}</span>
                    <input
                      id="imageInput"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageChange}
                    />
                  </label>
                ) : (
                  <div className="flex items-center gap-2 text-gray-600 cursor-pointer hover:text-blue-400 transition-all duration-200 text-lg">
                    <span>{post.icon}</span>
                    <span>{post.title}</span>
                  </div>
                )}
              </div>
            ))}
          </div>

          <button
            type="submit"
            className="bg-blue-400 text-white py-3 px-6 text-lg font-medium flex items-center gap-2 rounded-lg cursor-pointer hover:bg-blue-500 transition"
          >
            <Send />
            Post
          </button>
        </div>
      </form>
    </section>
  );
}
