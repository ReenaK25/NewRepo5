import React, { Component } from 'react';
import axios from 'axios';
import { Button, Loader } from 'semantic-ui-react';
import ProductTable from './ProductTable';
import CreateProduct from './CreateProduct';


export default class ProductHome extends Component {
   constructor(props) {
      super(props);
      this.state = {
         
         open: false,

         products: [],
         productsPerPage: '',
         totalProducts: '',
         pageNumber: '',
         isSort: false,
         nameIsSort: false,
         nameIsSortAsc: false,
         nameIsSortDesc: false,
         priceIsSort: false,
         priceIsSortAsc: false,
         priceIsSortDesc: false,
      };
   }

   componentDidMount() {
      this.fetchProduct();
   }

   fetchProduct = () => {
      var product;
      axios
         .get('/Products/GetProduct')
         .then(({ data }) => {
            product=data;
            console.log(data);
            this.setState({

               open: false,

               pageNumber: 1,
               isSort: true,
               nameIsSort: false,
               priceIsSort: false,
               productsPerPage: 10,
               products: product.slice(0, 10),
               totalProducts: data.length,
               priceIsSortAsc: false,
               priceIsSortDesc: false,
               nameIsSortAsc: false,
               nameIsSortDesc: false,
            
            });
         })
         .catch((err) => {
            console.log(err);
         });
   };

   
   fetchProductsAgain = (productsPerPage, nameSortSelect, priceSortSelect, nextPageSelect, prevPageSelect) => {
      var tempSales;
      var tempArray;
      var nextPageCount;
      var salesPageIndex;

      if (nameSortSelect === true) {
         this.setState({
            nameIsSort: true,
            isSort: false,
            priceIsSort: false,
            priceIsSortAsc: false,
            priceIsSortDesc: false,
            nameIsSortAsc: false,
            nameIsSortDesc: false,
         });
      }

      if (priceSortSelect === true) {
         this.setState({
            nameIsSort: false,
            isSort: false,
            priceIsSort: true,
            nameIsSortAsc: false,
            nameIsSortDesc: false,
            priceIsSortAsc: false,
            priceIsSortDesc: false,
            
         });
      }

      
      if (nextPageSelect === true) {
         salesPageIndex = parseInt(this.state.productsPerPage) * parseInt(this.state.pageNumber);
         nextPageCount = salesPageIndex + parseInt(this.state.productsPerPage);
         this.setState({ pageNumber: parseInt(this.state.pageNumber) + 1 });
      }

      if (prevPageSelect === true) {
         salesPageIndex = parseInt(this.state.productsPerPage) * parseInt(this.state.pageNumber) - parseInt(this.state.productsPerPage) * 2;
         nextPageCount = salesPageIndex + parseInt(this.state.productsPerPage);
         this.setState({ pageNumber: parseInt(this.state.pageNumber) - 1 });
      }

      if (nameSortSelect === true && this.state.nameIsSortAsc === false && this.state.nameIsSortDesc === true) {
         this.setState({ nameIsSortAsc: true, nameIsSortDesc: false });
      } else if (nameSortSelect === true && this.state.nameIsSortAsc === true && this.state.nameIsSortDesc === false) {
         this.setState({ nameIsSortDesc: true, nameIsSortAsc: false });
      } else if (nameSortSelect === true && this.state.nameIsSortAsc === false && this.state.nameIsSortDesc === false) {
         this.setState({ nameIsSortAsc: true, nameIsSortDesc: false });
      }

      if (priceSortSelect === true && this.state.priceIsSortAsc === false && this.state.priceIsSortDesc === true) {
         this.setState({ priceIsSortAsc: true, priceIsSortDesc: false });
      } else if (priceSortSelect === true && this.state.priceIsSortAsc === true && this.state.priceIsSortDesc === false) {
         this.setState({ priceIsSortDesc: true, priceIsSortAsc: false });
      } else if (priceSortSelect === true && this.state.priceIsSortAsc === false && this.state.priceIsSortDesc === false) {
         this.setState({ priceIsSortAsc: true, priceIsSortDesc: false });
      }

      
      axios
         .get('/Products/GetProduct')
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

            if (this.state.priceIsSort === true && priceSortSelect === true && this.state.priceIsSortAsc === true) {
               tempSales = tempArray.sort((a, b) => (a.price > b.price ? 1 : -1));
            }
            if (this.state.priceIsSort === true && priceSortSelect === true && this.state.priceIsSortDesc === true) {
               tempSales = tempArray.sort((a, b) => (a.price < b.price ? 1 : -1));
            }
            if (priceSortSelect === false && this.state.priceIsSortAsc === true) {
               tempSales = tempArray.sort((a, b) => (a.price > b.price ? 1 : -1));
            }
            if (priceSortSelect === false && this.state.priceIsSortDesc === true) {
               tempSales = tempArray.sort((a, b) => (a.price < b.price ? 1 : -1));
            }

            if (this.state.isSort === true && nextPageSelect === false && prevPageSelect === false) {
               tempSales = tempArray;
               salesPageIndex = parseInt(productsPerPage) * parseInt(this.state.pageNumber) - parseInt(productsPerPage);
               nextPageCount = salesPageIndex + parseInt(productsPerPage);
               this.setState({
                  productsPerPage: productsPerPage,
                  products: tempSales.slice(salesPageIndex, nextPageCount),
                  totalProducts: tempArray.length,
               });
            }

            if (nextPageSelect === false && prevPageSelect === false && this.state.isSort === false) {
               salesPageIndex = parseInt(productsPerPage) * parseInt(this.state.pageNumber) - parseInt(productsPerPage);
               nextPageCount = salesPageIndex + parseInt(productsPerPage);
               this.setState({
                  productsPerPage: productsPerPage,
                  products: tempSales.slice(salesPageIndex, nextPageCount),
                  totalProducts: tempArray.length,
               });
            }
            if (nextPageSelect === true) {
               tempSales = tempArray;
               this.setState({ products: tempSales.slice(salesPageIndex, nextPageCount) });
            }
            if (prevPageSelect === true) {
               tempSales = tempArray;
               this.setState({ products: tempSales.slice(salesPageIndex, nextPageCount) });
            }
         })
         .catch((err) => {
            console.log(err);
         });
   };
   openCreateModal = (value) => {
      this.setState({
         open: value,
      });
   };

   render() {
      const { products, open } = this.state;
   
         return (
            <div style={{margin: "30px auto",boxSizing:"border-box",width: "1500px", minHeight: "200px"}}>
            
               <Button color='blue' onClick={() => this.openCreateModal(true)}>
                  New Product
               </Button>
               <CreateProduct open={open} openCreateModal={this.openCreateModal} fetchProduct={this.fetchProduct} />
               <ProductTable 
               products={products} 
               refresh={this.fetchProduct} 
               productsPerPage={this.state.productsPerPage}
               totalProducts={this.state.totalProducts}
               pageNumber={this.state.pageNumber}
               isSort={this.state.isSort}
               nameIsSort={this.state.nameIsSort}
               nameIsSortAsc={this.state.nameIsSortAsc}
               nameIsSortDesc={this.state.nameIsSortDesc}
               priceIsSort={this.state.priceIsSort}
               priceIsSortAsc={this.state.priceIsSortAsc}
               priceIsSortDesc={this.state.priceIsSortDesc}
               fetchProductsAgain={this.fetchProductsAgain}
               />
            </div>
         );
      
   }
}
