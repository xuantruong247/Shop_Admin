"use client";
import Image from "next/image";
import React from "react";
import logo from "../../../public/logo.png";
import { navLinks } from "../../lib/constants";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";

const LeftSideBar = () => {
  const pathName = usePathname();
  return (
    <div className="h-screen left-0 p-10 top-0 sticky flex flex-col gap-16 bg-blue-2 shadow-xl max-lg:hidden">
      <Image src={logo} alt="logo" width={150} height={70} />
      <div className="flex flex-col gap-12">
        {navLinks.map((links) => (
          <Link
            href={links.url}
            key={links.label}
            className={`flex gap-4 text-body-medium   ${
              pathName === links.url ? "text-blue-1" : "text-grey-1"
            }`}
          >
            {links.icon}
            <p>{links.label}</p>
          </Link>
        ))}
      </div>
      <div className="flex gap-4 text-body-medium items-center">
        <UserButton
          afterSignOutUrl={process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL}
        />
        <p>Edit Profile</p>
      </div>
    </div>
  );
};

export default LeftSideBar;
