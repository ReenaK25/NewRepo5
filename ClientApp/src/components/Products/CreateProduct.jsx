import axios from 'axios';
import React, { useState } from 'react';
import { Button, Form, Modal, Icon } from 'semantic-ui-react';
// import { Modal } from 'react-bootstrap';

function CreateProduct(props) {
   //    const [open, setOpen] = React.useState(false);
   const { open, openCreateModal, fetchProduct } = props;
   const [name, setName] = useState('');
   const [price, setPrice] = useState('');

   const createProduct = () => {
      axios
         .post('Products/PostProduct', {
            name: name,
            price: price,
         })
         .then((res) => {
            openCreateModal(false);
            setName('');
            setPrice('');
            fetchProduct();
         })
         .catch((err) => {
            alert(err);
         });
   };

   return (
      <div className='modal'>
         <Modal open={open}>
            <Modal.Header>Create Product</Modal.Header>
            <Modal.Content>
               {/* <Modal.Body> */}
               <Modal.Description>
                  <Form>
                     <Form.Field>
                        <label>Product Name</label>
                        <input onChange={(e) => setName(e.target.value)} />
                     </Form.Field>
                     <Form.Field>
                        <label>Price</label>
                        <input placeholder='' onChange={(e) => setPrice(e.target.value)} />
                     </Form.Field>
                  </Form>
               </Modal.Description>
            </Modal.Content>
            {/* </Modal.Body> */}
            <Modal.Actions>
            <Button color='black' onClick={() => openCreateModal(false)}>
                  Cancel
               </Button>
               <Button color='green' onClick={() => createProduct(false)} icon labelPosition='right'>
                  Add<Icon link name='check' />  
               </Button>
               
            </Modal.Actions>
         </Modal>
      </div>
   );
}

export default CreateProduct;
