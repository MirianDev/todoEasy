import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatDialog } from '@angular/material/dialog';
import { ResponsaveisService } from '../../core/services/responsaveis.service';
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
  listaDeResponsaveis :Responsavel[]=[];
  listaDeResponsaveisMock  = Responsavel.lista;
  removerResoponsavel!: TodoModel;
  tarefaDigitada: string = '';
  todasAsTarefas: TodoModel[] = [];
  tarefasConcluidas: TodoModel[] = [];

  constructor(public dialog: MatDialog, private responsaveisService: ResponsaveisService) {
  }

  add(event: MatChipInputEvent) {
    const value = (event.value).trim();//.trim() tira os espacos em branco

    // if (value) {
    //   this.vResponsavel.push(value);
    // }

    event.chipInput!.clear();//limpa o campo
  }


  drop(event: CdkDragDrop<TodoModel[]>) {
    if (event.previousContainer === event.container) {  // Se o item estiver dentro do mesmo container

      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);  // Move o item dentro do array
      this.subirParaStorage();

    } else {
      transferArrayItem(
        event.previousContainer.data,// Array que vai ser transferido
        event.container.data,// Array que vai receber o item
        event.previousIndex,// Index que vai ser transferido
        event.currentIndex,// Index que vai receber o item

      );
    }
  }

  editar(linha: TodoModel) {
    const dialogRef = this.dialog.open(EditarComponent, {
      width: "40%",
      height: "40%",
      data: linha,// Abro o component, e passo os dados da tarefa para fazer a edição
    });

    dialogRef.afterClosed().subscribe(data => {
      this.subirParaStorage();
      });
  }

  ngOnInit() {
   this.todasAsTarefas = this.getTarefas();// pega as tarefas do localStorage
  }
  getTarefas() {
    const data = JSON.parse(localStorage.getItem('tarefas') || "[]" );  // pega as tarefas do localStorage
    return data;// Retorna as tarefas
  }

  removeResponsavel(responsavelRemover: Responsavel) {
    const index = this.removerResoponsavel.responsaveis.indexOf(responsavelRemover); // pega o index do responsavel que vai ser removido
    if (index >= 0) {
      this.removerResoponsavel.responsaveis.splice(index, 1); // remove o responsavel
    }
  }

  remover(linha: TodoModel) {
    const index = this.todasAsTarefas.indexOf(linha); // pega o index da tarefa que vai ser removida
    if (index >= 0) {
      this.todasAsTarefas.splice(index, 1); // remove a tarefa

      this.subirParaStorage();

    }
  }

  salvar() {
    const tarefaId = this.todasAsTarefas.length + 1; // Cria um id para a tarefa

    const tarefa = new TodoModel(tarefaId, this.tarefaDigitada, false, []); // instancia a tarefa

    this.listaDeResponsaveis.forEach(element => { // percorre a lista de responsaveis do select
      tarefa.responsaveis.push(element); // Adiciona o responsavel na lista de responsaveis da tarefa
    });

    this.todasAsTarefas.push(tarefa); // Adiciona a tarefa na lista de tarefas

    this.subirParaStorage();

    this.tarefaDigitada = ''; // Limpa o campo de digitação
  }

  private subirParaStorage(){
    localStorage.setItem('tarefas', JSON.stringify(this.todasAsTarefas));
  }
}
