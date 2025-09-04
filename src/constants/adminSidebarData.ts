import { FiUsers, FiBookOpen } from "react-icons/fi";
import { LuBookMarked } from "react-icons/lu";
import { TbMessage } from "react-icons/tb";
import { BsHouseDoor } from "react-icons/bs";
import { IconType } from "react-icons";

interface SidebarItem {
  title: string;
  icon: IconType;
  link: string;
}

export const adminSidebarData: SidebarItem[] = [
  {
    title: "Dashboard",
    icon: BsHouseDoor,
    link: "/admin/dashboard/home",
  },
  {
    title: "All Users",
    icon: FiUsers,
    link: "/admin/dashboard/users",
  },
  {
    title: "All Books",
    icon: FiBookOpen,
    link: "/admin/dashboard/books",
  },
  {
    title: "Checkouts",
    icon: LuBookMarked,
    link: "/admin/dashboard/checkouts",
  },
  {
    title: "Messages",
    icon: TbMessage,
    link: "/admin/dashboard/messages",
  },
];
