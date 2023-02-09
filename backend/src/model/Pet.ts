import Tutor from "./Tutor";
import Usuario from "./Usuario";
import Reacao from "./Reacao";

export default class Pet {
  id: number;
  nome: string;
  raca: string;
  foto: string;
  bio: string;
  
  usuarioId: number;
  usuario: Usuario;
  likes: Reacao[]
  dislikes: Reacao[]
  tutor: Tutor;
}
