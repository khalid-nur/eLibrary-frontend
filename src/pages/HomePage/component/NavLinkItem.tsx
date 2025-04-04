import { NavLink } from "react-router-dom";

interface NavLinkItemProps {
  to: string;
  text: string;
  mobile: boolean;
  closeAll?: () => void;
}

const NavLinkItem = ({ to, text, mobile, closeAll }: NavLinkItemProps) => {
  return (
    <NavLink
      to={to}
      onClick={closeAll}
      className={({ isActive }) =>
        `${
          mobile
            ? "text-base font-medium"
            : "text-base py-1 px-2 xl:px-3 font-semibold"
        }  ${
          isActive ? "text-orange-500" : "text-gray-600 hover:text-orange-500"
        }`
      }
    >
      {text}
    </NavLink>
  );
};

export default NavLinkItem;
