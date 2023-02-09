import Pet from "./Pet";
import Reacao from "./Reacao";
import Usuario from "./Usuario";

export default class Tutor {
  id: number;
  nome: string;
  foto: string;
  bio: string;
  usuarioId: number;
  usuario: Usuario;
  likes: Reacao[]
  dislikes: Reacao[]
  pets: Pet[];
}
