import { Component, OnInit } from '@angular/core';
import { BusinessService } from 'src/app/shared/service/business.service';
import {MatTableDataSource} from "@angular/material/table";
import {FormControl} from "@angular/forms";
import {debounceTime } from 'rxjs/operators';
import {Html5Qrcode} from "html5-qrcode"
import {Product} from './../../shared/model/base/product';

@Component({
  selector: 'com-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  searchField = new FormControl('');
  cameraId: any;
  html5QrCode: any;
  cartProduct: Product[] = [];

  constructor(private readonly businessService: BusinessService) { }

  displayedColumns: string[] = ['name', 'sku', 'price', 'description','image', 'carrito'];
  dataSource = new MatTableDataSource<Product>();

  ngOnInit(): void {
      this.searchField.valueChanges
        .pipe(debounceTime(300))
        .subscribe(resp => {
          this.businessService.getProduct(resp).subscribe(res => {
            console.log(res);
            this.dataSource.connect().next(res.data);
          });
        });
  }

  scanQr() {
    Html5Qrcode.getCameras().then(devices => {
      if (devices && devices.length) {
        this.cameraId = devices[0].id;

        this.html5QrCode = new Html5Qrcode("reader");
        this.html5QrCode.start(
          this.cameraId,
          {
            fps: 10,
            qrbox: { width: 250, height: 250 }
          },
          (decodedText, decodedResult) => {
            this.searchField.setValue(decodedText);
          },
          (errorMessage) => {
            console.log(errorMessage);
          })
          .catch((err) => {
          });
      }
    }).catch(err => {
    });
  }

  stopScan() {
    this.html5QrCode.stop().then((ignore) => {
    }).catch((err) => {
    });
  }

  addCart(product: Product) {
    this.cartProduct.push(product);
  }

}
