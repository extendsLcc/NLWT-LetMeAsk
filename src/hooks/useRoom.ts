import { useEffect, useState } from "react";
import { database } from "../services/firebase";
import { useAuth } from "./useAuth";

type QuestionProperties = {
  author: {
    name: string;
    avatar: string;
  }
  content: string;
  isAnswered: boolean;
  isHighlighted: boolean;
  likeCount: number,
  likeId: string | undefined,
}

type FirebaseQuestions = Record<string, QuestionProperties & {
  likes: Record<string, {
    authorId: string;
  }>
}>

type QuestionType = QuestionProperties & {
  id: string;
}

export function useRoom(roomId: string) {
  const { user } = useAuth();
  const [questions, setQuestions] = useState<QuestionType[]>([]);
  const [title, setTitle] = useState('');


  useEffect(() => {
    const roomRef = database.ref(`rooms/${roomId}`)

    roomRef.on('value', room => {
      const databaseRoom = room.val();
      const firebaseQuestions: FirebaseQuestions = databaseRoom.questions ?? {};

      const parsedQuestions = Object.entries(firebaseQuestions).map(([key, value]) => {
        const { content, author, isAnswered, isHighlighted, likes } = value;
        const likeValues = Object.values(likes ?? {});

        return {
          id: key,
          content,
          author,
          isAnswered,
          isHighlighted,
          likeCount: likeValues.length,
          likeId: Object.entries(likes ?? {}).find(([key, like]) => like.authorId === user?.id)?.[0],
        }
      });

      setTitle(databaseRoom.title);
      setQuestions(parsedQuestions);

      return () => {
        roomRef.off('value');
      }

    });

  }, [roomId, user?.id]);

  return { questions, title };

}