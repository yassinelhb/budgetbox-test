import {Component, Inject, OnInit} from "@angular/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatDialogRef, MAT_DIALOG_DATA} from "@angular/material/dialog";
import {Product} from "src/app/models/product.model";
import {ProductService} from "src/app/services/product.service";

@Component({selector: "app-add-product", templateUrl: "./add-product.component.html", styleUrls: ["./add-product.component.scss"]})
export class AddProductComponent implements OnInit {
  productForm: FormGroup = new FormGroup({});
  constructor(private productService : ProductService, private fb : FormBuilder, public dialogRef : MatDialogRef<AddProductComponent>, @Inject(MAT_DIALOG_DATA)public data : Product) {}

  ngOnInit(): void {
    this.productForm = this.fb.group({
      id: [""],
      name: [
        "", Validators.required
      ],
      scientificName: [""],
      groupId: [132],
      subGroupId: [133]
    });

    if (this.data) 
      this.productForm.patchValue(this.data);
    }
  
  saveProduct() {
    if (this.productForm.valid) {
      if (this.data) {
        this.productService.updateProduct(this.productForm.value).subscribe((res) => {
          this.dialogRef.close(res);
        });
      } else {
        this.productService.addProduct(this.productForm.value).subscribe((res) => {
          this.dialogRef.close(res);
        });
      }
    }
  }
}
