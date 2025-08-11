export interface IFooter {
    block1: IFooterBlock[]
    block2: IFooterBlock[]
    block3: IFooterBlock[]
    block4: IFooterBlock[]
}
export interface IFooterBlock {
    title: string
    link: string
    logo_footer: IFormat
    social_icon: string
}
export interface IFormat {
    thumbnail: IThumbnail,
}
export interface IThumbnail {
    url: string,
}
export interface IFormat {
    formats: IFormat,
}