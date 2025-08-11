import { IFormat } from "./footer";

export interface IClient {
    id: number,
    title:string,
    description: string,
    clientLogo: IClientLogo[],
    testimonial: IClientFeedback[]
}
export interface IClientFeedback {
    id: number,
    quote: string,
    rating: number,
    author: string,
    position: string,
}
export interface IClientLogo {
    id: number,
    name: string,
    image: IFormat
}