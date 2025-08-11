import { IFormat } from "./footer"
import { ILink } from "./heroBanner"

export interface IService {
    id: number,
    title: string,
    description: string,
    feature: IFeature[]
}
export interface IFeature {
    id: number,
    title: string,
    description: string,
    icon: IFormat,
    featureItem: IFeatureItem[],
    ctaViewDetail: ILink
}
export interface IFeatureItem {
    id: number,
    title: string
}