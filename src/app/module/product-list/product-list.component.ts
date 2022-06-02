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
    alert('ingrese');


    Html5Qrcode.getCameras().then(devices => {
      if (devices && devices.length) {
        this.cameraId = devices[0].id;
        console.log('camera');
        console.log(this.cameraId);


        const html5QrCode = new Html5Qrcode(/* element id */ "reader");
        console.log('pase');
        html5QrCode.start(
          this.cameraId,
          {
            fps: 10,    // Optional, frame per seconds for qr code scanning
            qrbox: { width: 250, height: 250 }  // Optional, if you want bounded box UI
          },
          (decodedText, decodedResult) => {
            console.log(`Code matched = ${decodedText}`, decodedResult);
            alert(`Code matched = ${decodedText}`+ '  => ' + decodedResult);

          },
          (errorMessage) => {
            // parse error, ignore it.
          })
          .catch((err) => {
            // Start failed, handle it.
          });


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
