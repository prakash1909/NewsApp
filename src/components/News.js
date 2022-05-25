import React, { Component } from "react";
import NewsItem from "./NewsItem";
import SpinnerComp from "./SpinnerComp";
export class News extends Component {

  constructor() {
    super();
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      
    }
  }
  async componentDidMount() {
    this.setState({loading:true});
    let url =
      `https://newsapi.org/v2/top-headlines?country=in&apiKey=ecf784631a0345e98edc2640c7f7365a&page=1&pagesize=${this.props.pageSize}`;
    let result = await fetch(url);
    let data = await result.json();

    this.setState({ articles: data.articles ,totalResults:data.totalResults,loading:false});
    //return data;
  }
   handleNextClick=async () =>{
    this.setState({loading:true});
    console.log(this.state.page+1);
    if(this.state.page+1>Math.ceil((this.state.totalResults)/this.props.pageSize))
    {

    }
    else{
    let num=this.state.page+1;
    console.log(num);
    let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=ecf784631a0345e98edc2640c7f7365a&page=${num}&pageSize=${this.props.pageSize}`;
  let result = await fetch(url);
  let data = await result.json();
   this.setState({
     page:this.state.page+1,
     articles:data.articles,
     loading:false
   })}
  }
   handlePrevClick=async ()=> {
    this.setState({loading:true});
    console.log("prev buton clicked");
    let num=this.state.page-1;
    let url =`https://newsapi.org/v2/top-headlines?country=in&apiKey=ecf784631a0345e98edc2640c7f7365a&page=${num}&pageSize=${this.props.pageSize}`;
  let result = await fetch(url);
  // console.log(result);
  let data = await result.json();
   this.setState({
     page:this.state.page-1,
     articles:data.articles,
     loading:false
   })
  }

  render() {
    return (
      <div>
        <div className="container">
          {this.state.loading && <SpinnerComp/>}
         {!this.state.loading &&  <h1 className="text-center" style={{ color: "white" }}>NewsPigeon-The News Carrier</h1>}
        { !this.state.loading &&  <h1 style={{ color: "white" }}>Top Headlines</h1>}
          <div className="row">
            {!this.state.loading && this.state.articles.map((element) => {
              return (
                <div className="col md-3" key={element.url}>
                  <NewsItem
                    title={element.title}
                    description={element.description}
                    imageUrl={
                      element.urlToImage
                        ? element.urlToImage
                        : "https://images.news18.com/ibnlive/uploads/2022/03/2022-03-09t042643z_1_lynxmpei28066_rtroptp_4_markets-india-stocks-164681548916x9.jpg"
                    }
                    newsUrl={element.url}
                  />
                </div>
              );
            })}
          </div>
        </div>
      { !this.state.loading && <div className="container d-flex justify-content-between">
          <button
            type="button"
            className="btn-dark btn"
            onClick={this.handlePrevClick}
            disabled={this.state.page<=1}
          >
            &larr; Previous
          </button>
          <button
          disabled={this.state.page+1>Math.ceil((this.state.totalResults)/this.props.pageSize)}
            type="button"
            className="btn-dark btn"
            onClick={this.handleNextClick}
          >
            Next &rarr;
          </button>
        </div>}
      </div>
    );
  }
}

export default News;
