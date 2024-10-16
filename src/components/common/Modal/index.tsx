import styled from '@emotion/styled';
import { Common } from '@styles/globalStyle';
import { ReactNode } from 'react';

interface Props {
  size?: 'small' | 'big';
  isOpen: boolean;
  onRequestClose: () => void;
  title: string | ReactNode;
  content: ReactNode;
}

const Modal = ({
  size = 'small',
  isOpen,
  onRequestClose,
  title,
  content,
}: Props) => {
  return (
    <Wrapper>
      {isOpen && (
        <Overlay onClick={onRequestClose}>
          <ModalBox size={size} onClick={(e) => e.stopPropagation()}>
            <Header size={size}>{title}</Header>
            <Contents>{content}</Contents>
          </ModalBox>
        </Overlay>
      )}
    </Wrapper>
  );
};
export default Modal;

const Wrapper = styled.div``;
const Overlay = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: ${Common.zIndex.modal};
`;

const ModalBox = styled.div((props: { size: 'small' | 'big' }) => ({
  // minWidth로 해도 상관없는지?
  minWidth: props.size === 'small' ? '650px' : '700px',
  height: props.size === 'small' ? '350px' : '800px',
  backgroundColor: 'white',
  borderRadius: '30px',
}));

const Header = styled.div((props: { size: 'small' | 'big' }) => ({
  height: props.size === 'small' ? '20%' : '10%',
  fontWeight: 'bold',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: '30px 30px 0 0',
  fontSize: props.size === 'small' ? '24px' : '36px',
  backgroundColor:
    props.size === 'small' ? Common.colors.primary : 'transparent',
  color: props.size === 'small' ? '#fff' : 'black',
}));

const Contents = styled.div`
  height: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;
