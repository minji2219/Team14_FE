import Button from '@components/common/Button';
import Logo from '@components/common/Logo';
import Modal from '@components/common/Modal';
import AlertDialog from '@components/common/Modal/AlertDialog';
import styled from '@emotion/styled';
import { Common } from '@styles/globalStyle';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getDynamicPath, RouterPath } from '@routes/path';
import Cookies from 'js-cookie';
import { getFormatTime } from '@helper/getFormatTime';
import { usePostParcipate } from '@api/hooks/usePostParticipate';

interface Props {
  spotId: number;
  category: string;
  storeName: string;
  deadlineTime: number[];
  address: string;
}
const Store = ({
  spotId,
  storeName,
  address,
  deadlineTime,
  category,
}: Props) => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [sendLinkIsOpen, setSendLinkIsOpen] = useState(false);
  const { mutate } = usePostParcipate();
  const navigate = useNavigate();

  const handleClick = () => {
    if (Cookies.get('access_token')) {
      //로그인이 되어있을 경우
      setSendLinkIsOpen(true);
    } else {
      //로그인이 안되어 있을 경우
      setIsLoginOpen(true);
    }
  };

  const handleConfirm = () => {
    //참여자 정보 post
    //sms 보내기 요청
    //마이페이지로 이동
    mutate({
      spotId: spotId,
      price: null,
      isPayed: null,
      participantId: null,
    });
    // () =>
    //   navigate(getDynamicPath.orderDetail(Number(spotId)), {
    //     state: false,
    //   });
  };
  return (
    <Wrapper>
      <Logo image={`/image/categories/${category.replaceAll(', ', ',')}.png`} />
      <DescriptWrapper>
        <Category>[{category}]</Category>
        <Title>{storeName}</Title>
        주문마감 : {getFormatTime(deadlineTime)}
        <Address>픽업 | {address}</Address>
      </DescriptWrapper>
      <Button
        label="선택"
        bgColor={Common.colors.primary}
        radius="20px"
        onClick={handleClick}
      />
      <Modal
        isOpen={isLoginOpen}
        onRequestClose={() => setIsLoginOpen(false)}
        title="로그인이 필요한 서비스입니다."
        content={
          <AlertDialog
            content="로그인 페이지로 이동하시겠습니까?"
            onRequestClose={() => setIsLoginOpen(false)}
            onRequestConfirm={() => navigate(RouterPath.login)}
          />
        }
      />
      <Modal
        isOpen={sendLinkIsOpen}
        onRequestClose={() => setSendLinkIsOpen(false)}
        title={<div>[{storeName}] 주문이 맞으신가요?</div>}
        content={
          <AlertDialog
            content={
              <div>
                가입하신 번호로 배민 함께주문 링크를
                <br /> 전송해드리겠습니다.
              </div>
            }
            onRequestClose={() => setSendLinkIsOpen(false)}
            onRequestConfirm={handleConfirm}
          />
        }
      />
    </Wrapper>
  );
};
export default Store;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: end;
  justify-content: space-between;
  margin: 20px 0;
  line-height: 1.3;
`;

const DescriptWrapper = styled.div`
  margin-left: 10px;
  width: 60%;
`;

const Category = styled.div`
  font-size: 20px;
`;

const Title = styled.div`
  font-size: 25px;
  font-weight: bold;
`;
const Address = styled.div``;
