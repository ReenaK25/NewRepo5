import React, { Component } from 'react';
import { Button, Form, Modal,Icon } from 'semantic-ui-react';
import axios from 'axios';

export default class ProductDeleteModal extends Component {
   constructor(props) {
      // id, open, openCallback
      super(props);
   }

   deleteProduct = (id) => {
      axios
         .delete(`Products/DeleteProduct/${id}`)
         .then((res) => {
            this.props.reloadProducts();
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
               <Modal.Header>Delete Product</Modal.Header>
               <Modal.Content>
                  <p>Are you sure?</p>
               </Modal.Content>
               <Modal.Actions>
               <Button color='black' onClick={() => this.props.openDeleteModal(false)}>
                     Cancel
                  </Button>
                  <Button color='red' onClick={() => this.deleteProduct(this.props.productId)} icon labelPosition="right"> 
                     delete <Icon link name='times' />  
                  </Button>
                  
               </Modal.Actions>
            </Modal>
         </div>
      );
   }
}
