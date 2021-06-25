import { useEffect, useState } from "react";
import { database } from "../services/firebase";

type QuestionProperties = {
  author: {
    name: string;
    avatar: string;
  }
  content: string;
  isAnswered: boolean;
  isHighlighted: boolean;
}

type FirebaseQuestions = Record<string, QuestionProperties>

type QuestionType = QuestionProperties & {
  id: string;
}

export function useRoom(roomId: string) {
  const [questions, setQuestions] = useState<QuestionType[]>([]);
  const [title, setTitle] = useState('');


  useEffect(() => {
    const roomRef = database.ref(`rooms/${roomId}`)

    roomRef.on('value', room => {
      const databaseRoom = room.val();
      const firebaseQuestions: FirebaseQuestions = databaseRoom.questions ?? {};

      const parsedQuestions = Object.entries(firebaseQuestions).map(([key, value]) => {
        const { content, author, isAnswered, isHighlighted } = value;
        return {
          id: key,
          content,
          author,
          isAnswered,
          isHighlighted,
        }
      });

      setTitle(databaseRoom.title);
      setQuestions(parsedQuestions);

    });

  }, [roomId]);

  return { questions, title };

}