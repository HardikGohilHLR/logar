// Layout - App
import React, { ReactNode } from 'react';

import { AppSidebar } from '@/components/imports';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui';

type Props = {
  children: ReactNode;
};

export const AppLayout = ({ children }: Props) => {
  return (
    <>
      <SidebarProvider>
        <AppSidebar />

        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1" />
            </div>
          </header>

          <div className="flex flex-1 flex-col gap-4 p-8 pt-0">{children}</div>
        </SidebarInset>
      </SidebarProvider>
    </>
  );
};
