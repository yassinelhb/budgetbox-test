import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Product } from 'src/app/models/product.model';
import { ProductGroup } from 'src/app/models/productGroup.model';
import { ProductService } from 'src/app/services/product.service';
import { AddProductComponent } from '../add-product/add-product.component';
import { DeleteProductComponent } from '../delete-product/delete-product.component';
import { methodType } from './product-params/product-params.component';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss'],
})
export class ProductItemComponent implements OnInit {
  @Input() product!: Product;
  @Input() subgroup!: ProductGroup;
  @Input() group!: ProductGroup;
  @Output() deleteEvent = new EventEmitter();
  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {}

  onClick(type: methodType) {
    type === methodType.update ? this.updateProduct() : this.deleteProduct();
  }

  updateProduct() {
    const dialogRef = this.dialog.open(AddProductComponent, {
      data: this.product,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) this.product = result;
    });
  }

  deleteProduct() {
    const dialogRef = this.dialog.open(DeleteProductComponent, {
      data: { productId: this.product.id },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) this.deleteEvent.emit(result);
    });
  }
}
