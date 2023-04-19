import Loading from "@/src/loding";
import styled from "@emotion/styled";
import { Button, Input, Modal } from "antd";
import axios from "axios";
import { ChangeEvent, useState } from "react";

export const LoadingContainer = styled.div`
  position: absolute;
  width: 100vw;
  height: 100vh;
  z-index: 10;
  background-color: rgba(255, 255, 255, 0.5);
`;
export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  padding: 100px;
`;
export const Title = styled.p`
  font-size: 25px;
  font-weight: bold;
`;
export const BodyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  position: relative;
`;
export const ImgBox = styled.img`
  width: 500px;
`;
export const AnswerBox = styled.div`
  width: 500px;
  background-color: gray;
  padding: 10px;
  text-align: center;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  -webkit-text-stroke: 0.5px black;
`;
export const Answer = styled.div`
  font-size: 20px;
  font-weight: 500;
  color: white;
`;
export const FooterWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
export const MyInput = styled(Input)`
  font-size: 15px;
  width: 300px;
  height: 50px;
  margin-right: 10px;
`;
export const MyButton = styled(Button)`
  font-size: 15px;
  width: 80px;
  height: 50px;
`;

export default function Home() {
  // const [myapi, setApi] = useState("");
  const myAPI = process.env.NEXT_PUBLIC_CHAT_API_KEY;
  const [keywords, setKeywords] = useState<string>("");
  // const [result, setResult] = useState("");
  const [answerArr, setAnswerArr] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  // const onChangeAPI = (e: ChangeEvent<HTMLInputElement>) => {
  //   setApi(e.target.value);
  // };
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
        예를 들면 제시어가 '한주연'이라면 "한: 한여름의, 주: 주인공은, 연: 연속으로 나야." 같은거야. 
        각 문장당, 쉽표가 들어있지 않고, 10글자를 넘으면 안돼.
        각 문장을 줄바꿈으로 구분해줘.
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
      max_tokens: 50,
      n: 1,
      messages: messages,
      stop: ["\n"],
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

        // setAnswerArr(answer.split("\n" || ","));
        setAnswerArr(answer.split("\n" || ","));
        // console.log(answerArr);
        setLoading(false);
      })
      .catch(function (error) {
        console.error(error);
      });
  };
  return (
    <>
      {loading && (
        <LoadingContainer>
          <Loading />
        </LoadingContainer>
      )}
      <Container>
        <Title>Chat GPT가 지어주는 삼행시</Title>
        {/* api 주소: <input type="text" onChange={onChangeAPI} /> */}
        <BodyWrapper>
          <ImgBox src="/img/aiRobot.webp" />
          <AnswerBox>
            {answerArr.map((el, index) => (
              <Answer key={index}>{el}</Answer>
            ))}
          </AnswerBox>
        </BodyWrapper>
        <FooterWrapper>
          <MyInput
            type="text"
            onChange={onChangeKeywords}
            placeholder="키워드를 입력하세요"
          />
          <MyButton type="primary" onClick={onClickSubmit}>
            입력
          </MyButton>
        </FooterWrapper>
        {/* <div>{result}</div> */}
      </Container>
    </>
  );
}
