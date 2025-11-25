/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import Image from "next/image";
import { Image as PictureImg, SendHorizontal } from "lucide-react";
import postImg from "@/assets/images/post_img.png";
import { getTimeAgo } from "@/lib/getTimeAgo";
import {
  EllipsisVertical,
  MessageCircleMore,
  Mic,
  Share2,
  ThumbsUp,
} from "lucide-react";
import { useState, useEffect } from "react";
import axios from "axios";

const likeShareComments = [
  { id: 1, title: "Like", icon: <ThumbsUp /> },
  { id: 2, title: "Comment", icon: <MessageCircleMore /> },
  { id: 3, title: "Share", icon: <Share2 /> },
];

interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
}

interface Reply {
  _id: string;
  text: string;
  user: User;
  createdAt: string;
}

interface Comment {
  _id: string;
  text: string;
  user: User;
  replies: Reply[];
  likes: {
    totalCounts: number;
    likeInfo: Array<{ email: string; isLike: boolean }>;
  };
  createdAt: string;
}

interface Post {
  _id: string;
  text: string;
  image: string;
  isPublic: boolean;
  user: User;
  postTime: string;
  comments: Comment[];
  likes: {
    totalCounts: number;
    likeInfo: Array<{ email: string; isLike: boolean }>;
  };
}

export default function UserPost() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [isReplyOpen, setIsReplyOpen] = useState<{ [key: string]: boolean }>(
    {}
  );
  const [visibleCommentSend, setVisibleCommentSend] = useState<{
    [key: string]: string;
  }>({});
  const [visibleRepliesSend, setVisibleRepliesSend] = useState<{
    [key: string]: string;
  }>({});
  const [userEmail, setUserEmail] = useState<string>("");

  const rawToken =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const token = rawToken ? JSON.parse(rawToken) : null;

  useEffect(() => {
    if (token) {
      try {
        const payload = token.split(".")[1];
        const decodedPayload = JSON.parse(atob(payload));
        setUserEmail(decodedPayload.email);
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  }, [token]);

  // Fetch posts from backend
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/v1/post", {
          headers: {
            Authorization: token,
          },
        });
        setPosts(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching posts:", error);
        setLoading(false);
      }
    };

    fetchPosts();
  }, [token]);

  // Toggle reply input for specific comment
  const toggleReply = (commentId: string) => {
    setIsReplyOpen((prev) => ({ ...prev, [commentId]: !prev[commentId] }));
  };

  // Handle comment input change
  const handleCommentChange = (postId: string, value: string) => {
    setVisibleCommentSend((prev) => ({ ...prev, [postId]: value }));
  };

  // Handle reply input change
  const handleReplyChange = (commentId: string, value: string) => {
    setVisibleRepliesSend((prev) => ({ ...prev, [commentId]: value }));
  };

  // Check if user has liked the post
  const isPostLikedByUser = (post: Post): boolean => {
    if (!userEmail || !post.likes?.likeInfo) return false;

    const userLike = post.likes.likeInfo.find(
      (like) => like.email === userEmail
    );

    return userLike ? userLike.isLike : false;
  };

  // Check if user has liked the comment
  const isCommentLikedByUser = (comment: Comment): boolean => {
    if (!userEmail || !comment.likes?.likeInfo) return false;

    const userLike = comment.likes.likeInfo.find(
      (like) => like.email === userEmail
    );

    return userLike ? userLike.isLike : false;
  };

  // Post like handler
  const handlePostLike = async (id: string) => {
    try {
      const response = await axios.patch(
        `http://localhost:5000/api/v1/post/like/${id}`,
        {},
        {
          headers: {
            Authorization: token,
          },
        }
      );
      console.log(response.data);

      window.location.reload();
    } catch (error) {
      console.error("Error liking posts:", error);
    }
  };

  // Comment submit handler
  const handleCommentSubmit = async (postId: string) => {
    const commentText = visibleCommentSend[postId];

    if (!commentText || commentText.trim() === "") {
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:5000/api/v1/post/comment/${postId}`,
        { text: commentText },
        {
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Comment created:", response.data);

      window.location.reload();
    } catch (error) {
      console.error("Error submitting comment:", error);
    }
  };

  // Reply submit handler
  const handleReplySubmit = async (postId: string, commentId: string) => {
    const replyText = visibleRepliesSend[commentId];

    if (!replyText || replyText.trim() === "") {
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:5000/api/v1/post/${postId}/comment/${commentId}/reply`,
        { text: replyText },
        {
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Reply created:", response.data);

      window.location.reload();
    } catch (error) {
      console.error("Error submitting reply:", error);
    }
  };

  // Comment like handler
  const handleCommentLike = async (postId: string, commentId: string) => {
    try {
      const response = await axios.patch(
        `http://localhost:5000/api/v1/post/${postId}/comment/${commentId}/like`,
        {},
        {
          headers: {
            Authorization: token,
          },
        }
      );

      console.log("Comment liked:", response.data);

      window.location.reload();
    } catch (error) {
      console.error("Error liking comment:", error);
    }
  };

  if (loading) {
    return <div className="text-center py-10">Loading posts...</div>;
  }

  return (
    <section>
      <div className="grid grid-cols-1 gap-6">
        {posts?.map((post) => (
          <div key={post._id} className="bg-white py-6 rounded-lg">
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
              {post.image && (
                <Image
                  src={post.image}
                  alt="post_img"
                  width={500}
                  height={500}
                  className="w-full h-auto rounded-lg"
                />
              )}
              {/* like + comment count */}
              <p className="flex justify-end gap-4 text-base text-gray-500">
                <span>{post.likes?.totalCounts || 0} Like</span>
                <span>{post.comments?.length || 0} Comments</span>
              </p>
            </div>

            {/* Like + Comment + Share */}
            <div className="mt-12 flex items-center justify-between bg-[#f9fafbd4] p-2">
              {likeShareComments.map((lsc) => {
                const isLiked = lsc.id === 1 ? isPostLikedByUser(post) : false;

                return (
                  <button
                    onClick={() => lsc.id === 1 && handlePostLike(post._id)}
                    key={lsc.id}
                    className={`w-full py-3 hover:bg-blue-50 cursor-pointer flex items-center gap-2 justify-center text-lg font-light transition-all duration-300 ${
                      isLiked ? "text-blue-500" : ""
                    }`}
                  >
                    <span>{lsc.icon}</span>
                    <span>{lsc.title}</span>
                  </button>
                );
              })}
            </div>

            {/* comment box */}
            <div className="mt-10 px-8 relative">
              <input
                type="text"
                value={visibleCommentSend[post._id] || ""}
                onChange={(e) => handleCommentChange(post._id, e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleCommentSubmit(post._id);
                  }
                }}
                placeholder="Write a comment..."
                className="bg-gray-100 py-4 px-6 w-full rounded-3xl border-none focus:outline-none placeholder:font-medium"
              />
              <span className="absolute right-12 top-5 flex items-center gap-2">
                {!visibleCommentSend[post._id] ||
                visibleCommentSend[post._id].length === 0 ? (
                  <>
                    <Mic size={18} className="text-gray-500" />
                    <PictureImg size={18} className="text-gray-500" />
                  </>
                ) : (
                  <SendHorizontal
                    size={18}
                    className="text-blue-400 cursor-pointer"
                    onClick={() => handleCommentSubmit(post._id)}
                  />
                )}
              </span>
            </div>

            {/* comments section */}
            <div className="px-8">
              {post.comments && post.comments.length > 0 && (
                <div className="mt-14 space-y-6">
                  {post.comments.map((c) => {
                    const isCommentLiked = isCommentLikedByUser(c);

                    return (
                      <div key={c._id} className="flex items-start gap-5">
                        <Image
                          src={postImg}
                          alt="post_img"
                          className="w-auto h-auto"
                        />
                        <div className="flex-1 w-full">
                          <p className="flex flex-col gap-2 bg-gray-100 px-3 py-4 rounded-2xl">
                            <span className="font-medium">
                              {c.user.firstName} {c.user.lastName}
                            </span>
                            <span className="text-gray-500">{c.text}</span>
                          </p>

                          {/* like+comment+share button */}
                          <p className="mt-2.5 ml-4">
                            <span
                              onClick={() => handleCommentLike(post._id, c._id)}
                              className={`cursor-pointer ${
                                isCommentLiked
                                  ? "text-blue-500 font-semibold"
                                  : ""
                              }`}
                            >
                              Like
                            </span>
                            <span> . </span>
                            <span
                              onClick={() => toggleReply(c._id)}
                              className="cursor-pointer"
                            >
                              Reply
                            </span>
                            <span> . </span>
                            <span className="cursor-pointer">Share</span>
                            <span> . </span>
                            <span className="text-gray-500">
                              {getTimeAgo(c.createdAt)}
                            </span>
                          </p>

                          {/* replies comment box */}
                          {isReplyOpen[c._id] && (
                            <div className="mt-6 relative">
                              <input
                                type="text"
                                value={visibleRepliesSend[c._id] || ""}
                                onChange={(e) =>
                                  handleReplyChange(c._id, e.target.value)
                                }
                                onKeyDown={(e) => {
                                  if (e.key === "Enter") {
                                    handleReplySubmit(post._id, c._id);
                                  }
                                }}
                                placeholder="Write a reply..."
                                className="bg-gray-100 py-4 px-4 w-full rounded-3xl border-none focus:outline-none placeholder:font-medium"
                              />
                              <span className="absolute right-4 top-5 flex items-center gap-2">
                                {!visibleRepliesSend[c._id] ||
                                visibleRepliesSend[c._id].length === 0 ? (
                                  <>
                                    <Mic size={18} className="text-gray-500" />
                                    <PictureImg
                                      size={18}
                                      className="text-gray-500"
                                    />
                                  </>
                                ) : (
                                  <SendHorizontal
                                    size={18}
                                    className="text-blue-400 cursor-pointer"
                                    onClick={() =>
                                      handleReplySubmit(post._id, c._id)
                                    }
                                  />
                                )}
                              </span>
                            </div>
                          )}

                          {/* replies */}
                          {c.replies && c.replies.length > 0 && (
                            <div className="mt-5 space-y-3">
                              {c.replies.map((r) => (
                                <div
                                  key={r._id}
                                  className="flex items-start gap-2"
                                >
                                  <Image
                                    src={postImg}
                                    alt="post_img"
                                    className="w-10 h-auto"
                                  />
                                  <p className="flex flex-col gap-2 bg-gray-100 px-3 py-2.5 rounded-2xl flex-1">
                                    <span className="font-medium">
                                      {r.user.firstName} {r.user.lastName}
                                    </span>
                                    <span className="text-gray-500">
                                      {r.text}
                                    </span>
                                  </p>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
