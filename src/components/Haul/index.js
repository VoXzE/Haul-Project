import React, { Component } from 'react';
import { connect } from "react-redux";
import * as actions from "../../actions";
import Preloader from "../Preloader";
import _ from "lodash";
import HaulEmpty from "./HaulEmpty";
import ShowHaul from "./ShowHaul";


class index extends Component {

  componentWillMount() {
    this.props.fetchHaul(this.props.match.params.id);
  }

  render() {
    const { data, auth } = this.props;

    if (this.props.data === "loading") {
      return (
        <div className="row center-align">
          <div className="col s4 offset-s4">
            <Preloader />
          </div>
        </div>
      );
    }

    if (!data) {
      return (
        <h1>There is no such haul</h1>
      )
    }

    if (data.isPrivate && (auth) && (auth.uid !== data.uid) || (data.isPrivate && !auth)) {
      return (
        <h1>This haul is private :(</h1>
      )
    }

    if (data && _.isEmpty(data.items)) {
      return <HaulEmpty haulID={this.props.match.params.id}/>
    } else {
      return <ShowHaul haulID={this.props.match.params.id} data={data}/>
    }

  }
}

const mapStateToProps = ({ data, auth }) => {
  return {
    data,
    auth
  };
};

export default connect(mapStateToProps, actions)(index);