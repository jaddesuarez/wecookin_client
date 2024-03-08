import { ElementType } from "react";

export interface INavProps {}

export interface INavItemProps {
  title: string;
  icon: ElementType;
  description: string;
  hRef: string;
}

export interface INavHoverBox {
  title: string;
  icon: ElementType;
  description: string;
}
