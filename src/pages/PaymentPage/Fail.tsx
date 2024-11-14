import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const FailPage = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <Wrapper>
      <BoxSection>
        <h2>결제 실패</h2>
        <p>이전 페이지로 돌아가주세요.</p>
        <GoBackButton onClick={handleGoBack}>돌아가기</GoBackButton>
      </BoxSection>
    </Wrapper>
  );
};

export default FailPage;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f8f9fa;
`;

const BoxSection = styled.div`
  background-color: #fff;
  padding: 50px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const GoBackButton = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #059770;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: #04725a;
  }
`;
