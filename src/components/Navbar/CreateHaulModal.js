import React, { Component } from 'react'
import { Button, Modal } from 'react-bootstrap';

export default class CreateHaulModal extends Component {
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
            Create Haul
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div id="todo-add-form" className="col s10 offset-s1">
          <form>
            <div className="input-field">
              <i className="material-icons prefix">add</i>
              <input
                value={this.props.addFormValue}
                onChange={this.props.handleInputChange}
                id="toDoNext"
                type="text"
              />
              <label>
                Private?
                <input type="checkbox" name="haulPrivate" onChange={this.props.handleCheckBoxChange} defaultChecked={this.props.isPrivate} value={this.props.isPrivate}/>
              </label>
            </div>
          </form>
        </div>
        </Modal.Body>
        <Modal.Footer>
          {/* <Button onClick={this.props.onHide}>Close</Button> */}
          <Button onClick={this.props.handleFormSubmit}>add</Button>
        </Modal.Footer>
      </Modal>
    )
  }
}
