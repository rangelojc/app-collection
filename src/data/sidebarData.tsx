import { RouteDefinition } from "@/types/app";
import { LayoutDashboard, LucideProps } from "lucide-react";
import type { ForwardRefExoticComponent } from "react";
import { FaFileInvoice } from "react-icons/fa";

export interface NavItem {
  id: number;
  title: string;
  route: RouteDefinition;
  icon: ForwardRefExoticComponent<Omit<LucideProps, "ref">>;
}

export interface SidebarItem {
  id: number;
  title: string;
  icon: ForwardRefExoticComponent<Omit<LucideProps, "ref">>;
  children: NavItem[];
}

export default function useSidebarItems() {
  return [
    {
      id: 1,
      title: "Scrappers",
      icon: LayoutDashboard,
      children: [
        {
          id: 101,
          title: "Loyverse Sales",
          route: RouteDefinition.INDEX,
          icon: FaFileInvoice,
        },
      ],
    },
  ];
}
