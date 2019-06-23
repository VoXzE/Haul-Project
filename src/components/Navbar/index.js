import React, { Component } from 'react'
import { connect } from "react-redux";
import * as actions from "../../actions";
import Preloader from "../Preloader";
import CreateHaulModal from "./CreateHaulModal";
import { withRouter } from "react-router-dom";

class index extends Component {

  constructor(props) {
    super(props);
    this.state = {
      addFormVisible: false,
      addFormValue: "",
      modalShow: false,
      haulPrivate: false,
    }
  }
  
  handleInputChange = (event) => {
    this.setState({ addFormValue: event.target.value });
  };

  handleCheckBoxChange = (event) => {
    this.setState(({ haulPrivate }) => ({ haulPrivate: !haulPrivate }));
  }

  handleFormSubmit = (event) => {
    const { addFormValue, haulPrivate } = this.state;
    const { createHaul, auth } = this.props;
    event.preventDefault();
    createHaul(`${addFormValue}`, auth.uid, haulPrivate).then((key) => {
      this.setState({ haulPrivate: false, modalShow: false });
      this.props.history.push(`/haul/${key}`);
    });
    this.setState({ addFormValue: "" });
  };

  modalClose = () => {
    this.setState({ modalShow: false });
  }

  

  handleCreateHaul = () => {
    const { addFormVisible, modalShow } = this.state;
    this.setState({ addFormVisible: !addFormVisible, modalShow: !modalShow })
  }
  
  render() {
    const { addFormVisible, modalShow } = this.state;
    const { auth } = this.props;
    if (this.props.data === "loading") {
      return (
        <div className="row center-align">
          <div className="col s4 offset-s4">
            <Preloader />
          </div>
        </div>
      );
    }
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="#">Navbar</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Link</a>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Dropdown
              </a>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <a className="dropdown-item" href="#">Action</a>
                <a className="dropdown-item" href="#">Another action</a>
                <div className="dropdown-divider"></div>
                <a className="dropdown-item" href="#">Something else here</a>
              </div>
            </li>
            <li className="nav-item">
              <a className="nav-link disabled" href="#" tabIndex={-1} aria-disabled="true">Disabled</a>
            </li>
          </ul>
          {auth && 
          <React.Fragment>
            <button className="btn btn-blue my-2 my-sm-0" onClick={this.handleCreateHaul}>
              <i className="fas fa-plus"></i>
              Create Haul
            </button>
            <div className="navbar-avatar">
              <img src={auth.photoURL} alt="profile"/>
            </div>
          </React.Fragment>}
        </div>
        <CreateHaulModal
          show={this.state.modalShow}
          onHide={this.modalClose}
          handleFormSubmit={this.handleFormSubmit}
          handleInputChange={this.handleInputChange}
          addItem={this.addItem}
          addFormValue={this.state.addFormValue}
          handleCheckBoxChange={this.handleCheckBoxChange}
          isPrivate={this.state.haulPrivate}
        />
      </nav>
    )
  }
}



const mapStateToProps = ({ data, auth }) => {
  // console.log(auth);
  return {
    data,
    auth
  };
};

export default withRouter(connect(mapStateToProps, actions)(index));
