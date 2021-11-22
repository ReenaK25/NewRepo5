import React, {Component, Fragment} from "react";
import { Icon, Label, Menu, Table, Button } from 'semantic-ui-react';
import axios from "axios";
import UpdateStore from"./UpdateStore";
import StoresDeleteModal from"./StoresDeleteModal";

export default class StoreTable extends Component{
  
  constructor(props)
  {
      super(props);
        
        this.state={
         openDeleteModal: false,
          openEditModal: false,
          selectedStore: undefined,
          selectedStoreName: undefined,
          selectedStoreAddress: undefined,
          storesPerPage: undefined,
      };
    

  }
  updateStoreName =(storeName) =>
  {
    this.setState({selectedStoreName:storeName})
  }
  updateStoreAddress =(storeAddress) =>
  {
    this.setState({selectedStoreAddress:storeAddress})
  }
 openEditModal= (storeId,storeName,storeAddress) =>
  {
      this.setState({
        openEditModal:storeId?true:false,
        selectedStore:storeId,
        selectedStoreName:storeName,
        selectedStoreAddress:storeAddress,
      });
  };
 /* deleteCustomer = (id) =>  {
    axios.delete(`Customers/DeleteCustomer/${id}`)
    .then(res =>{
     // refresh();

    })
    .catch(err => {
      console.log(err);
    })
  }; */

  openDeleteModal = (storeId) => {
    this.setState({
       openDeleteModal: storeId ? true : false,
       selectedStore: storeId,
    });
 };

 prevPageIcon() {
  if (this.props.pageNumber > 1) {
     return (
        <Fragment>
           <Label
              className='cursor'
              color='blue'
              onClick={() => this.props.fetchStoresAgain(this.props.storesPerPage, false, false, false, true)}
           >
              <Icon fitted name='arrow left' />
           </Label>
        </Fragment>
     );
  } else return ' ';
}

pageNumberIcon() {
  return <Label color='blue'>{this.props.pageNumber}</Label>;
}

nextPageIcon() {
  if (this.props.totalStores > this.props.storesPerPage * this.props.pageNumber) {
     return (
        <Fragment>
           <Label
              className='cursor'
              color='blue'
              onClick={() => this.props.fetchStoresAgain(this.props.storesPerPage,false, false, true, false)}
           >
              <Icon fitted name='arrow right' />
           </Label>
        </Fragment>
     );
  } else return ' ';
}

nameIsSortIcon() {
  if (this.props.nameIsSortAsc === true) {
     return (
        <Fragment>
           <Icon fitted name='sort ascending' />
        </Fragment>
     );
  } else if (this.props.nameIsSortDesc === true) {
     return (
        <Fragment>
           <Icon fitted name='sort descending' />
        </Fragment>
     );
  } else return <Icon fitted name='sort' />;
}

addressIsSortIcon() {
  if (this.props.addressIsSortAsc === true) {
     return (
        <Fragment>
           <Icon fitted name='sort ascending' />
        </Fragment>
     );
  } else if (this.props.addressIsSortDesc === true) {
     return (
        <Fragment>
           <Icon fitted name='sort descending' />
        </Fragment>
     );
  } else return <Icon fitted name='sort' />;
}

  render()
  {
    const { openEditModal } =
    this.state;

    
    return (
      <div style={{margin: "30px auto",boxSizing:"border-box",width: "1500px", minHeight: "200px"}}>
      <Table celled>
      <Table.Header>
                  <Table.Row>
                     <Table.HeaderCell onClick={() => this.props.fetchStoresAgain(this.props.storesPerPage, false, true, false, false)}>
                <div className='cursor'>Name {this.nameIsSortIcon()}</div>
                     </Table.HeaderCell>
                     <Table.HeaderCell onClick={() => this.props.fetchStoresAgain(this.props.storesPerPage,false,true, false,false)}>
                    <div className='cursor'>Address {this.addressIsSortIcon()}</div>
                     </Table.HeaderCell>
                     <Table.HeaderCell>Action</Table.HeaderCell>
                     <Table.HeaderCell>Action</Table.HeaderCell>
                  </Table.Row>
               </Table.Header>


    <Table.Body>
        
        { this.props.stores.map((s) => {
        //some logic
        return (
            <Table.Row key={s.id}>
            <Table.Cell>{s.name}</Table.Cell>
            <Table.Cell>{s.address}</Table.Cell>
            <Table.Cell>
              <Button color="yellow" onClick={() =>{
                this.openEditModal(s.id,s.name,s.address);
              }
              
              }>< Icon enabled name='edit outline'/>Edit</Button>
              <UpdateStore 
              
              open={openEditModal}
              openEditModal={this.openEditModal}
              storeId={this.state.selectedStore}
              storeName={this.state.selectedStoreName}
              storeAddress={this.state.selectedStoreAddress}
              updateStoreName={this.updateStoreName}
              updateStoreAddress={this.updateStoreAddress}
              
              reloadStores={this.props.refresh}
              /> 
          
              </Table.Cell>
            <Table.Cell>
            <Button color='red' onClick={() => this.openDeleteModal(s.id)}><Icon enables name='trash'/>Delete</Button></Table.Cell>
            <StoresDeleteModal
               open={this.state.openDeleteModal}
               storeId={this.state.selectedStore}
               openDeleteModal={this.openDeleteModal}
               reloadStores={this.props.refresh}
            />
          </Table.Row>
        );
       })}
       </Table.Body> 
       </Table>
       <div>
               <table border='0' width='100%'>
                  <thead>
                     <tr>
                        <th align='left'>
                           &nbsp;
                           <select
                              name='TotalRecordsPerPage'
                              id='TotalRecordsPerPage'
                              defaultValue='10'
                              onChange={(e) => this.props.fetchStoresAgain(e.target.value, false, false, false, false)}
                           >
                              <option value='5' name='5'>
                                 &nbsp;5&nbsp;
                              </option>
                              <option value='10' name='10'>
                                 &nbsp;10&nbsp;
                              </option>
                              <option value='20' name='20'>
                                 &nbsp;20&nbsp;
                              </option>
                           </select>
                        </th>
                        <th align='right'>
                           {this.prevPageIcon()}
                           {this.pageNumberIcon()}
                           {this.nextPageIcon()}
                           &nbsp;
                        </th>
                     </tr>
                  </thead>
               </table>
            </div>
       
       </div>
       )
      
  };
}