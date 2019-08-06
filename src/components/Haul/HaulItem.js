import React, { Component } from 'react'
import { connect } from "react-redux";
import * as actions from "../../actions";

class HaulItem extends Component {

  removeItem = (itemID) => {
    this.props.removeHaulItem(this.props.haulid, itemID);
  }

  render() {
    const { auth, data, item } = this.props;

    return (
      <div className="col-sm-6">
        <div className="card mb-3" style={{ maxWidth: 540 }}>
          <div className="row no-gutters">
            <div className="col-md-4">
              <img src={item.image} className="card-img" alt="..."/>
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <h5 className="card-title">{item.name}</h5>
                <p className="card-text text-muted">Cost: {item.price} Size: {item.size}, weight: {item.weight}</p>
              </div>
            </div>
            {auth && auth.uid === data.uid &&
              <a href="#" className="btn btn-primary" onClick={() => this.removeItem(item.id)}>Remove Item</a>
            }
          </div>
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