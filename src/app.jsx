import React from 'react';
import ReactDOM from 'react-dom';
import ProductInfo from './components/productInfo.jsx';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    let productId = new URL(window.location).pathname.split('/');
    let id = productId[productId.length - 1];
    this.state = {
      id,
      product: {},
      cast: [],
      avgReviews: 0,
      totalReviews: 0
    };
    this.host = process.env.HOST || 'localhost';
    this.port = process.env.PROXY_PORT || 3000;
    // this.informationip = 'localhost';
    // this.reviewsip = 'localhost';
  }


  componentDidMount() {
    let that = this;
    axios.get(`http://${this.host}:${this.port}/Information/` + this.state.id)
      .then((responseData) =>
        that.setState({
          product: responseData.data,
          cast: responseData.data.cast
        })
      )
      .catch(function(error) {
        console.log('ERROR IN AXIOS GET REQUEST', error);
      });

    axios.get(`http://${this.host}:${this.port}/averagereview/` + this.state.id)
      .then((response) =>
        that.setState({
          avgReviews: response.data.averageReviews,
          totalReviews: response.data.totalReviews
        })
      )
      .catch((error) =>
        console.log('ERROR GETTING REVIEW', error)
      );
  }


  render() {
    return (
      <ProductInfo product = {this.state.product} cast = {this.state.cast} avgReviews = {this.state.avgReviews} totalReviews = {this.state.totalReviews}/>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('information'));

export default App;