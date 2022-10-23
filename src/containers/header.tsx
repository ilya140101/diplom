import React from 'react';

export default function header(){
    return  (
        <header className="header">
            <div className="top-bar">
                <div className="arrows">
                    <button className="back arrow" title="Назад"></button>
                    <button className="forward arrow" title="Вперед"></button>
                </div>
                <button className="profile">
                    <img className="profile-image" src='./images/profile-image.jpg' alt="img"></img>
                    <span>Аккаунт</span>
                    <img className="profile-image" src="./images/arrow-down3.png" alt="img"/>
                </button>
            </div>
        </header>
    );
}