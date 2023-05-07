import { Modal } from "antd";
import axios from "axios";
import { ChangeEvent, useState } from "react";
import MainPageUI from "./main.presenter";

export default function MainPage() {
  const [api, setApi] = useState("");
  // const myAPI = process.env.NEXT_PUBLIC_CHAT_API_KEY;
  const [keywords, setKeywords] = useState<string>("");
  const [answerArr, setAnswerArr] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const onChangeApiKey = (e: ChangeEvent<HTMLInputElement>) => {
    setApi(e.target.value);
  };
  const onChangeKeywords = (e: ChangeEvent<HTMLInputElement>) => {
    setKeywords(e.target.value);
  };
  const onClickSubmit = async () => {
    const regex = /^[ㄱ-ㅎ|가-힣]+$/;
    if (!keywords || !regex.test(keywords) || keywords.length !== 3) {
      Modal.info({ content: "키워드는 세글자, 한글로 입력해주세요" });
      return;
    }
    setLoading(true);
    const messages = [
      { role: "system", content: "You are a helpful assistant." },
      {
        role: "user",
        content: `삼행시란 단어를 한글자씩 분리하고 각각의 글로 시작하는 시를 만드는거야. 
       예를 들면 제시어가 '한주연'이라면 "한","주","연" 을 각 첫글자로 문장을 만드는거야.
       더 구체적인 예를 들면, "한: 한여름의, 주: 주인공은, 연: 연속으로 나야." 같은거야. 
       각 문장 안에는 쉼표가 들어있지 않고, 15글자를 넘으면 안돼.
       세문장 이상 답변하지마.
       각 음절로 만들어진 세줄의 문장의 흐름이 자연스러웠으면 좋겠어.
       ${keywords}에 대한 삼행시를 만들어줘.`,
      },
    ];
    const config = {
      headers: {
        Authorization: `Bearer ${api}`,
        "Content-Type": "application/json",
      },
    };
    const data = {
      model: "gpt-3.5-turbo",
      // 창의성을 설정하는 값. 일반적으로 0.5이지만 토큰을 줄이려면 낮추는게 좋다.
      temperature: 0.5,
      max_tokens: 50,
      n: 1,
      messages: messages,
      stop: ["\n"],
    };
    await axios
      .post("https://api.openai.com/v1/chat/completions", data, config)
      .then((response) => {
        console.log(response.data?.choices);
        let answer = response.data?.choices[0].message.content;
        setAnswerArr(answer.split("," || "\n"));
        setLoading(false);
      })
      .catch(function (error) {
        setLoading(false);
        Modal.error({
          content:
            "API 통신에 실패하였습니다. 자세한 사항은 로그를 확인해주세요",
        });
        console.error(error);
      });
  };
  return (
    <MainPageUI
      loading={loading}
      onChangeApiKey={onChangeApiKey}
      onChangeKeywords={onChangeKeywords}
      onClickSubmit={onClickSubmit}
      answerArr={answerArr}
    />
  );
}
