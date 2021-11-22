import React, {useState} from 'react';
import { Button, Header, Image, Modal, Form, Icon } from 'semantic-ui-react';
import axios from "axios";

function CreateStore(props) {
 // const [open, setOpen] = React.useState(false)
 const {open, openCreateModal, fetchstaff } =props;

const [name, setName] = useState("");
const [address, setAddress] = useState("");

  const createStaff =() =>
  {
      axios
      .post("Stores/PostStore",{
          name:name,
          address:address

      })
      .then(res =>{
        openCreateModal(false);
        setName("");
        setAddress("");
        fetchstaff(); 
      })
      .catch(err =>{
        alert(err);
      });
  };


  return (
    <Modal
      open={open}>
      <Modal.Header>Create Store</Modal.Header>
      <Modal.Content>
        <Modal.Description>
         <Form>
    <Form.Field>
      <label>Name</label>
      <input placeholder="Name" onChange={(e) => setName(e.target.value)} />
    </Form.Field>
    <Form.Field>
      <label>Address</label>
      <input placeholder="Address" onChange={(e) => setAddress(e.target.value)} />
    </Form.Field>
    
  </Form>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button color='black' onClick={() => openCreateModal(false)}>
          Cancel
        </Button>
        <Button color="green" onClick={createStaff} icon labelPosition='right'> Create <Icon enabled name='checkmark'/></Button>        
      </Modal.Actions>
    </Modal>
  )
}

export default CreateStore