import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import * as actions from "../../actions";
import Preloader from "../Preloader";

class index extends Component {

  constructor(props) {
    super(props);
    this.state = {
      hauls: null,
    }
  }

  componentWillMount() {
    const { auth } = this.props;
    this.props.fetchHauls(auth.uid);
  }

  render() {
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
      <div className="to-do-list-container">
        {this.props.data && _.toArray(this.props.data).map((haul) => (
          <a href={`/haul/${haul.id}`}><h1>{haul.title}</h1></a>
        )) }
        <div className="fixed-action-btn">
          <button
            onClick={this.props.signOut}
            id="sign-out-button"
            className="btn-floating btn-large teal darken-4"
          >
            <i className="large material-icons">exit</i>
          </button>
          <button onClick={() => console.log(_.toArray(this.props.data))}>sssss</button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ data, auth }) => {
  return {
    data,
    auth
  };
};

export default connect(mapStateToProps, actions)(index);
