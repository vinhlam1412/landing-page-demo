import { IThumbnail } from "./caseStudy";
import { TypeNavItem } from "./navItem";

export interface IHeroBanner{
    id: string,
    title: string,
    slogan: string,
    backgroundMedia: IThumbnail,
    secondaryCTA: ILink,
    primaryCTA: ILink,
    card: ICard[]
}

export interface ILink{
    href: string,
    label: string,
    isExternal: boolean,
    isButtonLink: boolean,
    type: TypeNavItem
}
export interface ICard {
    title: string,
    description: string,
    icon: IThumbnail,
    secondaryCTA: ILink,
    primaryCTA: ILink,
}