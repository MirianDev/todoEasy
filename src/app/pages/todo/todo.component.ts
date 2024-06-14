import { LiveAnnouncer } from '@angular/cdk/a11y';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatDialog } from '@angular/material/dialog';
import { MaterialModule } from '../../material.module';
import { EditarComponent } from './components/modals/editarTarefa/editarTarefa.component';
import { Responsavel } from './models/responsavel.model';
import { TodoModel } from './models/todo.model';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
  imports: [CommonModule, MaterialModule, FormsModule, ReactiveFormsModule,],
  standalone: true
})

export class TodoComponent implements OnInit {


  tarefas: TodoModel[] = [];
  valorDigitado: string = '';
  valorResponsavel: string = '';
t!:TodoModel;
  done: TodoModel[] = [];
  announcer = inject(LiveAnnouncer);

  constructor(public dialog: MatDialog,) { }

  editar(linha: TodoModel) {
    const dialogRef = this.dialog.open(EditarComponent, {
      width: "30%",
      height: "30%",
      data: linha,
    });
  }

  ngOnInit() { }

  remover(linha: TodoModel) {
    const index = this.tarefas.indexOf(linha);
    if (index >= 0) {
      this.tarefas.splice(index, 1);
    }
  }


  removeResponsavel(responsavelRemover: Responsavel) {
    const index = this.t.responsaveis.indexOf(responsavelRemover);
    if (index >= 0) {
      this.t.responsaveis.splice(index, 1);

    }
  }
  salvar(todo: TodoModel[]) {


    const tarefaId = this.tarefas.length + 1;
    const responsavelId = this.tarefas.length + 1;
    const responsavelObjt = new Responsavel(this.valorResponsavel, responsavelId);

    const tarefa = new TodoModel(tarefaId, this.valorDigitado, false, []);

    tarefa.responsaveis.push(responsavelObjt);

    this.tarefas.push(tarefa);

    this.valorDigitado = '';
    this.valorResponsavel = '';
  }


  add(event: MatChipInputEvent) {
    const value = (event.value).trim();

    // if (value) {
    //   this.vResponsavel.push(value);
    // }

    event.chipInput!.clear();

  }

  drop(event: CdkDragDrop<TodoModel[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

}

