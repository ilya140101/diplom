import React from 'react';

export default function sideBar(){
    return(
        <div className ="sidebar">
            <div className="bar">
                <div title="Spotify Clone">
                    <a href="/">
                        <img className="logo-image" src="../images/Spotify_Logo_RGB_White.png" alt="img"></img>
                    </a>
                </div>
                <ul className="navigation">
                    <li className = "home  sidebar-list elem">
                        <a className="links" href="/">
                            <span>Главная</span>
                        </a>
                    </li>
                    <li className="search  sidebar-list elem">
                        <a className="links" href="/">
                            <span>Поиск</span>
                        </a>
                    </li>
                    <li className="mediateka  sidebar-list elem">
                        <a className="links" href="/">
                            <span>Моя медиатека</span>
                        </a>
                    </li>
                </ul>
                <ul className = "playlist">
                    <li className = "create  sidebar-list elem">
                        <a className ="links" href="/">
                            <span>Создать плейлист</span>
                        </a>
                    </li>
                    <li className = "lovely  sidebar-list elem">
                        <a className ="links" href="/">
                            <span>Любимые треки</span>
                        </a>
                    </li>
                </ul>
                <div className="download">
                    <a className = "links" href = "/">
                        <img src="./images/download-img.png" alt="img"/>
                        <span> Установить приложение</span>
                    </a>
                </div>
            </div>
        </div>
    );
}