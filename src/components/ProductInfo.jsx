import React from 'react';

class ProductInfo extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log(this.props);
    return (
      <div className = "Information">
        <hr></hr>
        <h2>Product Information:</h2>
        <ul>
          <li><span className = "bold">Rating:</span><span> {this.props.product.rating}</span></li><br></br>
          <li><span className = "bold" id ="director">Director: </span><span>{this.props.cast[this.props.cast.length - 1]}</span></li><br></br>
          <li><span className = "bold">Product Dimensions: </span><span>{this.props.product.dimensions}</span></li><br></br>
          <li><span className = "bold">Aspect Ratio: </span><span>{this.props.product.aspectRatio}</span></li><br></br>
          <li><span className = "bold">Media Format: </span><span>{this.props.product.format}</span></li><br></br>
          <li><span className = "bold">Release Date: </span><span>{this.props.product.releaseDate}</span></li><br></br>
          <li><span className = "bold">Run Time: </span><span>{this.props.product.runTime}</span></li><br></br>
          <li><span className = "bold">Studio: </span><span>{this.props.product.studio}</span></li><br></br>
          <li><span className = "bold">Number of discs: </span><span>{this.props.product.numberOfDisks}</span></li><br></br>
          <li><span>{this.props.avgReviews} out of 5 stars. {this.props.totalReviews} ratings</span></li><br></br>
          <li><span className = "bold">Actors: </span><span>{this.props.cast.map((member, index) => {
          if (index < this.props.cast.length - 2) {
            return member + ', ';
          } else if (index < this.props.cast.length - 1) {
            return member + ' ';
          }
        })}</span></li>
        </ul>
        <hr></hr>
      </div>
    );
  }
}

export default ProductInfo;