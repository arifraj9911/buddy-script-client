import Image from "next/image";
import logo from "@/assets/images/logo.svg";
import {
  Bell,
  House,
  MessageCircleMore,
  Search,
  UsersRound,
} from "lucide-react";
import Link from "next/link";
import ProfileDropdown from "@/components/custom/profile-dropdown";

const navLink = [
  { id: 1, title: "Home", path: "/", icon: <House size={28} /> },
  { id: 2, title: "User", path: "/", icon: <UsersRound size={28} /> },
  { id: 3, title: "Notification", path: "/", icon: <Bell size={28} /> },
  { id: 4, title: "Message", path: "/", icon: <MessageCircleMore size={28} /> },
];

const navLinkCss = `h-full flex items-center gap-2  
          text-gray-600 transition-colors duration-300 hover:text-blue-600
          relative

          after:content-['']
          after:absolute
          after:left-0
          after:bottom-0
          after:w-full
          after:h-0.5
          after:bg-blue-600
          after:scale-x-0
          after:origin-left
          after:transition-transform
          after:duration-300
          hover:after:scale-x-100`;

export default function Navbar() {
  return (
    <nav className="sticky top-0 left-0 bg-white ">
      <div className=" max-w-7xl mx-auto flex items-center justify-between gap-16  h-24">
        {/* logo */}
        <Image src={logo} alt="logo" className="w-auto h-auto" />

        {/* search input */}
        <div className="relative flex-1">
          <Search className="absolute top-3 left-3 text-gray-400 " />
          <input
            type="text"
            className="py-3 px-12 bg-gray-100 border border-gray-100 transition-all duration-300 hover:border hover:border-blue-400 rounded-3xl focus:outline-none focus:border-blue-400 focus:placeholder-transparent focus:bg-white w-[95%]"
            placeholder="input search text"
          />
        </div>

        {/* nav item */}
        <ul className="flex items-center gap-14 h-full">
          {navLink?.map((link) => (
            <li key={link.id} className="h-full flex items-center">
              <Link href={link.path} className={navLinkCss}>
                {link.icon}
              </Link>
            </li>
          ))}
        </ul>

        {/* profile dropdown */}
        <ProfileDropdown />
      </div>
    </nav>
  );
}
