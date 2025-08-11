export const TypeNavItem = {
  PRIMARY: "PRIMARY",
  SECONDARY: "SECONDARY",
} as const;

export type TypeNavItem = typeof TypeNavItem[keyof typeof TypeNavItem];

export interface IMenuItem {
  id: number;
  url: string;
  title: string;
  order: number;
  target: string;
  enabled: boolean;
  isButtonLink: boolean;
  childrens: IMenuItem[];
}