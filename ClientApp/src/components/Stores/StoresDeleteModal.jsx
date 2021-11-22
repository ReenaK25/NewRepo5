import React, { Component } from 'react';
import { Button, Form, Modal,Icon } from 'semantic-ui-react';
import axios from 'axios';

export default class StoreDeleteModal extends Component {
   constructor(props) {
      // id, open, openCallback
      super(props);
   }

   deleteStore = (id) => {
      axios
         .delete(`Stores/DeleteStore/${id}`)
         .then((res) => {
            this.props.reloadStores();
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
               <Modal.Header>Delete Stores</Modal.Header>
               <Modal.Content>
                  <p>Are you sure?</p>
               </Modal.Content>
               <Modal.Actions>
               <Button color='black' onClick={() => this.props.openDeleteModal(false)}>
                     Cancel
                  </Button>
                  <Button color='red' onClick={() => this.deleteStore(this.props.storeId)} icon labelPosition="right">
                     delete <Icon link name="times"/>
                  </Button>
                 
               </Modal.Actions>
            </Modal>
         </div>
      );
   }
}
