
export class Responsavel {
  constructor(
    public nome: string,
   public responsaveisId: number
  ) {
    nome = ''
    responsaveisId = 0
  }
  static lista : Responsavel[] = [
    new Responsavel( "Ana Silva",1),
    new Responsavel( "Bruno Costa",2),
    new Responsavel( "Carla Mendes",3),
    new Responsavel( "Diego Santos",4),
    new Responsavel( "Elisa Ferreira",5),
    new Responsavel( "Felipe Oliveira",6),
    new Responsavel( "Gabriela Almeida",7),
    new Responsavel( "Henrique Rocha",8),
    new Responsavel( "Isabela Pinto",9),
    new Responsavel( "Jorge Lima",10),
    new Responsavel( "Lucas Ferreira",11),
    new Responsavel( "Mariana Alves",12),
  ]
}
