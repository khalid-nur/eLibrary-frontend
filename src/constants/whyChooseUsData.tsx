import { LuBookCopy, LuScrollText, LuMessageSquareText } from "react-icons/lu";
import { PiBooks } from "react-icons/pi";

export const features = [
  {
    title: "Book Checkout",
    description:
      "Checking out books is quick and simple. Whether you’re after a thrilling mystery or a heartwarming novel, you can easily find and borrow your next read.",
    icon: <LuBookCopy className="w-6 h-6 lg:w-8 lg:h-8 text-[#31A0FE]" />,
    bgColor: "bg-[#D4EAF6]",
  },
  {
    title: "Personal Shelf",
    description:
      "Keep track of all the books you’ve checked out with your own personal shelf. It’s your little space to see what you’ve been reading.",
    icon: <PiBooks className="w-6 h-6 lg:w-8 lg:h-8 text-[#23856D]" />,
    bgColor: "bg-[#D6F1CC]",
  },
  {
    title: "Checkout History",
    description:
      "Look back at everything you’ve checked out. Perfect for remembering books you loved or re-reading an old favorite.",
    icon: <LuScrollText className="w-6 h-6 lg:w-8 lg:h-8 text-[#EC5C2E]" />,
    bgColor: "bg-[#F3DCD5]",
  },
  {
    title: "Message Us",
    description:
      "We’re just a message away. Need recommendations or want to request a book? We’re here to help and make your experience easier.",
    icon: (
      <LuMessageSquareText className="w-6 h-6 lg:w-8 lg:h-8 text-[#a12f99]" />
    ),
    bgColor: "bg-[#d5a3d2]",
  },
];
