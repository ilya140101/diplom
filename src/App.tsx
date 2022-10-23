import React, { useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { client_id, client_secret, URL } from './data/apiData';
import Header from './containers/header';
import SideBar from './containers/sidebar';
import Footer from './containers/footer';
import Track from './sections/track';
import {IArtist, IContent, ITrack, IItem} from './interfaces/interfaces'
import { MusicSection } from "./sections/musicSection";

function App() {
    const [token, setToken] = useState('');
    const [albums, setAlbums] = useState<IContent[]>([]);
    const [artists, setArtists] = useState<IArtist[]>([]);
    const [hypeAlbums, setHypeAlbums] = useState<IContent[]>([]);
    const [recentlyTracks, setRecentlyTracks] = useState<ITrack[]>([]);



    useEffect(() => {
        const data = new URLSearchParams();
        data.append('grant_type', 'client_credentials');
        const headers = {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: 'Basic ' + btoa(client_id + ':' + client_secret),
        };
        axios
            .post('https://accounts.spotify.com/api/token', data, {
                headers: headers,
            })
            .then((response) => {
                setToken(response.data.access_token);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    function useUserRequest(url: string, action: (value: AxiosResponse<any, any>) => void) {
        useEffect(() => {
            if(!!token){
                axios
                    .get(url, {
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: 'Bearer ' + token,
                        },
                    })
                    .then(action)
                    .catch((error) => {
                        console.log(error);
                    });
            }
        }, [token]);

    }
    //https://open.spotify.com/artist/47jBQjRmURjRn3XfLIaHvV?si=b19cede951ad4da7
    //https://open.spotify.com/artist/3WGL5CRtgYd8Tm5elcbsdV?si=7215828b51c84eae
    //https://open.spotify.com/artist/3giS0ZS4ACM4WKXU1VklAD?si=65caf2d72c5c4d28
    //https://open.spotify.com/artist/2HPiMwJktBXqakN0hnON2R?si=af42ae5e02dc4fe4
    useUserRequest(
        URL + "artists?ids=47jBQjRmURjRn3XfLIaHvV,3WGL5CRtgYd8Tm5elcbsdV,3giS0ZS4ACM4WKXU1VklAD,2HPiMwJktBXqakN0hnON2R",
        response => setArtists(response.data.artists)
    );

    //https://open.spotify.com/album/4xRx5clwNp38t9ceiS4lUP?si=2LkBEwLzSnqcUbAKQe9AVw
    //https://open.spotify.com/album/16ElbnOtY2UgGaPKoLfst4?si=Mfi4VAAVRB-IZxZOsu-dVA
    //https://open.spotify.com/album/4xTAyz6fCGXWbT3PywmAAl?si=XGC-BLKoS5es18pKRmoTWA
    useUserRequest(
        URL + "albums?ids=4xRx5clwNp38t9ceiS4lUP,16ElbnOtY2UgGaPKoLfst4,4xTAyz6fCGXWbT3PywmAAl",
        response => setAlbums(response.data.albums)
    );

    //https://open.spotify.com/track/4wwqUoX7OweabhkpP2kaTS?si=1dc4e8170f5b483b
    //https://open.spotify.com/track/6OMBhRhwg6cnWR9ghrTubA?si=f6a448ee6f4c4c53
    //https://open.spotify.com/track/624Bm6Htm3UW0i3tmbRCcu?si=16e6c038f3114f2b
    useUserRequest(
        URL + "tracks?ids=4wwqUoX7OweabhkpP2kaTS,6OMBhRhwg6cnWR9ghrTubA,624Bm6Htm3UW0i3tmbRCcu",
        response => setRecentlyTracks(response.data.tracks)
    );

    //https://open.spotify.com/album/4QTQIR6xbGKXaR2AqDsrX1?si=13784bc0fc9345a5
    //https://open.spotify.com/album/6YIPGhIRsoHBrYCg0IicZV?si=834887ff702d44b3
    //https://open.spotify.com/album/50ImqQW5kr8xad7RZgnCvB?si=67701b5a55c84697
    //https://open.spotify.com/album/73Rhi1qW9fhKgYi7Tnf3AE?si=59b46c3fbadb4f0d
    useUserRequest(
        URL + "albums?ids=4QTQIR6xbGKXaR2AqDsrX1,6YIPGhIRsoHBrYCg0IicZV,50ImqQW5kr8xad7RZgnCvB,73Rhi1qW9fhKgYi7Tnf3AE",
        response => setHypeAlbums(response.data.albums)
    );


    return (
        <div className="App">
            <Header />
            <SideBar />
            <main className="content">
                <div className="music">
                    {token ? (
                        <>
                            <MusicSection
                                headerText="Для Вас"
                                tracks={toTrack<IContent>(albums, x => x.images[0].url, x => x.artists[0].name)}
                            />
                            <MusicSection
                                headerText="Недавно прослушано"
                                tracks={toTrack<ITrack>(recentlyTracks, x => x.album.images[0].url, x => x.artists[0].name )}
                            />
                            <MusicSection
                                headerText="Популярные альбомы"
                                tracks={toTrack<IContent>(hypeAlbums, x => x.images[0].url, x => x.artists[0].name)}
                            />
                            <MusicSection
                                headerText="Популярные исполнители"
                                tracks={toTrack<IArtist>(artists, x => x.images[0].url, x => "")}
                            />
                        </>
                    ) : (
                        <div>Error(</div>
                    )}
                </div>
            </main>
            <Footer />
        </div>
    );
}

function toTrack<T extends IItem>(
    items: T[],
    imageSelector: (value: T) => string,
    descSelector: (value: T) => string,
): JSX.Element[] {

    return items.map(item =>
        <Track
            key={item.id}
            name={item.name}
            image={imageSelector(item)}
            desc={descSelector(item)}
            href={item.external_urls.spotify}
        />
    )
}

export default App;