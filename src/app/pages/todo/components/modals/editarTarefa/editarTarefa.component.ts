import { Component, Inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TodoModel } from '../../../models/todo.model';

@Component({
  selector: 'app-editar',
  templateUrl: './editarTarefa.component.html',
  styleUrls: ['./editarTarefa.component.css'],
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
  ],
})
export class EditarComponent implements OnInit {
  valorDigitado: string = '';


  constructor(
    public dialogRef: MatDialogRef<EditarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TodoModel,) {
    console.log("🚀 ~ EditarComponent ~ @Inject ~ data:", data)
  }

  ngOnInit() {}

  salvarAlteracao() {
   const valor = this.data.titulo = this.valorDigitado
   return  this.dialogRef.close(valor);

  }

}
