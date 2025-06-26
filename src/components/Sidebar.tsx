import Link from "next/link";
import { motion } from "motion/react";
import { createPortal } from "react-dom";
import { useEffect, useRef } from "react";
import { Moon, Sun, X } from "lucide-react";

import useDarkMode from "@/hooks/useToggleTheme";

interface SidebarProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const Sidebar = ({ open, onOpenChange }: SidebarProps) => {
  const portalRef = useRef<HTMLDivElement>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);

  const [isDarkMode, setIsDarkMode] = useDarkMode();

  {
    /* Handling Outside click to close sidebar */
  }
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        onOpenChange(false);
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "hidden"; // Disable scrolling when sidebar is open
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open, onOpenChange]);

  {
    /* Creating and appending container to body for rendering sidebar in it */
  }
  useEffect(() => {
    if (!portalRef.current) {
      portalRef.current = document.createElement("div");
      portalRef.current.id = "sidebar-root";

      {
        /* Append portal to body */
      }
      document.body.appendChild(portalRef.current);
    }

    {
      /* Commented this code as this remove sidebar-root when useEffect finishes */
    }
    // return () => {
    //   if (portalRef.current) {
    //     document.body.removeChild(portalRef.current);
    //   }
    //   console.log("portal Ref: ", portalRef.current);
    // }
  }, []);

  if (!portalRef.current) return null;
  // if (!open) return null;

  return createPortal(
    <motion.aside
      ref={sidebarRef}
      initial={{ x: "-100%" }}
      animate={{ x: open ? 0 : "-100%" }}
      transition={{ duration: 0.2 }}
      className=" bg-white dark:bg-neutral-900 absolute left-0 top-0 h-full w-64 p-2 z-50"
    >
      <button
        onClick={() => onOpenChange(false)}
        className="absolute right-2 top-2 cursor-pointer"
      >
        <X />
      </button>

      {/* Nav Links */}
      <div className=" flex flex-col items-center mt-12 gap-y-4">
        {["Home", "Real Estate", "FAQs", "Blogs", "Contact"].map(
          (item, index) => (
            <Link
              key={index}
              href={`/${item.toLowerCase().split(" ").join("-")}`}
              className="mx-4 font-medium cursor-pointer dark:text-white"
              onClick={() => onOpenChange(false)}
            >
              {item}
            </Link>
          )
        )}
      </div>

      {/* Theme Toggle Button */}
      <button
        type="button"
        onClick={() => setIsDarkMode(!isDarkMode)}
        className=" border-2 border-neutral-800 dark:border-white rounded-3xl flex p-1 w-20 mx-auto mt-4 cursor-pointer"
      >
        <motion.span
          className={` w-6 h-6 flex justify-center items-center dark:bg-white bg-neutral-800 rounded-full`}
          initial={isDarkMode ? { x: 0 } : { x: 40 }}
          animate={isDarkMode ? { x: 42 } : { x: 0 }}
          transition={{ duration: 0.4 }}
        >
          {isDarkMode ? (
            <Moon fill="black" size={24} />
          ) : (
            <Sun color="white" size={20} />
          )}
        </motion.span>
      </button>
    </motion.aside>,
    document.getElementById("sidebar-root") as HTMLElement
  );
};
export default Sidebar;
