import { IFormat as IFormatFooter } from './footer';
import { ILink } from "./heroBanner"

export interface ICaseStudy{
    id: number,
    title:string,
    description:string,
    caseStudy: ICaseStudyITem[],
    ctaRead: ILink
}
export interface IThumbnail{
    formats: IFormat,
    thumbnail: IImageFormat
}
export interface IImageFormat {
    url: string,
}
export interface IFormat {
    large: IImageFormat,
    small : IImageFormat,
    medium: IImageFormat
}
export interface ICaseStudyITem {
    id: number,
    title: string,
    client: string,
    Challenge: string,
    Result: string,
    image: IFormatFooter,

}