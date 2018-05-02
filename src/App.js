import React, { Component } from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import Home from './components/home/Home';
import NewPost from './components/newpost/NewPost';
import './css/nav.css'
import backTri from './img/triangle.svg'
import searchIcon from './img/search.svg'
import trifecta from './img/whiteline.svg'
import addSvg from './img/add.svg'

class App extends Component {
  constructor(){
    super()
    this.state = {
      isSearch: false,
      isPosting: false
    }
    this.toggleSearch = this.toggleSearch.bind(this)
    this.togglePost = this.togglePost.bind(this)
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
          <img className={this.state.isPosting ? "new-post-btn-tilted new-post-btn" : "new-post-btn"} src={addSvg} onClick={this.togglePost}/>
          <div className={this.state.isPosting ? "new-post-component" : "hideupay"}>
            <NewPost/>
          </div>
          <Route path='/' component={Home} exact/>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;