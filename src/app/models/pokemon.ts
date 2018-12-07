export class Pokemon {
  id: number;
  name: string;
  attack: number;
  defense: number;
  type: string;
  moves: string[];
  curve: number;
  levels: number[];
  probability: number;

  favorite: boolean;
  received: boolean;
  deleted: boolean;
}
