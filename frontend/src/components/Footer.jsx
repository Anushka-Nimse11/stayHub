import { FaInstagram, FaFacebook } from "react-icons/fa";

function Footer() {
  return (
    <footer className="w-full bg-white shadow-md px-4 py-4 absolute bottom left-0">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center md:justify-between gap-4">
        {/* Left Section */}
        <div className="flex flex-wrap items-center gap-3 text-sm md:text-base justify-center md:justify-start">
          <p className="flex items-center gap-1">
            <i className="fa-regular fa-copyright"></i> 2026 StayHub, Inc.
          </p>
          <a href="/privacy" className="hover:underline">
            Privacy
          </a>
          <a href="/terms" className="hover:underline">
            Terms
          </a>
          <a href="/company" className="hover:underline">
            Company details
          </a>
        </div>

        {/* Right Section */}
        <div className="flex flex-wrap items-center gap-3 justify-center md:justify-end">
          <p className="flex items-center gap-1 cursor-pointer">
            <i className="fa-solid fa-globe"></i> English (In)
          </p>
          <p className="flex items-center gap-1 cursor-pointer">
            <i className="fa-solid fa-indian-rupee-sign"></i> INR
          </p>

          <div className="flex gap-2">
            <div className="cursor-pointer rounded-lg p-2 hover:bg-gray-200 transition inline-flex items-center justify-center">
              <FaFacebook size={20} />
            </div>
            <div className="cursor-pointer rounded-lg p-2 hover:bg-gray-200 transition inline-flex items-center justify-center">
              <FaInstagram size={20} />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
