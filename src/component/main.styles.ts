import styled from "@emotion/styled";
import { Button, Input } from "antd";

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
