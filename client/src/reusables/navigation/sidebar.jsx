import React from "react";
import MenuList from "../MenuList";
import { CloseMenubar, OpenMenubar } from "../svgs/svgs";

const Sidebar = ({
  showingNavigationDropdown,
  setShowingNavigationDropdown,
}) => {
  return (
    <div className="drawer z-20" data-theme="cupcake">
      {/* <input
        id="my-drawer"
        type="checkbox"
        className="drawer-toggle"
        onClick={() => {
          setShowingNavigationDropdown((previousState) => !previousState);
        }}
      /> */}
      <div
        className=""
        onClick={() =>
          setShowingNavigationDropdown((previousState) => !previousState)
        }
      >
        {showingNavigationDropdown ? (
          <CloseMenubar className="w-8 h-8" />
        ) : (
          <OpenMenubar className="w-8 h-8" />
        )}
      </div>
      {showingNavigationDropdown && (
        <div className="fixed top-0 left-0 bg-[#222]">
          <div className="w-80 h-screen">
            <MenuList />
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
