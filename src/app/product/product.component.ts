import { Component, OnInit, inject } from '@angular/core';
import { ProductService } from './product.service';
import { HttpClientModule } from '@angular/common/http';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { consumerBeforeComputation } from '@angular/core/primitives/signals';


@Component({
  selector: 'app-product',
  standalone: true,
  imports: [HttpClientModule,ReactiveFormsModule,CommonModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit {
productService:ProductService=inject(ProductService);
productList:any=[];
productForm!:FormGroup;
isUpdatebtn!:boolean;
constructor(private fb:FormBuilder){}


ngOnInit(): void {
    this.getProducts();
    this.productForm=this.fb.group({
       id:[,Validators.required],
       name:['',Validators.required],
       price:[,Validators.required]
    });


    this.isUpdatebtn=false;
}


get id(){
  return this.productForm.get('id');
}
get name(){
  return this.productForm.get('name');
}
get price(){
  return this.productForm.get('price');
}
getProducts(){
  this.productService.getProducts().subscribe(result=>{
    this.productList=result;
    console.log(this.productList);
  })
}


// save & update product
saveProduct(){
  let product=this.productForm.value;
  if(!this.isUpdatebtn){
    this.productService.saveProduct(product).subscribe(result=>{
    });
  }
  else{
    let id= parseInt(this.productForm.value.id);
    this.productService.updateProduct(id,product).subscribe(result=>{
    });
  }
  this.getProducts();
  this.productForm.reset();
  this.isUpdatebtn=false;
}


editProduct(p:any){
  this.isUpdatebtn=true;


  this.productForm.setValue({
    id:p.id,
    name:p.name,
    price:p.price
  });
}
deleteProduct(id:any){
  let response=confirm('Do you want to delete '+id +' ?');
  if(response==true){
    this.productService.deleteProduct(id).subscribe(result=>{
      this.getProducts();
    }); 
  }
}
}
