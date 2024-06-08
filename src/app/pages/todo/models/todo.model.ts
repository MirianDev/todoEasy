import { Responsavel } from "./responsavel";

export class TodoModel {
  constructor(
    public id: number,
    public titulo: string,
    public finalizado: boolean,
    public responsaveis: Responsavel[]
  ) {
  }
}
