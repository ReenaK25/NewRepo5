import React, { Component } from 'react';
import { Button, Form, Modal,Icon } from 'semantic-ui-react';
import axios from 'axios';

export default class CustomerDeleteModal extends Component {
   constructor(props) {
      // id, open, openCallback
      super(props);
   }

   deleteCustomer = (id) => {
      axios
         .delete(`Customers/DeleteCustomer/${id}`)
         .then((res) => {
            this.props.reloadCustomers();
            this.props.openDeleteModal(false);
         })
         .catch((err) => {
            console.log(err);
         });
   };
   render() {
      return (
         <div className='modal'>
            <Modal open={this.props.open}>
               <Modal.Header>Delete Customer</Modal.Header>
               <Modal.Content>
                  <p>Are you sure?</p>
               </Modal.Content>
               <Modal.Actions>
               <Button color='black' onClick={() => this.props.openDeleteModal(false)}>
                     Cancel
                  </Button>
                  <Button color='red' onClick={() => this.deleteCustomer(this.props.customerId)}icon labelPosition='right'>
                     delete <Icon link name='times' />  
                  </Button>
                  
               </Modal.Actions>
            </Modal>
         </div>
      );
   }
}
