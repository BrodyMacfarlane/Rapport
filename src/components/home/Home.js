import React, { Component } from 'react';
import axios from 'axios';
import '../../css/home.css';
import me from "../../img/me.jpeg"

export default class Home extends Component {
  constructor(){
    super()
    this.state = {
      posts: [{title: "", author: ""}],
      page: 1
    }
  }
  componentDidMount(){
    document.title = "Rapport - Home"
    axios.post('/api/getPosts', {
      position: (this.state.page - 1) * 25
    })
    .then((response) => {
      console.log(response.data)
      this.setState({posts: response.data})
    })
  }
  render(){
    return(
      <div className="home-container">
        <div className="big-title-container">
          <div className="Posts-Title">Recent Posts</div>
          <div className="subtitle">The latest & greatest.</div>
        </div>
        <div className="posts-container">
          {
            this.state.posts.map((post, i) => {
              return (
                <div key={i} className="post-preview">
                  <div className="post-thumbnail">
                    <img className="thumb" src={post.img}/>
                  </div>
                  <div className="post-content">
                    <div className="post-title">
                      {post.title}
                    </div>
                    <div className="post-description">
                      {post.description}
                    </div>
                    <div className="post-low">
                      <div className="profile-pic">
                        <img src={me} className="me-pic"/>
                      </div>
                      <div className="post-details">
                        <div className="author">
                          {post.author}
                        </div>
                        <div className="date">
                        {post.date} • {post.ttr} min read
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })
          }
        </div>
      </div>
    )
  }
}