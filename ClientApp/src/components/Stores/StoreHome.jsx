import React, {Component} from "react";
import axios from "axios";
import { Button, Loader } from 'semantic-ui-react';
import StoreTable from "./StoreTable";
import CreateStore from "./CreateStore";
export default class StoreHome extends Component{
    constructor(props)
    {
        super(props);
        this.state={
            
            open:false,
            stores: [],
            storesPerPage: '',
            totalStores: '',
            pageNumber: '',
            isSort: false,
            nameIsSort: false,
            nameIsSortAsc: false,
            nameIsSortDesc: false,
            addressIsSort: false,
            addressIsSortAsc: false,
            addressIsSortDesc: false,
        };
    }

    componentDidMount()
    {
        this.fetchstaff();
    }

    fetchstaff = () => {
       var store;
        axios
            .get("/Stores/GetStore")
            .then(({data}) => {
                store=data;
                console.log(data);
                this.setState({
                    open: false,

                    pageNumber: 1,
                    isSort: true,
                    nameIsSort: false,
                    addressIsSort: false,
                    storesPerPage: 10,
                    stores: store.slice(0, 10),
                    totalStores: data.length,
                    addressIsSortAsc: false,
                    addressIsSortDesc: false,
                    nameIsSortAsc: false,
                    nameIsSortDesc: false,
                 
                
                
                });
            })
            .catch((err) => {
                console.log(err);
            });
    };

    fetchStoresAgain = (storesPerPage, nameSortSelect, addressSortSelect, nextPageSelect, prevPageSelect) => {
        var tempSales;
        var tempArray;
        var nextPageCount;
        var salesPageIndex;
  
        if (nameSortSelect === true) {
           this.setState({
              nameIsSort: true,
              isSort: false,
              addressIsSort: false,
              addressIsSortAsc: false,
              addressIsSortDesc: false,
              nameIsSortAsc: false,
              nameIsSortDesc: false,
           });
        }
  
        if (addressSortSelect === true) {
           this.setState({
              nameIsSort: false,
              isSort: false,
              addressIsSort: true,
              nameIsSortAsc: false,
              nameIsSortDesc: false,
              addressIsSortAsc: false,
              addressIsSortDesc: false,
              
           });
        }
  
        
        if (nextPageSelect === true) {
           salesPageIndex = parseInt(this.state.storesPerPage) * parseInt(this.state.pageNumber);
           nextPageCount = salesPageIndex + parseInt(this.state.storesPerPage);
           this.setState({ pageNumber: parseInt(this.state.pageNumber) + 1 });
        }
  
        if (prevPageSelect === true) {
           salesPageIndex = parseInt(this.state.storesPerPage) * parseInt(this.state.pageNumber) - parseInt(this.state.storesPerPage) * 2;
           nextPageCount = salesPageIndex + parseInt(this.state.storesPerPage);
           this.setState({ pageNumber: parseInt(this.state.pageNumber) - 1 });
        }
  
        if (nameSortSelect === true && this.state.nameIsSortAsc === false && this.state.nameIsSortDesc === true) {
           this.setState({ nameIsSortAsc: true, nameIsSortDesc: false });
        } else if (nameSortSelect === true && this.state.nameIsSortAsc === true && this.state.nameIsSortDesc === false) {
           this.setState({ nameIsSortDesc: true, nameIsSortAsc: false });
        } else if (nameSortSelect === true && this.state.nameIsSortAsc === false && this.state.nameIsSortDesc === false) {
           this.setState({ nameIsSortAsc: true, nameIsSortDesc: false });
        }
  
        if (addressSortSelect === true && this.state.addressIsSortAsc === false && this.state.addressIsSortDesc === true) {
           this.setState({ addressIsSortAsc: true, addressIsSortDesc: false });
        } else if (addressSortSelect === true && this.state.addressIsSortAsc === true && this.state.addressIsSortDesc === false) {
           this.setState({ addressIsSortDesc: true, addressIsSortAsc: false });
        } else if (addressSortSelect === true && this.state.addressIsSortAsc === false && this.state.addressIsSortDesc === false) {
           this.setState({ addressIsSortAsc: true, addressIsSortDesc: false });
        }
  
        
        axios
           .get('/Stores/GetStore')
           .then(({ data }) => {
               console.log(data);
              tempArray = data;
              if (this.state.nameIsSort === true && nameSortSelect === true && this.state.nameIsSortAsc === true) {
                 tempSales = tempArray.sort((a, b) => (a.name > b.name ? 1 : -1));
              }
              if (this.state.nameIsSort === true && nameSortSelect === true && this.state.nameIsSortDesc === true) {
                 tempSales = tempArray.sort((a, b) => (a.name < b.name ? 1 : -1));
              }
              if (nameSortSelect === false && this.state.nameIsSortAsc === true) {
                 tempSales = tempArray.sort((a, b) => (a.name > b.name ? 1 : -1));
              }
              if (nameSortSelect === false && this.state.nameIsSortDesc === true) {
                 tempSales = tempArray.sort((a, b) => (a.name < b.name ? 1 : -1));
              }
  
              if (this.state.addressIsSort === true && addressSortSelect === true && this.state.addressIsSortAsc === true) {
                 tempSales = tempArray.sort((a, b) => (a.address > b.address ? 1 : -1));
              }
              if (this.state.addressIsSort === true && addressSortSelect === true && this.state.addressIsSortDesc === true) {
                 tempSales = tempArray.sort((a, b) => (a.address < b.address ? 1 : -1));
              }
              if (addressSortSelect === false && this.state.addressIsSortAsc === true) {
                 tempSales = tempArray.sort((a, b) => (a.address > b.address ? 1 : -1));
              }
              if (addressSortSelect === false && this.state.addressIsSortDesc === true) {
                 tempSales = tempArray.sort((a, b) => (a.address < b.address ? 1 : -1));
              }
  
              if (this.state.isSort === true && nextPageSelect === false && prevPageSelect === false) {
                 tempSales = tempArray;
                 salesPageIndex = parseInt(storesPerPage) * parseInt(this.state.pageNumber) - parseInt(storesPerPage);
                 nextPageCount = salesPageIndex + parseInt(storesPerPage);
                 this.setState({
                    storesPerPage: storesPerPage,
                    stores: tempSales.slice(salesPageIndex, nextPageCount),
                    totalStores: tempArray.length,
                 });
              }
  
              if (nextPageSelect === false && prevPageSelect === false && this.state.isSort === false) {
                 salesPageIndex = parseInt(storesPerPage) * parseInt(this.state.pageNumber) - parseInt(storesPerPage);
                 nextPageCount = salesPageIndex + parseInt(storesPerPage);
                 this.setState({
                    storesPerPage: storesPerPage,
                    stores: tempSales.slice(salesPageIndex, nextPageCount),
                    totalStores: tempArray.length,
                 });
              }
              if (nextPageSelect === true) {
                 tempSales = tempArray;
                 this.setState({ stores: tempSales.slice(salesPageIndex, nextPageCount) });
              }
              if (prevPageSelect === true) {
                 tempSales = tempArray;
                 this.setState({ stores: tempSales.slice(salesPageIndex, nextPageCount) });
              }
           })
           .catch((err) => {
              console.log(err);
           });
     };
  

    openCreateModal= (value) =>
    {
        this.setState({
            open:value,
        });
    };


    render()
    {
        const {stores, open} = this.state;
        
        return(
         <div style={{margin: "30px auto",boxSizing:"border-box",width: "1500px", minHeight: "200px"}}>
            
            <Button color="blue" onClick={()=>this.openCreateModal(true)}>New Store</Button>
      
            <CreateStore open={open} openCreateModal={this.openCreateModal} fetchstaff={this.fetchstaff}/> 
      
            <StoreTable 
             stores={stores} 
             refresh={this.fetchstaff} 
             storesPerPage={this.state.storesPerPage}
             totalStores={this.state.totalStores}
             pageNumber={this.state.pageNumber}
             isSort={this.state.isSort}
             nameIsSort={this.state.nameIsSort}
             nameIsSortAsc={this.state.nameIsSortAsc}
             nameIsSortDesc={this.state.nameIsSortDesc}
             addressIsSort={this.state.addressIsSort}
             addressIsSortAsc={this.state.addressIsSortAsc}
             addressIsSortDesc={this.state.addressIsSortDesc}
             fetchStoresAgain={this.fetchStoresAgain} />
        </div>
        );
    }
}
