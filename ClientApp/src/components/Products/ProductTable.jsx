import React, {Component, Fragment} from "react";
import { Icon, Label, Menu, Table, Button } from 'semantic-ui-react';
import axios from "axios";
import UpdateProduct from"./UpdateProduct";
import ProductDeleteModal from"./ProductDeleteModal";

export default class ProductTable extends Component{
  
  constructor(props)
  {
      super(props);
        
        this.state={
          openDeleteModal: false,
          openEditModal: false,
          selectedProduct: undefined,
          selectedProductName: undefined,
          selectedProductPrice: undefined,
          productsPerPage: undefined,
      };
    

  }
  updateProductName =(productName) =>
  {
    this.setState({selectedProductName:productName})
  }
  updateProductPrice =(productPrice) =>
  {
    this.setState({selectedProductPrice:productPrice})
  }
 openEditModal= (productId,productName,productPrice) =>
  {
      this.setState({
        openEditModal:productId?true:false,
        selectedProduct:productId,
        selectedProductName:productName,
        selectedProductPrice:productPrice,
      });
  };

  openDeleteModal = (productId) => {
    this.setState({
       openDeleteModal: productId ? true : false,
       selectedProduct: productId,
    });
 };

 prevPageIcon() {
  if (this.props.pageNumber > 1) {
     return (
        <Fragment>
           <Label
              className='cursor'
              color='blue'
              onClick={() => this.props.fetchProductsAgain(this.props.productsPerPage, false, false, false, true)}
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
  if (this.props.totalProducts > this.props.productsPerPage * this.props.pageNumber) {
     return (
        <Fragment>
           <Label
              className='cursor'
              color='blue'
              onClick={() => this.props.fetchProductsAgain(this.props.productsPerPage,false, false, true, false)}
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

priceIsSortIcon() {
  if (this.props.priceIsSortAsc === true) {
     return (
        <Fragment>
           <Icon fitted name='sort ascending' />
        </Fragment>
     );
  } else if (this.props.priceIsSortDesc === true) {
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
                     <Table.HeaderCell onClick={() => this.props.fetchProductsAgain(this.props.productsPerPage, false, true, false, false)}>
                <div className='cursor'>Name {this.nameIsSortIcon()}</div>
                     </Table.HeaderCell>
                     <Table.HeaderCell onClick={() => this.props.fetchSalesAgain(this.props.productsPerPage,false,true, false,false)}>
                    <div className='cursor'>Price {this.priceIsSortIcon()}</div>
                     </Table.HeaderCell>
                     <Table.HeaderCell>Action</Table.HeaderCell>
                     <Table.HeaderCell>Action</Table.HeaderCell>
                  </Table.Row>
               </Table.Header>

    <Table.Body>
          
        { this.props.products.map((s) => {
        //some logic
        return (
            <Table.Row key={s.id}>
            <Table.Cell>{s.name}</Table.Cell>
            <Table.Cell>${s.price}</Table.Cell>
            <Table.Cell>
              <Button color="yellow" onClick={() =>{
                this.openEditModal(s.id,s.name,s.price);
              }
              
              }>< Icon enabled name='edit outline'/>Edit</Button>
              <UpdateProduct 

              
              open={openEditModal}
              openEditModal={this.openEditModal}
              productId={this.state.selectedProduct}
              productName={this.state.selectedProductName}
              productPrice={this.state.selectedProductPrice}
              updateProductName={this.updateProductName}
              updateProductPrice={this.updateProductPrice}
              
              reloadProducts={this.props.refresh}
              /> 
          
              </Table.Cell>
            <Table.Cell>
            <Button color='red' onClick={() => this.openDeleteModal(s.id)}><Icon enables name='trash'/>Delete</Button></Table.Cell>
            <ProductDeleteModal
               open={this.state.openDeleteModal}
               productId={this.state.selectedProduct}
               openDeleteModal={this.openDeleteModal}
               reloadProducts={this.props.refresh}
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
                              onChange={(e) => this.props.fetchProductsAgain(e.target.value, false, false, false, false)}
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