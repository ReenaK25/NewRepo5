import React, { Component } from 'react';
import axios from 'axios';
import { Button, Form, Modal,Icon } from 'semantic-ui-react';

export default class UpdateStore extends Component {
   constructor(props) {
      super(props);
   }

   updateStore = () => {
      axios
         .put(`Stores/PutStore/${this.props.storeId}`, {
            name: this.props.storeName,
            address: this.props.storeAddress,
            id: this.props.storeId,
         })
         .then((res) => {
            this.props.reloadStores();
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
               <Modal.Header>Edit Store</Modal.Header>
               <Modal.Content>
                  <Modal.Description>
                     <Form>
                        <Form.Field>
                           <label>Store Name</label>
                           <input placeholder='' value={this.props.storeName} onChange={(e) => this.props.updateStoreName(e.target.value)} />
                        </Form.Field>
                        <Form.Field>
                           <label>Address</label>
                           <input
                              placeholder=''
                              value={this.props.storeAddress}
                              onChange={(e) => this.props.updateStoreAddress(e.target.value)}
                           />
                        </Form.Field>
                     </Form>
                  </Modal.Description>
               </Modal.Content>
               <Modal.Actions>
               <Button color='black' onClick={() => this.props.openEditModal(false)}>
                     Cancel
                  </Button>
                  <Button color='green' onClick={this.updateStore} icon labelPosition='right'>
                     Update<Icon link name='check' />  
                  </Button>
                  
               </Modal.Actions>
            </Modal>
         </div>
      );
   }
}
