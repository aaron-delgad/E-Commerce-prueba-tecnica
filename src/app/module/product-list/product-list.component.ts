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
    Html5Qrcode.getCameras().then(devices => {
      if (devices && devices.length) {
        var cameraId = devices[0].id;
      }
    }).catch(err => {
      console.log(err);
    });
    /*const html5QrCode = new Html5Qrcode(/!* element id *!/ "reader");

    const fileinput = document.getElementById('qr-input-file');
    fileinput.addEventListener('change', e => {

      /!*const imageFile = e.target.files[0];*!/

      html5QrCode.scanFile(imageFile, true)
        .then(decodedText => {
          console.log(decodedText);
        })
        .catch(err => {
          console.log(`Error scanning file. Reason: ${err}`)
        });
    });*/
  }

}
