export type TrackProps = {
    image: string;
    name: string;
    desc: string;
    href: string;
}
export default function track (props: TrackProps) {
    // @ts-ignore
    return (
        <a href={props.href} className="link" target="_blank">
        <div className="track">
            <div>
                <img className="track-image" src={props.image} alt="track-img"></img>
            </div>
            <div className="track-name">
                {props.name}
                <div className="track-author">
                    {props.desc}
                </div>
            </div>
        </div>
        </a>
    );
}