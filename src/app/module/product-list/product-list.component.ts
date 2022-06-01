import { Component, OnInit } from '@angular/core';
import { BusinessService } from 'src/app/shared/service/business.service';

@Component({
  selector: 'com-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  constructor(private readonly businessService: BusinessService) { }

  ngOnInit(): void {
    this.businessService.getProduct().subscribe(resp => {
      console.log(resp);
    })
  }

}
