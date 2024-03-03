import { BsTwitterX } from "react-icons/bs";
import {
  FaInstagram as InstagramIcon,
  FaGithub as GithubIcon,
} from "react-icons/fa";
import { FaFacebook as FacebookIcon } from "react-icons/fa";
import { IoEarth as EarthIcon } from "react-icons/io5";

const LINKS = [
  {
    title: "Product",
    items: ["Overview", "Features", "Solutions", "Tutorials"],
  },
  {
    title: "Company",
    items: ["About us", "Careers", "Press", "News"],
  },
  {
    title: "Resource",
    items: ["Blog", "Newsletter", "Events", "Help center"],
  },
];

const currentYear = new Date().getFullYear();

const Footer = () => {
  return (
    <footer className="relative w-full mt-12 bottom-0  border-richblack-200  border-t shadow-sm bg-slate-100">
      <div className="mx-auto w-full max-w-7xl px-8">
        <div className="w-full h-[40px] hidden sm:block"></div>
        <div className="grid grid-cols-1 justify-between gap-4 md:grid-cols-2">
          <h2 className="mb-6 text-[2rem] text-yellow-300 ">StudyMates</h2>
          <div className="grid grid-cols-3 justify-between gap-4">
            {LINKS.map(({ title, items }) => (
              <ul key={title}>
                <li className="mb-3 font-medium opacity-40">{title}</li>
                {items.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="py-1.5 font-normal transition-colors hover:text-blue-gray-900"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
        <div className="mt-12 flex w-full flex-col items-center justify-center border-t border-blue-gray-50 py-4 md:flex-row md:justify-between">
          <div className="mb-4 text-center font-normal text-blue-gray-900 md:mb-0">
            &copy; {currentYear}{" "}
            <a
              href="#"
              className=" text-yellow-300"
            >
              StudyMates
            </a>
            . All Rights Reserved.
          </div>
          <div className="flex gap-4 text-blue-gray-900 sm:justify-center">
            <a
              href="#"
              className="opacity-80 transition-opacity hover:opacity-100"
            >
              <FacebookIcon className="h-5 w-5" />
            </a>
            <a
              href="#"
              className="opacity-80 transition-opacity hover:opacity-100"
            >
              <InstagramIcon className="h-5 w-5 bg-transparent" />
            </a>
            <a
              as="a"
              href="#"
              className="opacity-80 transition-opacity hover:opacity-100"
            >
              <BsTwitterX className=" h-5 w-5 " />
            </a>
            <a
              href="#"
              className="opacity-80 transition-opacity hover:opacity-100"
            >
              <GithubIcon className=" h-5 w-5" />
            </a>
            <a
              href="#"
              className="opacity-80 transition-opacity hover:opacity-100"
            >
              <EarthIcon className=" h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
