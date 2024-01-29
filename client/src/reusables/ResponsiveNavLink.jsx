import { Link } from "react-router-dom";

export default function ResponsiveNavLink({
  active = false,
  className = "",
  children,
  ...props
}) {
  return (
    <Link
      {...props}
      className={`w-full text-lg flex items-start my-4 pl-3 pr-4 py-2 border-l-4 ${
        active
          ? "border-[#61dafb] text-[#61dafb] bg-[#282c34] focus:text-indigo-800 focus:bg-indigo-100 focus:border-indigo-700 rounded-l-full"
          : "border-transparent text-[#D3D3D3] hover:text-gray-800 hover:bg-gray-50 hover:border-gray-300 rounded-l-full focus:text-gray-800 focus:bg-gray-50 focus:border-gray-300"
      } text-base font-medium focus:outline-none transition duration-150 ease-in-out ${className}`}
    >
      {children}
    </Link>
  );
}
