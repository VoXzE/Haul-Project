import React, { Component } from 'react'
import { connect } from 'react-redux';
import * as actions from '../../actions';
import AddItemModal from './AddItemModal';
import HaulItem from './HaulItem';
import Preloader from '../Preloader';
import _ from "lodash";
import { withRouter } from "react-router-dom";

class ShowHaul extends Component {

  constructor(props) {
    super(props);
    this.state = {
      modalShow: false,
      items: _.toArray(this.props.data.items)
    }
  }

  modalClose = () => {
    this.setState({ modalShow: false });
  }

  deleteHaul = () => {
    const { data, deleteHaul } = this.props;
    deleteHaul(data.id);
  }

  render() {
    const { auth, data } = this.props;
    const { items } = this.state;

    if (data === "loading") {
      return (
        <div className="row center-align">
          <div className="col s4 offset-s4">
            <Preloader />
          </div>
        </div>
      );
    }

    return (
      <div className="haul">
        <h1 className="haul-title">My Awesome Haul!</h1>
        <div className="row haul">
          {items && items.map((item) => (
            <HaulItem item={item} data={data} haulid={this.props.haulid} key={item.id}/>
          ))}
        </div>
          {auth && auth.uid === data.uid &&
            <React.Fragment>
              <a className="btn btn-primary" onClick={() => this.setState({ modalShow: true })}>Add some items to get started!</a>
              <a className="btn btn-danger" onClick={this.deleteHaul}>Delete haul</a>
            </React.Fragment>
          }
          <AddItemModal
            show={this.state.modalShow}
            onHide={this.modalClose}
            haulid={this.props.haulid}
          />
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

export default withRouter(connect(mapStateToProps, actions)(ShowHaul));