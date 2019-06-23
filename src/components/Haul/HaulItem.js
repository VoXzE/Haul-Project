import React, { Component } from 'react'
import { connect } from "react-redux";
import * as actions from "../../actions";

class HaulItem extends Component {

  removeItem = (itemID) => {
    this.props.removeHaulItem(this.props.haulID, itemID);
  }

  render() {
    const { auth, data, item } = this.props;

    return (
      <div className="card" style={{width: "18rem"}}>
        <img src="https://gd2.alicdn.com/imgextra/i1/3822376655/TB2zXLDb4SYBuNjSsphXXbGvVXa_!!3822376655.jpg" className="card-img-top" alt="..."/>
        <div className="card-body">
          <h5 className="card-title">{item.name}</h5>
          <p className="card-text">Cost: {item.price} Size: {item.size}, weight: {item.weight}</p>
          {auth && auth.uid === data.uid &&
            <a href="#" className="btn btn-primary" onClick={() => this.removeItem(item.id)}>Remove Item</a>
          }
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ data, auth }) => {
  return {
    data,
    auth
  };
};

export default connect(mapStateToProps, actions)(HaulItem);