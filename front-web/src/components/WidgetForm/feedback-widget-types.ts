import bugImageUrl from "../../assets/bug.svg";
import ideaImageUrl from "../../assets/idea.svg";
import thoughtImageUrl from "../../assets/thought.svg";

export type FeedbackType = "BUG" | "IDEA" | "OTHER";

console.log(bugImageUrl)

type FeedbackOptions = {
  [key in FeedbackType]: {
    title: string;
    image: {
      source: string;
      alt: string;
    };
  }
}

export const feedbackTypes: FeedbackOptions = {
  BUG: {
    title: "Problema",
    image: {
      source: bugImageUrl,
      alt: "Imagem de um inseto"
    }
  },
  IDEA: {
    title: "Ideia",
    image: {
      source: ideaImageUrl,
      alt: "Imagem de uma lâmpada"
    }
  },
  OTHER: {
    title: "Outro",
    image: {
      source: thoughtImageUrl,
      alt: "Imagem de um balão de pensamento"
    }
  }
}