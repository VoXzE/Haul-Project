import React, { Component } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { connect } from 'react-redux';
import { addHaulItem } from '../../actions';

class AddItemModal extends Component {

  constructor(props) {
    super(props);
    this.state = {
      itemName: "",
      itemPrice: "",
      itemWeight: "",
      itemSize: "",
      itemLink: "",
      images: null,
      imageUploading: false,
    }
  }

  onChangeText = (event) => {
    this.setState({ [event.target.name]: [event.target.value]})
  }

  addItem = () => {
    const { itemName, itemPrice, itemSize, itemWeight, itemLink, images } = this.state;
    const data = {
      name: `${itemName}`,
      price: `${itemPrice}`,
      size: `${itemSize}`,
      weight: `${itemWeight}`,
      link: `${itemLink}`,
    }
    this.props.addHaulItem(this.props.haulid, data, images)
  }

  uploadImage = (event) => {
    this.setState({ images: event.target.files })
  }


  render() {
    return (
      <Modal
        {...this.props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Add new item
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <input type="file" onChange={this.uploadImage}/>
            <label>
              Name:
              <input type="text" placeholder="Enter product name.." name="itemName" onChange={this.onChangeText} />
            </label>
            <label>
              Price:
              <input type="text" placeholder="Enter product name.." name="itemPrice" onChange={this.onChangeText} />
            </label>
            <label>
              Weight:
              <input type="text" placeholder="Enter product name.." name="itemWeight" onChange={this.onChangeText} />
            </label>
            <label>
              Size:
              <input type="text" placeholder="Enter product name.." name="itemSize" onChange={this.onChangeText} />
            </label>
            <label>
              Name:
              <input type="text" placeholder="Enter product name.." name="itemLink" onChange={this.onChangeText} />
            </label>
          </form>
        </Modal.Body>
        <Modal.Footer>
          {/* <Button onClick={this.props.onHide}>Close</Button> */}
          <Button onClick={this.addItem}>add</Button>
        </Modal.Footer>
      </Modal>
    )
  }
}


const mapStateToProps = ({ data, auth }) => {
  return {
    data,
    auth
  };
};

export default connect(mapStateToProps, {addHaulItem})(AddItemModal);