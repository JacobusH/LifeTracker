import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  fields: Array<string>;
}

@Component({
  selector: 'app-dialog-field-delete',
  templateUrl: './dialog-field-delete.component.html',
  styleUrls: ['./dialog-field-delete.component.scss']
})
export class DialogFieldDeleteComponent implements OnInit {

	constructor(
    public dialogRef: MatDialogRef<DialogFieldDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
  }

}
