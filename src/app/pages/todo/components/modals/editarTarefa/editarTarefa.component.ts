import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, Inject, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatChipEditedEvent, MatChipInputEvent } from '@angular/material/chips';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MaterialModule } from '../../../../../material.module';
import { TodoModel } from '../../../models/todo.model';
import { CommonModule, NgIf } from '@angular/common';
import { Responsavel } from '../../../models/responsavel.model';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';

export interface Fruit {
  name: string;
}

@Component({
  selector: 'app-editar',
  templateUrl: './editarTarefa.component.html',
  styleUrls: ['./editarTarefa.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    MatToolbarModule, MatButtonModule, MatIconModule
  ],
})
export class EditarComponent implements OnInit {
  readonly separatorKeysCodes = [ENTER, COMMA] as const;

  addOnBlur = true;
  valorDigitado: string = '';
  copiaTarefa = JSON.parse(JSON.stringify(this.data)) as TodoModel;

  constructor(
    public dialogRef: MatDialogRef<EditarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TodoModel,) {

  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      const idResponsavel = this.copiaTarefa.responsaveis.length + 1;

      this.copiaTarefa.responsaveis.push({ nome: value, responsaveisId: idResponsavel });
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  edit(responsable: Responsavel, event: MatChipEditedEvent) {
    const value = event.value.trim();

    if (!value) {
      this.remove(responsable);
      return;
    }

    const index = this.copiaTarefa.responsaveis.indexOf(responsable);

    if (index >= 0) {
      this.copiaTarefa.responsaveis[index].nome = value;
    }
  }

  ngOnInit() { }

  remove(responsable: Responsavel): void {
    const index = this.copiaTarefa.responsaveis.indexOf(responsable);

    if (index >= 0) {
      this.copiaTarefa.responsaveis.splice(index, 1);
    }
  }

  salvarAlteracao() {
    this.data.responsaveis = this.copiaTarefa.responsaveis;
    this.data.titulo = this.copiaTarefa.titulo;

    this.dialogRef.close();
  }
}
