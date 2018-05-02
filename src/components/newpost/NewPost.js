import React, { Component } from 'react';
import axios from 'axios';
import Dropzone from 'react-dropzone';
import '../../css/newpost.css';
import addSvg from '../../img/add.svg';

export default class NewPost extends Component {
  constructor(){
    super()
    this.state = {
      categories: [{category: "Technology"}],
      catPos: 0,
      addedCat: '',
      showCatInput: false,
      categoryInputValue: '',
      titleInputValue: '',
      authorInputValue: '',
      descriptionInputValue: '',
      contentInputValue: '',
      sendingPost: false,
      categorySelected: null,
      files: null,
      imgurl: ""
    }
    this.selectCat = this.selectCat.bind(this)
    this.toggleInput = this.toggleInput.bind(this)
    this.handleAdd = this.handleAdd.bind(this)
    this.updateCategoryInputValue = this.updateCategoryInputValue.bind(this)
    this.updateTitleInputValue = this.updateTitleInputValue.bind(this)
    this.updateAuthorInputValue = this.updateAuthorInputValue.bind(this)
    this.updateDescriptionInputValue = this.updateDescriptionInputValue.bind(this)
    this.updateContentInputValue = this.updateContentInputValue.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.reselectCat = this.reselectCat.bind(this)
  }
  componentDidMount(){
    axios.get('/api/getCategories')
      .then((response) => {
        this.setState({
          categories: response.data,
          categorySelected: this.state.categories[0].category
        })
        console.log(this.state.categories)
      })
  }

  onDrop(files) {
    let file = files[0]
    let filename = file.name
    this.setState({
      files: files
    })
    let filesTS = {
      filename: filename,
      filetype: file.type
    }
    
    axios.post('http://localhost:3535/api/getSignedURL', filesTS)
    .then((response) => {
      const signedRequest = response.data.signedRequest;
      const url = response.data.url;
      let options = {
        headers: {
          'Content-Type': file.type
        }
      };
      axios.put(signedRequest, file, options)
      .then((result) => {
        console.log(result)
        this.setState({
          imgurl: url
        })
      })
      .catch((err) => {
        console.log(err)
      })
    })
  }


  componentDidUpdate(){
    console.log(this.state.files)
    // console.log(this.state.catPos)
    // console.log(this.state.categorySelected)
  }


  selectCat(e){
    this.setState({
      catPos: parseInt(e.target.dataset.index)
    }, () => {
      this.setState({
        categorySelected: this.state.categories[this.state.catPos].category
      })
    })
  }
  toggleInput(){
    this.setState({showCatInput: true})
  }
  handleAdd(){
    if(this.state.showCatInput === true && this.state.categoryInputValue){
      let inLower = this.state.categoryInputValue.toLowerCase()
      let strFirst = inLower[0].toUpperCase()
      this.setState({
        categorySelected: strFirst + inLower.split("").splice(1,inLower.length).join(""),
        addedCat: strFirst + inLower.split("").splice(1,inLower.length).join("")
      })
    }
  }


  updateCategoryInputValue(e){
    this.setState({
      categoryInputValue: e.target.value
    });
  }
  updateTitleInputValue(e){
    this.setState({
      titleInputValue: e.target.value
    })
  }
  updateAuthorInputValue(e){
    this.setState({
      authorInputValue: e.target.value
    })
  }
  updateDescriptionInputValue(e){
    this.setState({
      descriptionInputValue: e.target.value
    })
  }
  updateContentInputValue(e){
    this.setState({
      contentInputValue: e.target.value
    })
  }


  handleSubmit(){
    if(this.state.categorySelected && this.state.titleInputValue && this.state.authorInputValue && this.state.descriptionInputValue && this.state.contentInputValue && this.state.imgurl){
      this.setState({
        sendingPost: true
      })
      axios.post('/api/newPost', {
        title: this.state.titleInputValue,
        author: this.state.authorInputValue,
        date: new Date(),
        description: this.state.descriptionInputValue,
        category: this.state.categoryInputValue ? this.state.categoryInputValue : this.state.categories[this.state.catPos].category,
        content: this.state.contentInputValue
      })
      .then((response) => {
        if(response.status === 200){
          this.setState({
            sendingPost: "success"
          })
          setTimeout(() => {
            window.location.href="/"
          }, 2000); 
        }
      })
      .catch((error) => {
        console.log(error);
      });
    }
  }

  reselectCat(){
    if(this.state.categoryInputValue){
      this.setState({
        categorySelected: this.state.categoryInputValue
      })
    }
  }

  render(){
    return(
      <div className="newpost-container">
        <div className="newpost-header">
          <div className="bar bar-left"></div>
          <div>
            <div className="newpost-title">New Post</div>
            <div className="newpost-subtitle subtitle">Speak yo mind.</div>
          </div>
          <div className="bar bar-right"></div>
        </div>
        <div className="input-title-container">
          <div className="title-text">
            <div className="input-title">Title</div>
            <div className="input-subtitle">Dear God, no clickbait. (80 character maximum)</div>
          </div>
          <input value={this.state.titleInputValue} onChange={e => this.updateTitleInputValue(e)} placeholder="Type your title here." type="text" className={this.state.titleInputValue ? "newpost-input" : "newpost-input unfilled"} maxLength="80"/>
        </div>
        <div className="input-title-container">
          <div className="title-text">
            <div className="input-title">Author</div>
            <div className="input-subtitle">Alias that b. (40 character maximum)</div>
          </div>
          <input value={this.state.authorInputValue} onChange={e => this.updateAuthorInputValue(e)} placeholder="Type your name here." type="text" className={this.state.authorInputValue ? "newpost-input" : "newpost-input unfilled"} maxLength="40"/>
        </div>
        <div className="input-title-container">
          <div className="title-text">
            <div className="input-title">Description</div>
            <div className="input-subtitle">Brief synapsis of what the article explores. (150 character maximum)</div>
          </div>
          <input value={this.state.descriptionInputValue} onChange={e => this.updateDescriptionInputValue(e)} placeholder="Type your description here." type="text" className={this.state.descriptionInputValue ? "newpost-input" : "newpost-input unfilled"} maxLength="150"/>
        </div>
        <div className="category-container">
          <div className="title-text">
            <div className="input-title">Category</div>
            <div className="input-subtitle">Scroll to find an existing category or create a new one. (20 character maximum)</div>
          </div>
          {
            this.state.categories.map((cat, i) => {
              return (
                <div key={i} data-index={i} onClick={this.selectCat} className={i === this.state.catPos && this.state.categorySelected !== this.state.categoryInputValue ? "category category-red" : "category"}>
                  <div data-index={i} onClick={this.selectCat} className="category-title">
                    {cat.category}
                  </div>
                </div>
              )
            })
          }

          
          <div onClick={this.reselectCat} className={this.state.categorySelected === this.state.categoryInputValue ? "category category-red" : "category category-adder"}>
            <div onClick={this.toggleInput} className={this.state.addedCat ? "nodisplay" : "addCat"}>
              <div className={this.state.showCatInput ? "add-input-container" : "nodisplay"}>
                <input value={this.state.categoryInputValue} onChange={e => this.updateCategoryInputValue(e)} maxLength="20" placeholder="Category name." className="add-input" type="text"/>
              </div>
            </div>
            <div className={this.state.addedCat ? "category-title" : "nodisplay"}>
              {this.state.addedCat}
            </div>
          </div>

          <div className="catAddSvg" onClick={this.handleAdd}>
            <img src={addSvg} className="small-add-svg"/>
          </div>


        </div>
        <div className="input-title-container">
          <div className="title-text">
            <div className="input-title">Content</div>
            <div className="input-subtitle">Type your pretty little heart out. (50000 character maximum)</div>
          </div>
          <textarea value={this.state.contentInputValue} onChange={e => this.updateContentInputValue(e)} placeholder="Type your content here." type="text" id="fatty" className={this.state.contentInputValue ? "newpost-input" : "newpost-input unfilled"} maxLength="50000"/>
        </div>
        <div className="input-title-container">
          <div className="title-text">
            <div className="input-title">Thumbnail</div>
            <div className="input-subtitle">Drop a file here, or click to select a file to upload.</div>
          </div>
          <div className={this.state.files ? "dropzone-container" : "dropzone-container unfilled"}>
            <Dropzone className="dropzone" accept="image/*" onDrop={this.onDrop.bind(this)}>
              <div className="dropzone-description">
                <img src={addSvg} className="add-svg drop-add"/>
              </div>
            </Dropzone>
          </div>
        </div>
        
        <div className="submit-container">
          <button className="submit-btn"  onClick={this.handleSubmit} disabled={!this.state.categorySelected || !this.state.titleInputValue || !this.state.authorInputValue || !this.state.descriptionInputValue || !this.state.contentInputValue || !this.state.imgurl}>SUBMIT</button>
        </div>
        <div className={this.state.sendingPost ? "sending-post" : "nodisplay"}>{this.state.sendingPost === "success" ? "SUCCESS" : "Submitting..."}</div>
      </div>
    )
  }
}