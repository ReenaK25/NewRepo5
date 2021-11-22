import axios from 'axios';
import React, { useState } from 'react';
import { Button, Form, Modal,Icon } from 'semantic-ui-react';
// import { Modal } from 'react-bootstrap';

function CreateCustomer(props) {
   //    const [open, setOpen] = React.useState(false);
   const { open, openCreateModal, fetchCustomer } = props;
   const [name, setName] = useState('');
   const [address, setAddress] = useState('');

   const createCustomer = () => {
      axios
         .post('Customers/PostCustomer', {
            name: name,
            address: address,
         })
         .then((res) => {
            openCreateModal(false);
            setName('');
            setAddress('');
            fetchCustomer();
         })
         .catch((err) => {
            alert(err);
         });
   };

   return (
      <div className='modal'>
         <Modal open={open}>
            <Modal.Header>Create Customer</Modal.Header>
            <Modal.Content>
               {/* <Modal.Body> */}
               <Modal.Description>
                  <Form>
                     <Form.Field>
                        <label>Customer Name</label>
                        <input placeholder='' onChange={(e) => setName(e.target.value)} />
                     </Form.Field>
                     <Form.Field>
                        <label>Address</label>
                        <input placeholder='' onChange={(e) => setAddress(e.target.value)} />
                     </Form.Field>
                  </Form>
               </Modal.Description>
            </Modal.Content>
            {/* </Modal.Body> */}
            <Modal.Actions>
            <Button color='black' onClick={() => openCreateModal(false)} >
                  Cancel
               </Button>
               <Button color='green' onClick={() => createCustomer(false)} icon labelPosition='right'>
                  Add<Icon link name='check' />  
               </Button>
               
               
            </Modal.Actions>
         </Modal>
      </div>
   );
}

export default CreateCustomer;
