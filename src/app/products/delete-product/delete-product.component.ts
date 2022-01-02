import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-delete-product',
  templateUrl: './delete-product.component.html',
  styleUrls: ['./delete-product.component.scss'],
})
export class DeleteProductComponent implements OnInit {
  constructor(
    private productService: ProductService,
    public dialogRef: MatDialogRef<DeleteProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { productId: number }
  ) {}

  ngOnInit(): void {}

  deleteProduct() {
    this.productService
      .deleteProduct(this.data.productId)
      .subscribe(() => this.dialogRef.close(this.data.productId));
  }
}
