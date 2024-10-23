import styled from '@emotion/styled';
import { Common } from '@styles/globalStyle';
import Button from '../Button';

interface Props {
  content: string;
  onRequestClose: () => void;
  onRequestConfirm: () => void;
}
const AlertDialog = ({ content, onRequestClose, onRequestConfirm }: Props) => {
  return (
    <div>
      <Content>{content}</Content>
      <Wrapper>
        <Button
          label="취소"
          onClick={onRequestClose}
          bgColor={Common.colors.primary05}
          padding="10px 30px"
          radius="20px"
        />
        <Button
          label="확인"
          onClick={onRequestConfirm}
          bgColor={Common.colors.primary}
          padding="10px 30px"
          radius="20px"
        />
      </Wrapper>
    </div>
  );
};

const Content = styled.div`
  font-size: 24px;
  margin: 80px 80px 100px;
`;

const Wrapper = styled.div`
  position: absolute;
  bottom: 20px;
  right: 30px;
  display: flex;
  gap: 10px;
  justify-content: end;
`;

export default AlertDialog;
