type MusicSectionProps = {
    headerText: string;
    tracks: JSX.Element[]
}

export function MusicSection(props: MusicSectionProps): JSX.Element {
    const { headerText, tracks } = props;
    return (
        <>
            <h2 className="music-head">{headerText}</h2>
            <section className="tracks">
                {tracks}
            </section>
        </>
    )
}