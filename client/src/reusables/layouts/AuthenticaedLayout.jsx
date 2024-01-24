import { useEffect, useState } from "react";
import ApplicationLogo from "../ApplicationLogo";
import Dropdown from "../Dropdown";
import NavLink from "../NavLink";
import { useNavigate } from "react-router-dom";
import MenuList from "../MenuList";

export default function Authenticated({ header, children }) {
  const [showingSidebar, setShowingSidebar] = useState(false);
  const [user, setUser] = useState("Admin");
  const navigate = useNavigate();

  // useEffect to set screen sizes
  useEffect(() => {
    let auth = sessionStorage.getItem("auth");
    if (auth) setUser(JSON.parse(auth).user);
    else navigate("/");

    const handleResize = () => {
      if (window.innerWidth < 640) {
        setShowingSidebar(false);
      } else {
        setShowingSidebar(true);
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="max-h-screen">
      <nav className="bg-[#222222] border-b border-gray-100">
        <div className="md:max-w-[95%] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-[8vh]">
            <div className="flex">
              <div className="shrink-0 flex items-center gap-4">
                <a href="/">
                  <ApplicationLogo className="block h-9 w-auto fill-current text-gray-800" />
                </a>
                {header}
              </div>
            </div>

            <div className="hidden sm:flex sm:items-center sm:ml-6">
              <div className="ml-3 relative">
                <Dropdown>
                  <Dropdown.Trigger>
                    <span className="inline-flex rounded-md">
                      <button
                        type="button"
                        className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none transition ease-in-out duration-150"
                      >
                        {user}

                        <svg
                          className="ml-2 -mr-0.5 h-4 w-4"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    </span>
                  </Dropdown.Trigger>

                  <Dropdown.Content>
                    <Dropdown.Link href={""}>Profile</Dropdown.Link>
                    <Dropdown.Link href={""} method="post" as="button">
                      Log Out
                    </Dropdown.Link>
                  </Dropdown.Content>
                </Dropdown>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <div data-theme="cupcake" className="block h-[90vh] text-[#D3D3D3]">
        <div className="w-full grid grid-cols-6 gap-2">
          <div className="col-span-1 bg-[#222222] h-[91.75vh] pt-10">
            <MenuList />
          </div>
          <div className="col-span-5 w-full px-3">{children}</div>
        </div>
      </div>
    </div>
  );
}
