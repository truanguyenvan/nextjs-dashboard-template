import React from "react";
import { Sidebar } from "./sidebar.styles";
import { HomeIcon } from "../icons/sidebar/home-icon";
import { DevIcon } from "../icons/sidebar/dev-icon";
import { SidebarItem } from "./sidebar-item";
import { SidebarMenu } from "./sidebar-menu";
import { useSidebarContext } from "../layout/layout-context";
import { useRouter } from "next/router";

export const SidebarWrapper = () => {
  const router = useRouter();
  const { collapsed, setCollapsed } = useSidebarContext();

  return (
    <aside className="h-screen z-[202] sticky top-0">
      {collapsed ? (
        <div className={Sidebar.Overlay()} onClick={setCollapsed} />
      ) : null}
      <div
        className={Sidebar({
          collapsed: collapsed,
        })}
      >
        <div className="flex flex-col justify-between h-full">
          <div className={Sidebar.Body()}>
            <SidebarItem
              title="Home"
              icon={<HomeIcon />}
              isActive={router.pathname === "/"}
              href="/"
            />
            <SidebarMenu title="Contents">
              <SidebarItem
                isActive={router.pathname === "/contents"}
                title="Contents"
                icon={<DevIcon />}
                href="contents"
              />
              <SidebarItem
                isActive={router.pathname === "/upload"}
                title="Upload"
                icon={<DevIcon />}
              />
            </SidebarMenu>

            <SidebarMenu title="ReUpload">
              <SidebarItem
                  isActive={router.pathname === "/Manual"}
                  title="Manual"
                  icon={<DevIcon />}
              />
              <SidebarItem
                  isActive={router.pathname === "/Auto"}
                  title="Auto"
                  icon={<DevIcon />}
              />
            </SidebarMenu>


            <SidebarMenu title="Setting">
              <SidebarItem
                isActive={router.pathname === "/vps_services"}
                title="VPS and Services"
                icon={<DevIcon />}
              />
              <SidebarItem
                  isActive={router.pathname === "/accounts"}
                  title="Accounts"
                  icon={<DevIcon/>}
              />
            </SidebarMenu>
          </div>
        </div>
      </div>
    </aside>
  );
};
