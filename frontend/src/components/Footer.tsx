import { FaFacebookF, FaGithub, FaLinkedinIn } from "react-icons/fa";
import logo from "/krishakMart_Logo.jpg";
import khalti_logo from "/khalti_logo.jpg";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-white py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 border-b border-slate-700 pb-10">
          {/* Logo + About */}
          <div className="sm:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <img
                src={logo}
                alt="KrishakMart Logo"
                className="w-20 h-14 rounded-lg bg-white shadow-md object-fill"
              />
              <span className="text-2xl font-bold tracking-wide">
                KrishakMart
              </span>
            </div>
            <p className="text-sm text-slate-300">
              Connecting farmers directly with consumers for fresh, organic
              produce. Empowering local agriculture with modern tech.
            </p>
          </div>

          {/* Partners */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Partners</h3>
            <div className="flex items-center gap-3 mb-6">
              <img 
                src={khalti_logo} 
                alt="Khalti" 
                className="h-10 w-auto object-contain bg-white rounded-md p-1 shadow-sm" 
              />
              <span className="text-sm text-pink-400 font-medium">
                Khalti Integration
              </span>
            </div>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex gap-4 text-xl">
              <a href="https://www.facebook.com/pratik.sharma.948514" className="hover:text-indigo-400 transition">
                <FaFacebookF />
              </a>
              <a href="https://github.com/pratik2061" className="hover:text-indigo-400 transition">
                <FaGithub />
              </a>
              <a href="https://www.linkedin.com/in/pratik-sharma-937909290/" className="hover:text-indigo-400 transition">
                <FaLinkedinIn />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="mt-8 flex flex-col sm:flex-row justify-between items-center text-sm text-slate-400">
          <p className="text-center sm:text-left">
            &copy; {year} KrishakMart
          </p>
          <p className="mt-2 sm:mt-0">All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}