import React from 'react';
// import ReactAudioPlayer from 'react-audio-player';
// import ReactPlayer from 'react-player';

class ViewSong extends React.Component {
    constructor() {
        super();
        this.state = {
            song: {},
            url: ''
        }
        this.loadSong = this.loadSong.bind(this);
        this.playMusic = this.playMusic.bind(this);
        this.pauseMusic = this.pauseMusic.bind(this);
    }

    componentDidMount() {
        var song_id = this.props.match.params.song_id;
        this.loadSong(song_id);
    }

    playMusic() {
        document.getElementById('player').play();
    }

    pauseMusic() {
        document.getElementById('player').pause();
    }

     loadSong(song_id) {
        console.log(song_id);
        var self = this;
        fetch(`/api/songs/${song_id}/`)
        .then((res) => {
            return res.json()
        })
        .then((json) => {
            self.setState({
                song: json,
                url: json.link
            })
        })
    }

    render() {
        // var link = this.state.song.link;
        return (
            <div className="text-center">
                <h1><span class="spanListen" />Listen to {this.state.song.name}</h1>
                <div className='playerContainer'></div>

                <audio id="player" src={this.state.url}></audio>
                <div id='musicBtns'> 
                    <button id="playBtn"onClick={this.playMusic}>Play</button> 
                    <button id="pauseBtn" onClick={this.pauseMusic}>Pause</button> 
                </div>
            </div>    
        )    
    }
 }

export default ViewSong;