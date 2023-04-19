import axios from "axios";
import { ChangeEvent, useState } from "react";

export default function Home() {
  // const [myapi, setApi] = useState("");
  const myAPI = process.env.NEXT_PUBLIC_CHAT_API_KEY;
  const [keywords, setKeywords] = useState("");
  // const [result, setResult] = useState("");
  const [answerArr, setAnswerArr] = useState<string[]>([]);

  // const onChangeAPI = (e: ChangeEvent<HTMLInputElement>) => {
  //   setApi(e.target.value);
  // };
  const onChangeKeywords = (e: ChangeEvent<HTMLInputElement>) => {
    setKeywords(e.target.value);
  };
  const onClickSubmit = async () => {
    const messages = [
      { role: "system", content: "You are a helpful assistant." },
      {
        role: "user",
        content: `삼행시란 단어를 한글자씩 분리하고 각각의 글로 시작하는 시를 만드는거야. 
        예를 들면 제시어가 '한주연'이라면 "한: 한여름의, 주: 주인공은, 연: 연속으로 나야." 같은거야. 
        최종적으로 만들어진 문장은 꼭 3줄이여야해. 
        각 음절로 만들어진 세줄의 문장의 흐름이 자연스러웠으면 좋겠어.
        ${keywords}에 대한 삼행시를 만들어줘.`,
      },
    ];
    const config = {
      headers: {
        // Authorization: `Bearer ${myapi}`,
        Authorization: `Bearer ${myAPI}`,
        "Content-Type": "application/json",
      },
    };
    const data = {
      model: "gpt-3.5-turbo",
      // model: "text-davinci-003",
      // 창의성을 설정하는 값. 일반적으로 0.5이지만 토큰을 줄이려면 낮추는게 좋다.
      temperature: 0.5,
      n: 1,
      messages: messages,
    };
    await axios
      .post("https://api.openai.com/v1/chat/completions", data, config)
      // .post("https://api.openai.com/v1/completions", data, config)
      .then((response) => {
        // response.data.choices.forEach((choice: any) => {
        //   let answer = choice.message.content.split("\n").join("");
        //   setResult(answer);
        // });
        console.log(response.data?.choices);
        let answer = response.data?.choices[0].message.content;
        console.log(answer);
        // setAnswerArr(answer.split(","));
        setAnswerArr(answer.split("\n" || ","));
        // console.log(answerArr);
      })
      .catch(function (error) {
        console.error(error);
      });
  };
  return (
    <>
      <h1>Chat GPT가 지어주는 삼행시</h1>
      {/* api 주소: <input type="text" onChange={onChangeAPI} /> */}
      <br />
      <br />
      keywords: <input type="text" onChange={onChangeKeywords} />
      <button onClick={onClickSubmit}>입력</button>
      <br />
      <br />
      {/* <div>{result}</div> */}
      {answerArr.map((el, index) => (
        <div key={index}>
          <div>{el}</div>
        </div>
      ))}
    </>
  );
}
