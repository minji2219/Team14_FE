import styled from '@emotion/styled';
import { Common } from '@styles/globalStyle';
import Button from '../Button';

interface Props {
  content: string;
  onRequestClose: () => void;
}
const AlertDialog = ({ content, onRequestClose }: Props) => {
  return (
    <div>
      <Content>{content}</Content>
      <Wrapper>
        <Button
          label="취소"
          onClick={onRequestClose}
          bgColor={Common.colors.primary05}
        />
        <Button label="확인" bgColor={Common.colors.primary} />
      </Wrapper>
    </div>
  );
};

const Content = styled.div`
  font-size: 24px;
  margin-bottom: 20px;
`;

const Wrapper = styled.div`
  position: absolute;
  bottom: 30px;
  right: 30px;
  display: flex;
  gap: 10px;
  justify-content: end;
`;

export default AlertDialog;
