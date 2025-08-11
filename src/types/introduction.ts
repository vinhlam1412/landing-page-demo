import { ILink } from "./heroBanner"

export interface IIntroduction {
    id: string,
    heading: string,
    subHeading: IRichText[],
    virtualHeading: string,
    ctaDiscoverMore: ILink,
    virtualElement: IVirtualElement[]
}

export interface IRichText {
    type:string,
    children: IText[]
}
export interface IText {
    text:string,
    type: string
}
export interface IVirtualElement{
    id: number,
    key: string,
    value: string
}