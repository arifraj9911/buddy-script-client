import PostContent from "@/components/custom/post-content";
import UserPost from "@/components/custom/user-post";

export default function MiddleContent() {
  return (
    <section>
      {/* Post Content */}
      <PostContent />
      <UserPost />
    </section>
  );
}
