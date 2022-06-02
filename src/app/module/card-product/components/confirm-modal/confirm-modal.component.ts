import { Component, OnInit, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'com-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss']
})
export class ConfirmModalComponent implements OnInit {

  constructor(public dialog: MatDialogRef<ConfirmModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: { state: string },) { }

  ngOnInit(): void {
  }

  save(){
    this.dialog.close({   });
  }
}
