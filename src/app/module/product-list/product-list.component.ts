import { Component, OnInit } from '@angular/core';
import { BusinessService } from 'src/app/shared/service/business.service';
import {MatTableDataSource} from "@angular/material/table";
import {FormControl} from "@angular/forms";
import {debounceTime } from 'rxjs/operators';
import {Html5QrcodeScanner} from "html5-qrcode";
import {Html5Qrcode} from "html5-qrcode"

@Component({
  selector: 'com-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  searchField = new FormControl('');
  cameraId: any;
  html5QrCode: any;

  constructor(private readonly businessService: BusinessService) { }

  displayedColumns: string[] = ['name', 'sku', 'price', 'description','image'];
  dataSource = new MatTableDataSource<any>();

  ngOnInit(): void {
      this.searchField.valueChanges
        .pipe(debounceTime(400))
        .subscribe(resp => {
          this.businessService.getProduct(resp).subscribe(res => {
            console.log(res);
            this.dataSource.connect().next(res.data);
          });
        });
  }

  scanQr() {
      console.log('ingrese');

    Html5Qrcode.getCameras().then(devices => {
      if (devices && devices.length) {
        this.cameraId = devices[0].id;

        this.html5QrCode = new Html5Qrcode("reader");
        console.log('pase');
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
            console.log(err);
          });
      }
    }).catch(err => {
      console.log(err);
    });
  }

  stopScan() {
    this.html5QrCode.stop().then((ignore) => {
      console.log('detenido');
    }).catch((err) => {
      console.log(err);
    });
  }

}
