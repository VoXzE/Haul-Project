import React, { Component } from 'react'
import { connect } from "react-redux";
import * as actions from "../../actions";
import AddItemModal from "./AddItemModal";

class HaulEmpty extends Component {

  constructor(props) {
    super(props);
    this.state = {
      modalShow: false,
    }
  }

  modalClose = () => {
    this.setState({ modalShow: false });
  }

  render() {
    const { data, auth } = this.props;

    return (
      <div>
        <div className="col">
          <h4>Haul does not have any items in it yet...</h4>
          {auth && auth.uid === data.uid &&
            <a href="#" className="btn btn-primary" onClick={() => this.setState({ modalShow: true })}>Add some items to get started!</a>
          }
        </div>
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

export default connect(mapStateToProps, actions)(HaulEmpty);