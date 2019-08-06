import React, { Component } from 'react'
import { connect } from "react-redux";
import * as actions from "../../actions";
import Preloader from "../Preloader";
import CreateHaulModal from "./CreateHaulModal";
import { withRouter, NavLink } from "react-router-dom";
import * as ROUTES from "../../lib/Routes";

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
            <li className="nav-item">
              <NavLink to={ROUTES.HOME}>My Hauls</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to={ROUTES.DISCOVER}>Discover</NavLink>
            </li>
          </ul>
          {auth && 
          <React.Fragment>
            <button className="btn btn-blue my-2 my-sm-0" onClick={this.handleCreateHaul}>
              {/* <i className="fas fa-plus"></i> */}
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
