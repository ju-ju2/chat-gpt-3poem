import axios from "axios";
import { ReactNode, createContext, useState } from "react";

interface ChatContextProps {
  message: string;
  sendMessage: (message: string) => Promise<void>;
}

export const ChatContext = createContext<ChatContextProps>({
  message: "",
  sendMessage: async () => {},
});

export default function ChatProvider({ children }: { children: ReactNode }) {
  const [message, setMessage] = useState("");

  const sendMessage = async () => {
    const prompt = "삼행시";
    const model = "text-davinci-002";
    // const apiKey = process.env.NEXT_PUBLIC_CHAT_API_KEY;
    const apiKey = "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";

    const response = await axios.post(
      `https://api.openai.com/v1/${model}/completions`,
      {
        prompt,
        max_tokens: 3,
        n: 1,
        stop: "\n",
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer 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`,
        },
      }
    );

    const haiku = response.data?.choices[0].text.trim();
    return haiku;
  };

  return (
    <ChatContext.Provider value={{ message, sendMessage }}>
      {children}
    </ChatContext.Provider>
  );
}
