import { Component, OnInit } from '@angular/core';
import { BusinessService } from 'src/app/shared/service/business.service';
import {MatTableDataSource} from "@angular/material/table";
import {FormControl} from "@angular/forms";
import {debounceTime } from 'rxjs/operators';

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

}
