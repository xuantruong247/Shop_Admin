"use client";
import { navLinks } from "@/lib/constants";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import logo from "../../../public/logo.png";
import { Menu } from "lucide-react";
import { usePathname } from "next/navigation";

const TopBar = () => {
  const [dropDownMenu, setDropDownMenu] = useState<any>(false);
  const pathName = usePathname();
  return (
    <div className="sticky top-0 z-20 w-full flex justify-between items-center p-4 bg-blue-2 shadow-xl lg:hidden">
      <Image src={logo} alt="logo" width={150} height={70} />
      <div className="flex items-center gap-3">
        <div className="flex gap-4 max-md:hidden">
          {navLinks.map((links) => (
            <Link
              href={links.url}
              key={links.label}
              className="text-small-medium"
            >
              <div
                className={`flex items-center ${
                  pathName === links.url ? "text-blue-1" : "text-grey-1"
                }`}
              >
                {links.icon}
                <p>{links.label}</p>
              </div>
            </Link>
          ))}
        </div>
        <div className="flex gap-4 items-center relative">
          <Menu
            className="cursor-pointer md:hidden"
            onClick={() => {
              setDropDownMenu(!dropDownMenu);
            }}
          />
          {dropDownMenu && (
            <div className="flex flex-col absolute top-10 right-6 gap-8 p-5 bg-white shadow-xl rounded-lg">
              {navLinks.map((links) => (
                <Link
                  href={links.url}
                  key={links.label}
                  className="flex gap-4 text-small-medium"
                >
                  <p>{links.icon}</p>
                  <p>{links.label}</p>
                </Link>
              ))}
            </div>
          )}
          <UserButton
            afterSignOutUrl={process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL}
          />
        </div>
      </div>
    </div>
  );
};

export default TopBar;
