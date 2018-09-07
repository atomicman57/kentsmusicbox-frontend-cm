import React from 'react';
import Modal from 'react-responsive-modal';


import { createComments, updateComment, deleteComment, getcomments  } from '../../utils/commentAPI'
// import ReactAudioPlayer from 'react-audio-player';
// import ReactPlayer from 'react-player';

class ViewSong extends React.Component {
    constructor() {
        super();
        this.state = {
            song: {},
            url: '',
            comments: [],
            songId: '',
            comment: '',
            user: null,
            editId: '',
            editComment: ''
            // showCommentBox: false
        }
        this.loadSong = this.loadSong.bind(this);
        this.playMusic = this.playMusic.bind(this);
        this.pauseMusic = this.pauseMusic.bind(this);
        this.addComment = this.addComment.bind(this);
        this.editComment = this.editComment.bind(this);
        this.deleteComment = this.deleteComment.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onOpenModal = this.onOpenModal.bind(this);
        this.onCloseModal = this.onCloseModal.bind(this);
    }

    componentDidMount() {
        var song_id = this.props.match.params.song_id;
        this.setState({ songId: song_id})
        this.loadSong(song_id);
        getcomments(song_id).then((data)=>{
            this.setState({ comments: data, user: JSON.parse(this.props.user) })
        });
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

    addComment(song_id, user_id, username, comment){
        createComments({ song_id, user_id,username,comment}).then(()=>{
            window.location.reload();
        })
    }

    editComment(id, comment ){
        console.log({ comment: comment })
        updateComment(id,comment).then(()=>{
            window.location.reload();
        })
    }

    deleteComment(id){
        deleteComment(id).then(()=>{
            window.location.reload();
        })
    }

    onChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    onOpenModal(id, comment) {
        console.log("Comment", comment)
        this.setState({ open: true, editId: id, editComment: comment });
      }
      
      onCloseModal() {
        this.setState({ open: false });
      }

    render() {
        console.log(this.state)
        const { comments, user, open, close } = this.state;
        return (
            <div className="text-center">
                <h1><span class="spanListen" />Listen to {this.state.song.name}</h1>
                <div className='playerContainer'></div>

                <audio id="player" src={this.state.url}></audio>
                <div id='musicBtns'> 
                    <button id="playBtn"onClick={this.playMusic}>Play</button> 
                    <button id="pauseBtn" onClick={this.pauseMusic}>Pause</button> 
                </div>
                <br />

                <div>
                   {this.state.user && <div>
                        <textarea name="comment" onChange={this.onChange}></textarea> 
                        <br /> 
                        <button onClick={()=>{ this.addComment( parseInt(this.state.songId), parseInt(this.state.user.id),this.state.user.name,this.state.comment)}}>Add Comment</button> 
                    </div> 
                   }
                </div>
                <br />
                <div>
                    <h4>Comments</h4>
                    {comments.length > 0 && comments.map((comment)=>{
                        const options = {  hour: 'numeric', minute: 'numeric', weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
                        let date = new Date(comment.created_at).toLocaleDateString("en-US", options)
                        return(
                            <div>
                           User {comment.username} said 
                            <p> { comment.comment } </p> on <p> {date} </p>
                            { user && user.id == comment.user_id && 
                            <p>
                                <button type="button" onClick={()=>{this.onOpenModal(comment.id, comment.comment)}} >Edit</button> 
                                <button onClick={()=>{ this.deleteComment(comment.id)}}>x</button>
                            </p> 
                            }
                            <br />
                            <br />
                        </div>)
                    })}
                </div>
                <Modal open={open} onClose={this.onCloseModal} showCloseIcon>
                    <div>
                    <br />
                    <br />
                        <textarea name="editComment" value={this.state.editComment} onChange={this.onChange}></textarea> 
                        <br />
                        <br />
                        <button onClick={()=>{ this.editComment(this.state.editId, this.state.editComment)}}>Edit Comment</button> 
                    </div>
                </Modal>
            </div>    
        )    
    }
 }

export default ViewSong;