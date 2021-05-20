import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import ProductInfo from './components/productInfo.jsx';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    let productId = new URL(window.location).pathname.split('/Information/')[1];
    this.state = {
      productId,
      product: {},
      cast: [],
      reviews: []
    };
  }


  componentDidMount() {
    let that = this;
    //If a specific product Id is entered into URL, GET that specific DVD
    if (this.state.productId) {

      axios.get('http://localhost:3001/Information/' + this.state.productId)
        .then((response) =>
          response.json()
        )
        .then((responseData) =>
          that.setState({
            product: JSON.parse(responseData.data),
            cast: JSON.parse(responseData.data.cast)
          })
        )
        .catch(function(error) {
          console.log('ERROR IN AXIOS GET REQUEST', error);
        });

      axios.get('http://localhost:9001/reviews/' + this.state.productId)
        .then((response) =>
          console.log('GETTING REVIEW', response)
        )
        .catch((error) =>
          console.log('ERROR GETTING REVIEW', error)
        );

    } else {
      //Otherwise, render a random DVD's Information
      axios.get('http://localhost:3001/Information/')
        .then(function(response) {
          console.log(response.data);
          that.setState({
            product: response.data,
            cast: response.data.cast
          });
        })
        .catch(function(error) {
          console.log('ERROR IN AXIOS GET REQUEST', error);
        });
    }
  }

  render() {
    return (
      <ProductInfo product = {this.state.product} cast = {this.state.cast}/>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('information'));