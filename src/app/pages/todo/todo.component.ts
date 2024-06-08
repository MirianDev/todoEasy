import { Component, OnInit, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MaterialModule } from '../../material.module';
import { MatChipInputEvent } from '@angular/material/chips';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { EditarComponent } from './components/modals/editarTarefa/editarTarefa.component';
import { Responsavel } from './models/responsavel';
import { TodoModel } from './models/todo.model';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
  imports: [MaterialModule, FormsModule, ReactiveFormsModule],
  standalone: true
})

export class TodoComponent implements OnInit {


  tarefas: TodoModel[] = [];
  valorDigitado: string = '';
  valorResponsavel: string = '';


  announcer = inject(LiveAnnouncer);

  constructor(public dialog: MatDialog,) { }

  editar(linha: TodoModel) {
    debugger
    const dialogRef = this.dialog.open(EditarComponent, {
      width: "30%",
      height: "30%",
      data: linha,
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  ngOnInit() {}

  remover(linha: TodoModel) {
    const index = this.tarefas.indexOf(linha);
    if (index >= 0) {
      this.tarefas.splice(index, 1);
    }
  }


  removeResponsavel(responsavelRemover: Responsavel) {
    // const index = this.vResponsavel.indexOf(responsavelRemover);
    // if (index >= 0) {
    //   this.vResponsavel.splice(index, 1);

    //    this.announcer.announce(`removed ${responsavelRemover}`);
    // }
  }
  salvar() {
    const tarefaId = this.tarefas.length + 1;
    const responsavelId = this.tarefas.length + 1;
    const responsavelObjt = new Responsavel(this.valorResponsavel, responsavelId);

    const tarefa = new TodoModel(tarefaId, this.valorDigitado, false, []);

    tarefa.responsaveis.push(responsavelObjt);

    this.tarefas.push(tarefa);

    this.valorDigitado = '';
    this.valorResponsavel='';
  }


  add(event: MatChipInputEvent) {
    const value = (event.value).trim();

    // if (value) {
    //   this.vResponsavel.push(value);
    // }

    event.chipInput!.clear();

  }
}

