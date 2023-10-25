import { Input, Link, Navbar, NavbarContent } from "@nextui-org/react";
import React from "react";
import { BurguerButton } from "./burguer-button";
import {DarkModeSwitch} from "./darkmodeswitch";
import {HouseIcon} from "../icons/breadcrumb/house-icon";
import {UsersIcon} from "../icons/breadcrumb/users-icon";

interface Props {
  children: React.ReactNode;
}

export const NavbarWrapper = ({ children }: Props) => {
  return (
    <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
      <Navbar
        isBordered
        className="w-full"
        classNames={{
          wrapper: "w-full max-w-full",
        }}
      >
        <NavbarContent justify="start">
        </NavbarContent>
        <NavbarContent
          justify="end"
          className="w-fit">
              <DarkModeSwitch />
        </NavbarContent>
      </Navbar>
      {children}
    </div>
  );
};
