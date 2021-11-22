import React, { Component } from 'react';
import axios from 'axios';
import { Button, Form, Modal,Icon } from 'semantic-ui-react';

export default class UpdateProduct extends Component {
   constructor(props) {
      super(props);
   }

   updateProduct = () => {
      axios
         .put(`Products/PutProduct/${this.props.productId}`, {
            name: this.props.productName,
            price: this.props.productPrice,
            id: this.props.productId,
         })
         .then((res) => {
            this.props.reloadProducts();
            this.props.openEditModal(false);
         })
         .catch((err) => {
            alert(err);
         });
   };

   render() {
      return (
         <div className='modal'>
            <Modal open={this.props.open}>
               <Modal.Header>Edit Product</Modal.Header>
               <Modal.Content>
                  <Modal.Description>
                     <Form>
                        <Form.Field>
                           <label>Product Name</label>
                           <input placeholder='' value={this.props.productName} onChange={(e) => this.props.updateProductName(e.target.value)} />
                        </Form.Field>
                        <Form.Field>
                           <label>Price</label>
                           <input
                              placeholder=''
                              value={this.props.productPrice}
                              onChange={(e) => this.props.updateProductPrice(e.target.value)}
                           />
                        </Form.Field>
                     </Form>
                  </Modal.Description>
               </Modal.Content>
               <Modal.Actions>
               <Button color='black' onClick={() => this.props.openEditModal(false)}>
                     Cancel
                  </Button>
                  <Button color='green' onClick={this.updateProduct} icon labelPosition='right'>
                     Update<Icon link name='check' />  
                  </Button>
                 
               </Modal.Actions>
            </Modal>
         </div>
      );
   }
}
