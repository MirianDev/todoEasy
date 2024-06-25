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
  tarefaDigitada: string = '';
  copiaTarefa = JSON.parse(JSON.stringify(this.data)) as TodoModel;// copia a tarefa para nao alterar a tarefa original

  constructor(
    public dialogRef: MatDialogRef<EditarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TodoModel,) {

  }

  adicionarChipsResponsavel(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();//.trim() tira os espacos em branco
    if (value) {
      const idResponsavel = this.copiaTarefa.responsaveis.length + 1;// busca o id do responsavel mais proximo
      this.copiaTarefa.responsaveis.push({ nome: value, responsaveisId: idResponsavel });//cria o responsavel no array com o nome e o id
    }
    event.chipInput!.clear(); //limpa o campo
  }

  edit(responsable: Responsavel, event: MatChipEditedEvent) {
    const value = event.value.trim();//.trim() tira os espacos em branco

    if (!value) {
      this.remove(responsable);// se o valor estiver vazio remove o responsavel
      return;
    }

    const index = this.copiaTarefa.responsaveis.indexOf(responsable); //busca o responsavel no array
    if (index >= 0) {
      this.copiaTarefa.responsaveis[index].nome = value;//atualiza o responsavel no array
    }
  }

  ngOnInit() { }

  remove(responsable: Responsavel): void {
    const index = this.copiaTarefa.responsaveis.indexOf(responsable); //busca o responsavel no array

    if (index >= 0) {
      this.copiaTarefa.responsaveis.splice(index, 1);
    }
  }

  salvarAlteracao() {

    this.data.responsaveis = this.copiaTarefa.responsaveis; //atualiza os responsaveis no array da tarefa
    this.data.titulo = this.copiaTarefa.titulo;//atualiza o titulo da tarefa

    this.dialogRef.close();

  }
}
