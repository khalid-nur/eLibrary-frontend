import elibraryLogo from "../../../assets/elibrary_logo.png";
import { FaFacebook, FaLinkedin, FaInstagram } from "react-icons/fa";

const Footer = () => {
  const footerData = [
    {
      title: "Company Info",
      links: [
        { name: "About Us", href: "#" },
        { name: "Contact", href: "#" },
        { name: "Careers", href: "#" },
        { name: "Awards & Recognition", href: "#" },
      ],
    },

    {
      title: "Legal",
      links: [
        { name: "Privacy Policy", href: "#" },
        { name: "Terms & Conditions", href: "#" },
      ],
    },

    {
      title: "Resources",
      links: [
        { name: "FAQs", href: "#" },
        { name: "How it Works", href: "#" },
        { name: "Partnerships", href: "#" },
        { name: "Support Center", href: "#" },
      ],
    },
  ];

  return (
    <footer className="py-4 bg-wrapper ">
      <div className="container mx-auto">
        <div className="md:flex md:justify-between p-4 py-6 lg:py-8">
          <div className="mb-6 md:mb-0">
            <img src={elibraryLogo} className=" w-24" alt="eLibrary Logo" />

            <div>
              <h2 className="text-sm font-poppins font-semibold text-gray-900 uppercase my-2">
                Get In Touch
              </h2>
              <div className="flex gap-5">
                <FaFacebook size={25} />
                <FaLinkedin size={25} />
                <FaInstagram size={25} />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
            {footerData.map((section) => (
              <div key={section.title}>
                <h2 className="mb-6 text-sm font-poppins font-semibold text-gray-900 uppercase">
                  {section.title}
                </h2>
                <ul className="text-gray-500 dark:text-gray-400 font-medium">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex} className="mb-4">
                      <a
                        href={link.href}
                        className="text-gray-600  hover:underline"
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
