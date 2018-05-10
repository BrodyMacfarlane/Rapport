import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux'
import { getPosts } from '../../ducks/posts'

class Post extends Component {
  constructor(props){
    super(props)
    this.state = {
      posturl: null,
      content: null
    }
  }
  componentDidMount(){
    this.props.getPosts()
    console.log(this.props)
    console.log(this.state)
  }
  componentDidUpdate(){
    console.log(this.props)
    console.log(this.state)
  }
  render(){
    return(
      <div>What</div>
    )
  }
}

function mapStateToProps(state) {
  return {
      posts: state.posts,
      categories: state.categories
  }
}

export default connect(mapStateToProps, {getPosts})(Post);