import React, { Component } from "react";
// import songsAPI from '../../utils/songsAPI';
import { Link } from 'react-router-dom';

class Song extends Component {
    constructor(props) {
        super(props);
        this.state = {
            songs: []
        }
    }

    componentDidMount() {
        var self = this;
        fetch('/api/songs/getsongs')
        .then(res => {
            return res.json()
        }).then(function(json) {
            self.setState({
                songs: json
            })
        })
    } 

    render() {
        console.log(this.state.songs);
        var songs = this.state.songs.map(function(song) {
            var url = song.link;
            return (
                <tr key={song.id}>
                    <td><Link to={`/songs/${song.id}`}>{song.name} </Link></td>
                    <td>{song.artistName}</td>
                    <td>{song.album}</td>
                    <td>{song.releaseDate}</td>
                    <td>{song.genre}</td>
                    {/* <td></td> */}
                </tr>
            )
        })

        return (
            <div>
                <h1>All Songs</h1>
                <br/>

                <table style={{"width": "80%"}} align="center">
                    <thead>
                        <tr>
                            <th>Song Name</th>
                            <th>Artist Name</th>
                            <th>Album</th>
                            <th>Release Date</th>
                            <th>Genre</th>
                            {/* <th>Listen to Song</th> */}
                        </tr>
                    </thead>    

                    <tbody>
                        { songs }
                    </tbody>    
                </table>
            </div>
        )
    }
}

export default Song;