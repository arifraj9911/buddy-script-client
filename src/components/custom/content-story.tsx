import storyImg1 from "@/assets/images/card_ppl1.png";
import storyImg2 from "@/assets/images/card_ppl2.png";
import storyImg3 from "@/assets/images/card_ppl3.png";
import storyImg4 from "@/assets/images//card_ppl4.png";
import storyUserImg from "@/assets/images/mini_pic.png";
import Image from "next/image";

const stories = [
  { id: 1, title: "Your Story", image: storyImg1, user: storyUserImg },
  { id: 2, title: "Ryan Roslansky", image: storyImg2, user: storyUserImg },
  { id: 3, title: "Arif Hossain", image: storyImg3, user: storyUserImg },
  { id: 4, title: "Mr Khan", image: storyImg4, user: storyUserImg },
];

export default function ContentStory() {
  return (
    <section className="grid grid-cols-4 gap-6 w-full mb-6">
      {stories?.map((story) => (
        <div key={story.id} className="relative text-center">
          <div className="bg-black/50 inset-0 absolute rounded-lg hover:bg-black/60 transition-all duration-200 cursor-pointer" ></div>
          <Image
            src={story.image}
            alt={story.title}
            className="w-full h-auto rounded-lg"
          />
          <span className="absolute bottom-4 text-sm text-white w-full left-0 font-medium">{story.title}</span>

          <Image src={story.user}
            alt={story.title}
            className="w-8 h-auto rounded-full absolute top-4 right-4 border-3 border-white "/>
        </div>
      ))}
    </section>
  );
}
