import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef } from '@angular/material/dialog';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
@Component({
  selector: 'app-pop-up',
  standalone: true,
  imports: [MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatButtonModule],
  templateUrl: './pop-up.component.html',
  styleUrl: './pop-up.component.css'
})


export class PopUpComponent {

  constructor(public dialogRef: MatDialogRef<PopUpComponent>) { }
  onClose(): void {
    this.dialogRef.close(); // Closes the dialog
  }
}
