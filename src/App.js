import React, { Component } from 'react';
import { BrowserRouter, Route, Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux'
import axios from 'axios';
import Markdown from 'react-markdown';
import Home from './components/home/Home';
import NewPost from './components/newpost/NewPost';
import Post from './components/post/Post'
import './css/nav.css'
import backTri from './img/triangle.svg'
import searchIcon from './img/search.svg'
import trifecta from './img/whiteline.svg'
import addSvg from './img/add.svg'
import { getPosts } from './ducks/posts'


class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      isSearch: false,
      isPosting: false,
      categories: [{category: "Technology"}]
    }
    this.toggleSearch = this.toggleSearch.bind(this)
    this.togglePost = this.togglePost.bind(this)
  }

  componentDidMount(){
    axios.get('/api/getCategories')
    .then((response) => {
      this.setState({
        categories: response.data
      })
      console.log(this.state.categories)
    })
    axios.post('/api/getPosts', {
      position: (this.state.page - 1) * 25
    })
    .then((response) => {
      console.log(response.data)
      this.setState({posts: response.data})
    })
  }

  toggleSearch(){
    this.setState({
      isSearch: !this.state.isSearch
    })
    this.navSearch.focus();
  }

  togglePost(){
    this.setState({
      isPosting: !this.state.isPosting
    })
  }

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <div className="nav">
            <img src={trifecta} className="trifecta"/>
            <a href="https://brodymacfarlane.io" className="left-nav">
              <img className="back-tri"src={backTri}/>
              Portfolio
            </a>
            <div className="nav-title">Rapport</div>
            <div className="right-nav">
              <div>Newsletter</div>
              <div className="nav-contact">Contact</div>
              <img src={searchIcon} onClick={this.toggleSearch} className={this.state.isSearch ? "search-icon search-icon-black" : "search-icon"}/>
              <input placeholder="Search Keywords" className={this.state.isSearch ? "nav-search" : "hideaway"} ref={(input) => this.navSearch = input} type="text"/>
            </div>
          </div>
          <div className="category-list">
            {this.state.categories.map((category, i) => {
              return (
                <Link to={"/" + category.category}>
                  <div className="category-name">
                    {category.category}
                  </div>
                </Link>
              )
            })}
          </div>
          <img className={this.state.isPosting ? "new-post-btn-tilted new-post-btn" : "new-post-btn"} src={addSvg} onClick={this.togglePost}/>
          <div className={this.state.isPosting ? "new-post-component" : "hideupay"}>
            <NewPost categories={this.state.categories}/>
          </div>
          <Route path='/' component={Home} exact/>
          <Route path='/:category/:post' component={Post}/>
        </div>
      </BrowserRouter>
    );
  }
}

function mapStateToProps(state) {
  return {
      posts: state.posts,
      categories: state.categories
  }
}

export default connect(mapStateToProps, {getPosts})(App);