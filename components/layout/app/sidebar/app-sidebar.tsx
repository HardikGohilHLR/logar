// Sidebar
'use client';
import * as React from 'react';
import Link from 'next/link';
import { Bot, SquareTerminal } from 'lucide-react';

import { NavUser } from '@/components/layout/app/sidebar/nav-user';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from '@/components/ui';
import clsx from 'clsx';

const data = [
  {
    title: 'Dashboard',
    url: '/',
    icon: SquareTerminal,
    isActive: true,
  },
  {
    title: 'Settings',
    url: '/',
    icon: Bot,
  },
];

export const AppSidebar = ({ ...props }: React.ComponentProps<typeof Sidebar>) => {
  const { state } = useSidebar();

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className={clsx('px-5 pt-5', state === 'collapsed' && 'px-3')}>
        <Link href="/" className="flex">
          {state === 'expanded' ? (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" width="100" height="32" viewBox="0 0 155 46" fill="none">
                <path
                  d="M47.12 37H65.4V32H52.76V8.6H47.12V37ZM78.6163 37.32C84.6963 37.32 89.0163 33.24 89.0163 27.24C89.0163 21.24 84.6963 17.16 78.6163 17.16C72.4163 17.16 68.2563 21.4 68.2563 27.24C68.2563 33.08 72.4163 37.32 78.6163 37.32ZM78.6163 32.64C75.6563 32.64 73.5363 30.28 73.5363 27.24C73.5363 24.16 75.5763 21.84 78.6163 21.84C81.5363 21.84 83.6963 24.04 83.6963 27.24C83.6963 30.4 81.4563 32.64 78.6163 32.64ZM107.083 17.48V19.48H106.963C105.403 17.92 103.323 17.16 101.122 17.16C95.8825 17.16 92.0825 21.28 92.0825 27.04C92.0825 32.72 96.0025 36.64 101.403 36.64C103.763 36.64 105.723 35.84 107.083 34.36H107.203V36.32C107.203 38.72 105.323 40.68 101.643 40.68C99.1625 40.68 97.2425 39.92 95.3225 38.84L94.0825 43.28C96.4025 44.56 99.0425 45.24 102.123 45.24C109.603 45.24 112.283 40.84 112.283 34.76V17.48H107.083ZM102.363 31.92C99.5625 31.92 97.4025 29.96 97.4025 26.88C97.4025 23.92 99.4425 21.92 102.363 21.92C105.123 21.92 107.283 23.84 107.283 26.84C107.283 29.8 105.243 31.92 102.363 31.92ZM131.381 17.48V19.68H131.261C129.861 18 127.861 17.16 125.541 17.16C120.301 17.16 116.341 21.36 116.341 27.28C116.341 33.32 120.261 37.32 125.661 37.32C128.181 37.32 130.181 36.36 131.501 34.64H131.621V37H136.581V17.48H131.381ZM126.621 32.64C123.701 32.64 121.621 30.48 121.621 27.32C121.621 23.96 123.861 21.84 126.661 21.84C129.501 21.84 131.581 24.2 131.581 27.32C131.581 30.52 129.341 32.64 126.621 32.64ZM152.918 17.16C150.598 17.16 148.478 18.28 146.998 20.36H146.958V17.48H141.718V37H146.958V27.92C146.958 25.04 148.718 22.84 151.958 22.84C152.238 22.84 152.798 22.84 153.318 22.88V17.2C153.238 17.16 153.078 17.16 152.918 17.16Z"
                  fill="#1D2B3B"
                />
                <path d="M16 22L29.8564 34H2.14359L16 22Z" fill="#2a66ff" />
                <path d="M16 9L29.8564 21H2.14359L16 9Z" fill="#2a66ff" />
              </svg>
            </>
          ) : (
            <>
              <svg width="23" height="29" viewBox="0 0 32 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16 13L29.8564 25H2.14359L16 13Z" fill="#0C57FB" />
                <path d="M16 0L29.8564 12H2.14359L16 0Z" fill="#0C57FB" />
              </svg>
            </>
          )}
        </Link>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {data?.map((item) => {
              return (
                <SidebarMenuItem key={item?.title}>
                  <Link href={item?.url}>
                    <SidebarMenuButton className="cursor-pointer" tooltip={item?.title}>
                      {item?.icon && <item.icon />}
                      <span>{item?.title}</span>
                    </SidebarMenuButton>
                  </Link>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <NavUser />
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
};
