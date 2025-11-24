import postImg from "@/assets/images/timeline_img.png"

interface UserType {
  firstName: string;
  lastName: string;
  email: string;
}

interface PostType {
  id: number;
  text: string;
  image: string;
  postTime: string;
  isPublic: boolean;
  user: UserType;
}


export const postData: PostType[] = [
  {
    id: 1,
    text: "Exploring the new city today!",
    image: postImg.src,
    postTime: "2025-01-10 14:32",
    isPublic: true,
    user: {
      firstName: "Arif",
      lastName: "Hossain",
      email: "arif@mail.com",
    },
  },
  {
    id: 2,
    text: "Coffee break ☕",
    image: postImg.src,
    postTime: "2025-01-11 09:15",
    isPublic: false,
    user: {
      firstName: "Mira",
      lastName: "Das",
      email: "mira@outlook.com",
    },
  },
  {
    id: 3,
    text: "Nature always heals 🌿",
    image: postImg.src,
    postTime: "2025-01-12 17:45",
    isPublic: true,
    user: {
      firstName: "Siam",
      lastName: "Ahmed",
      email: "siam@gmail.com",
    },
  },
  {
    id: 4,
    text: "Working hard or hardly working? 😄",
    image: postImg.src,
    postTime: "2025-01-13 11:22",
    isPublic: true,
    user: {
      firstName: "Nishat",
      lastName: "Khan",
      email: "nishat@domain.com",
    },
  },
  {
    id: 5,
    text: "My new painting 🎨",
    image: postImg.src,
    postTime: "2025-01-14 16:40",
    isPublic: false,
    user: {
      firstName: "Kabir",
      lastName: "Rahman",
      email: "kabir@mail.com",
    },
  },
  {
    id: 6,
    text: "Evening walk by the lake ✨",
    image: postImg.src,
    postTime: "2025-01-15 19:05",
    isPublic: true,
    user: {
      firstName: "Rana",
      lastName: "Sultana",
      email: "rana@gmail.com",
    },
  },
  {
    id: 7,
    text: "Trying out a new recipe today 🍝",
    image: postImg.src,
    postTime: "2025-01-16 13:50",
    isPublic: false,
    user: {
      firstName: "Lamia",
      lastName: "Noor",
      email: "lamia@domain.com",
    },
  },
  {
    id: 8,
    text: "Reading a new book 📚",
    image: postImg.src,
    postTime: "2025-01-17 08:20",
    isPublic: true,
    user: {
      firstName: "Tanvir",
      lastName: "Hasan",
      email: "tanvir@mail.com",
    },
  },
  {
    id: 9,
    text: "Sunset vibes 🌅",
    image: postImg.src,
    postTime: "2025-01-17 18:55",
    isPublic: true,
    user: {
      firstName: "Rifat",
      lastName: "Mahmud",
      email: "rifat@gmail.com",
    },
  },
  {
    id: 10,
    text: "Just finished a workout session 💪",
    image: postImg.src,
    postTime: "2025-01-18 07:40",
    isPublic: false,
    user: {
      firstName: "Farhan",
      lastName: "Kamal",
      email: "farhan@outlook.com",
    },
  },
];
