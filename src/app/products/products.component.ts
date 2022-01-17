import {Component, OnInit} from "@angular/core";
import {MatDialog} from "@angular/material/dialog";
import {PageEvent} from "@angular/material/paginator";
import {Product} from "../models/product.model";
import {ProductGroup} from "../models/productGroup.model";
import {ProductService} from "../services/product.service";
import {AddProductComponent} from "./add-product/add-product.component";

@Component({selector: "app-products", templateUrl: "./products.component.html", styleUrls: ["./products.component.scss"]})
export class ProductsComponent implements OnInit {
  loading: boolean = false;
  products: Product[] = [];
  groups: ProductGroup[] = [];
  subgroups: ProductGroup[] = [];
  pageSizeOptions: number[] = [5, 10, 25, 100];
  totalItems: number = 0;
  pageIndex: number = 0;
  pageSize: number = 25;
  search: string = "";
  order = "DESC";
  includes: string = "groups,subgroups";

  constructor(private productService : ProductService, public dialog : MatDialog) {}

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.loading = true;
    this.productService.getProducts(this.pageSize, this.pageIndex * this.pageSize, this.includes, this.search, this.order).subscribe((res : any) => {
      this.products = res.hits;
      this.totalItems = res.total;
      this.groups = res.groups;
      this.subgroups = res.subgroups;
      this.loading = false;
    });
  }

  onPageChange(page : any) {
    this.pageSize = page.pageSize;
    this.pageIndex = page.pageIndex;
    this.getProducts();
  }

  addProduct() {
    const dialogRef = this.dialog.open(AddProductComponent);
    dialogRef.afterClosed().subscribe((result) => {
      if (result) 
        this.products.unshift(result);
      }
    );
  }

  deleteProduct(productId : number) {
    //this.products = this.products.filter((product) => product.id !== productId);
    this.getProducts();
  }

  onSearchClick() {
    this.getProducts();
  }

  getProductGroup(groupId : number): any {
    return this.groups.find((group) => group.id === groupId);
  }

  getProductSubGroup(subGroupId : number): any {
    return this.subgroups.find((subGroup) => subGroup.id === subGroupId);
  }
}
