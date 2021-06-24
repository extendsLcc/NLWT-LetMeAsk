import { useHistory } from 'react-router-dom';
import { useAuth } from "../../hooks/useAuth";

import illustrationImg from '../../assets/images/illustration.svg';
import logoImg from '../../assets/images/logo.svg';
import googleIconImg from '../../assets/images/google-icon.svg';

import { Index } from "../../components/Button";

import './styles.scss';
import { FormEvent, useState } from "react";
import { database } from "../../services/firebase";

export function Home() {
  const history = useHistory();
  const { user, signInWithGoogle } = useAuth();
  const [roomCode, setRoomCode] = useState('');

  async function handleCreateRom() {

    if (!user) {
      await signInWithGoogle();
    }

    history.push('/rooms/new');

  }

  async function handleJoinRoom(event: FormEvent) {

    event.preventDefault();

    if (roomCode.trim() === '') {
      return;
    }

    const roomRef = await database.ref(`rooms/${roomCode}`).get();

    if (!roomRef.exists()) {
      alert('Room does not exists.');
      return ;
    }

    history.push(`/rooms/${roomCode}`)

  }

  return (
    <div id="page-auth">
      <aside>
        <img src={illustrationImg} alt="Ilustração simbolizando perguntas e respostas" />
        <strong>Crie salas de Q&amp;A ao-vivo</strong>
        <p>Tire as duvidas da sua audiência em tempo-real</p>
      </aside>
      <main>
        <div className="main-content">
          <img src={logoImg} alt="LetMeAsk" />
          <button className='create-room' onClick={handleCreateRom}>
            <img src={googleIconImg} alt="Logo do Google" />
            <span>Crie sua sala com o Google</span>
          </button>
          <div className="separator">ou entre em uma sala</div>
          <form onSubmit={handleJoinRoom}>
            <input
              type="text"
              placeholder="Digite o código da sala"
              onChange={event => setRoomCode(event.target.value)}
              value={roomCode}
            />
            <Index type="submit">Entrar na sala</Index>
          </form>
        </div>
      </main>
    </div>
  );
}