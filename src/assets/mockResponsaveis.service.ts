import { Injectable } from '@angular/core';
import { Responsavel } from '../app/pages/todo/models/responsavel.model';

@Injectable({
  providedIn: 'root'
})
export class MockResponsaveisService {

 public static Responsaveis: Responsavel[] = [
    {
      nome: "Ana Silva",
      responsaveisId: 1
    },
    {
      nome: "Bruno Costa",
      responsaveisId: 2
    },
    {
      nome: "Carla Mendes",
      responsaveisId: 3
    },
    {
      nome: "Diego Santos",
      responsaveisId: 4
    },
    {
      nome: "Elisa Ferreira",
      responsaveisId: 5
    },
    {
      nome: "Felipe Oliveira",
      responsaveisId: 6
    },
    {
      nome: "Gabriela Almeida",
      responsaveisId: 7
    },
    {
      nome: "Henrique Rocha",
      responsaveisId: 8
    },
    {
      nome: "Isabela Pinto",
      responsaveisId: 9
    },
    {
      nome: "Jorge Lima",
      responsaveisId: 10
    }
  ]


}
