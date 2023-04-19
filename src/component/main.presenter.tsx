import { ChangeEvent } from "react";
import Loading from "../loding";
import {
  Answer,
  AnswerBox,
  BodyWrapper,
  Container,
  FooterWrapper,
  ImgBox,
  LoadingContainer,
  MyButton,
  MyInput,
  Title,
} from "./main.styles";

interface IMainPageUIProps {
  loading: boolean;
  onChangeKeywords: (e: ChangeEvent<HTMLInputElement>) => void;
  onClickSubmit: () => void;
  answerArr: string[];
}

export default function MainPageUI(props: IMainPageUIProps) {
  return (
    <>
      {props.loading && (
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
            {props.answerArr.map((el, index) => (
              <Answer key={index}>{el}</Answer>
            ))}
          </AnswerBox>
        </BodyWrapper>
        <FooterWrapper>
          <MyInput
            type="text"
            onChange={props.onChangeKeywords}
            placeholder="키워드를 입력하세요"
          />
          <MyButton type="primary" onClick={props.onClickSubmit}>
            입력
          </MyButton>
        </FooterWrapper>
      </Container>
    </>
  );
}
