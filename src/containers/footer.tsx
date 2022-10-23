import React from 'react';


export default function footer(){
    return(
        <footer className="footer">
        <div className="player">
          <div className="track-info">
            <div>
              <img className="author-image" src="./images/goodtimes.jpg" alt="img"/>
            </div>
            <div className="author-name">
              <div>ГУДТАЙМС
                <br></br>
                Твои глаза
              </div>
            </div>
            <div>
              <input type="image" alt="img" className="playing-image" src="./images/like.png" id="footerHeart" />
            </div>
          </div>
          <audio controls className="audio-player" src="./music/Good_Times_-_Tvoi_glaza.mp3"/>
        </div>
      </footer>
    );
}