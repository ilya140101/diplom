
interface IImage {
    url: string;
    name: string;
}
export interface IItem {
    id: string;
    name: string;
    external_urls: IExternalUrls;
}

interface IExternalUrls{
    spotify: string;
}

export interface IContent extends IItem {
    description?: string;
    images: IImage[];
    artists: IImage[];
}

export  interface ITrack extends IItem {
    album: IContent;
    description?: string;
    artists: IImage[];
}
export  interface IArtist extends IItem{
    images: IImage[];
    type: string;
}