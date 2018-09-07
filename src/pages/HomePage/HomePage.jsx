import React from 'react';
import Song from '../../components/Song/Song';
import songsAPI from '../../utils/songsAPI';

class HomePage extends React.Component {
    render() {
        return(
            <div>
                <h1>Welcome to Kents Music Box</h1>
                <Song />
            </div>
        )
    }
}

export default HomePage;