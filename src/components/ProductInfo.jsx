import React from 'react';
import ReactDOM from 'react-dom';

class ProductInfo extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log(this.props);
    return (
      <div>
        <h2>Product Information:</h2>
        <span>Rating: {this.props.product.rating}</span><br></br>
        <span>Director: {this.props.cast[this.props.cast.length - 1]}</span><br></br>
        <span>Product Dimensions: {this.props.product.dimensions}</span><br></br>
        <span>Aspect Ratio: {this.props.product.aspectRatio}</span><br></br>
        <span>Media Format: {this.props.product.format}</span><br></br>
        <span>Release Date: {this.props.product.releaseDate}</span><br></br>
        <span>Run Time: {this.props.product.runTime}</span><br></br>
        <span>Studio: {this.props.product.studio}</span><br></br>
        <span>Number of discs: {this.props.product.numberOfDisks}</span><br></br>
        <span>Actors: {this.props.cast.map((member, index) => {
          if (index < this.props.cast.length - 2) {
            return member + ', ';
          } else if (index < this.props.cast.length - 1) {
            return member + ' ';
          }
        })}</span>
      </div>
    );
  }
}

export default ProductInfo;