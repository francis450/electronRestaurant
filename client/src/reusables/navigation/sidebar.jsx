import React from "react";
import MenuList from "../MenuList";

const Sidebar = ({showingNavigationDropdown, setShowingNavigationDropdown}) => {
    return (
      <div className="drawer z-20" data-theme="cupcake">
         <input id="my-drawer" type="checkbox" className="drawer-toggle" onClick={() =>{
                  setShowingNavigationDropdown(
                     (previousState) => !previousState
                  )}}  />
         <div className="drawer-content">
            {/* Page content here */}
            <label htmlFor="my-drawer" className="btn btn-primary drawer-button">
            <svg
               className="h-6 w-6"
               stroke="currentColor"
               fill="none"
               viewBox="0 0 24 24"
            >
               <path
                     className={
                        !showingNavigationDropdown
                           ? "inline-flex"
                           : "hidden"
                     }
                     strokeLinecap="round"
                     strokeLinejoin="round"
                     strokeWidth="2"
                     d="M4 6h16M4 12h16M4 18h16"
               />
               <path
                     className={
                        showingNavigationDropdown
                           ? "inline-flex"
                           : "hidden"
                     }
                     strokeLinecap="round"
                     strokeLinejoin="round"
                     strokeWidth="2"
                     d="M6 18L18 6M6 6l12 12"
               />
            </svg>
            </label>
         </div> 
         <div className="drawer-side">
            <label htmlFor="my-drawer" className="drawer-overlay"></label>
            <ul className="menu py-4 w-80 h-full text-base-content">
               <MenuList />
            </ul>
         </div>
      </div>
    );
};

export default Sidebar;
