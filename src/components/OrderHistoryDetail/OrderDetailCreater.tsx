import styled from 'styled-components';
import { useState, useRef } from 'react';
import Button from '@components/common/Button';
import { Common } from '@styles/globalStyle';

import Modal from '@components/common/Modal';
// import { OrderDetailCreator } from '@components/OrderHistoryDetail/data';
import OrderHistoryDetailItem from '@components/OrderHistoryDetail/OrderHistoryDetailItem';
import RecruitDialog from '@components/spot/RecruitDialog';
import { SearchSpotProvider } from '@provider/SearchSpot';
import { TbPointFilled } from 'react-icons/tb';
import { useGetOrderDetailCreater } from '@api/hooks/useGetOrderDetailCreater';
import { useGetOrderDetailModify } from '@api/hooks/useGetOrderDetailCreaterModify';
import OrderListItem from '@components/OrderHistory/OrderListItem';
import { fetchAuthInstance, fetchInstance } from '@api/instance';
import { RouterPath } from '@routes/path';
import { useNavigate } from 'react-router-dom';

const modifyData = {
  category: '분식',
  storeName: '이삭토스트',
  minimumOrderAmount: 10000,
  pickUpLocation: '전남대학교',
  deadlineTime: '02:05:59',
  togetherOrderLink: 'http://localhost:3000',
  lat: 35.1766787,
  lng: 126.9054188,
};
interface OrderDetailCreaterProps {
  spotId: number;
}

const OrderDetailCreater = ({ spotId }: OrderDetailCreaterProps) => {
  const imageInput = useRef<HTMLInputElement>(null);
  const [uploadImgUrl, setUploadImgUrl] = useState<string>('');
  const [uploadFileName, setUploadFileName] = useState<string>('');

  const [recruitIsOpen, setRecruitIsOpen] = useState(false);
  const [completeModalIsOpen, setCompleteModalIsOpen] = useState(false);

  const [tipIsOpen, setTipIsOpen] = useState(false);

  // const spotId = parseInt(orderId as string, 10);
  // 주문내역(방장) 조회하기
  const { data: spotData } = useGetOrderDetailCreater(spotId);
  const { refetch, data: modifyData } = useGetOrderDetailModify(Number(spotId));
  const navigate = useNavigate();

  const onchangeImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    const uploadFile = files?.[0];

    if (uploadFile) {
      setUploadFileName(uploadFile.name);
    }

    if (!uploadFile) return;

    const reader = new FileReader();
    reader.readAsDataURL(uploadFile);
    reader.onloadend = () => {
      const result = reader.result;
      if (typeof result === 'string') {
        setUploadImgUrl(result);
      }
    };
  };
  const handleUploadClick = () => {
    imageInput.current?.click();
  };

  const deleteSpot = () => {
    fetchAuthInstance.delete(`/spot/${spotId}`).then((response) => {
      if (response.status === 200) {
        navigate(RouterPath.myPageOrderHistory);
      }
    });
  };

  return (
    <Wrapper>
      {spotData && (
        <OrderListItem
          category={spotData.category}
          storeName={spotData.storeName}
          pickUpLocation={spotData.pickUpLocation}
          deliveryStatus={spotData.deliveryStatus}
          price={spotData.price}
          date={spotData?.orderDate}
        />
      )}

      {spotData?.memberInfo?.length !== 0 ? (
        <>
          <ButtonContainer>
            <span>{uploadFileName}</span>
            <Space1 />
            <Button
              label="+ 결제 주문서 등록"
              radius="20px"
              bgColor={Common.colors.primary}
              onClick={handleUploadClick}
            />
            <input
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              onChange={onchangeImageUpload}
              ref={imageInput}
            />
            <Space1 />
            <Button
              label="?"
              radius="50%"
              bgColor={Common.colors.button3}
              onClick={() => setTipIsOpen(true)}
            />
          </ButtonContainer>
          <Modal
            size="big"
            title="알아보기"
            type="transparent"
            isOpen={tipIsOpen}
            onRequestClose={() => setTipIsOpen(false)}
            content={
              <ModalWrapper>
                <ExImage src="/image/example.png" />
                <DesWrapper>
                  <Des>
                    <TbPointFilled />
                    해당 이미지가 잘 보이도록 화면을 캡쳐해주세요.
                  </Des>
                  <Des>
                    <TbPointFilled />
                    결제 주문서 등록 버튼을 클릭 후 이미지를 업로드 해주세요.
                  </Des>
                </DesWrapper>
              </ModalWrapper>
            }
          />
          <ParticipantContainer>
            {spotData &&
              spotData.memberInfo?.map((data) => (
                <OrderHistoryDetailItem
                  deliveryName={data.deliveryName}
                  price={data.price}
                  isPayed={data.isPayed}
                />
              ))}
          </ParticipantContainer>
        </>
      ) : (
        <div>
          <EmptyMember>참여한 멤버가 없습니다.</EmptyMember>
        </div>
      )}
      <div>
        <Button
          label="수정하기"
          radius="20px"
          padding="9px 60px"
          bgColor={Common.colors.primary}
          onClick={() => {
            setRecruitIsOpen(true);
            refetch();
          }}
        />
        <Space2 />
        <Button
          label="삭제하기"
          onClick={deleteSpot}
          radius="20px"
          padding="9px 60px"
          bgColor={Common.colors.primary05}
        />
      </div>
      <Modal
        size="big"
        type="transparent"
        isOpen={recruitIsOpen}
        onRequestClose={() => setRecruitIsOpen(false)}
        title="모집"
        content={
          <SearchSpotProvider>
            <RecruitDialog
              //@ts-ignore
              modify={modifyData}
              onRequestClose={() => setRecruitIsOpen(false)}
              onRequestConfirm={() => setCompleteModalIsOpen(true)}
              //TODO임시
              onRequestError={() => {}}
            />
          </SearchSpotProvider>
        }
      />
    </Wrapper>
  );
};

export default OrderDetailCreater;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
`;

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: right;
  margin-top: 10px;
`;

const Space1 = styled.div`
  width: 10px;
`;
const Space2 = styled.div`
  height: 10px;
`;

const ParticipantContainer = styled.div`
  width: 100%;
  margin: 20px 0 30px;
`;

const ModalWrapper = styled.div`
  width: 500px;
  height: 350px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 50px;
`;
const ExImage = styled.img`
  width: 300px;
`;

const DesWrapper = styled.div`
display: flex
flex-direction: column;`;

const Des = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  font-size: 18px;
`;

const EmptyMember = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  height: 300px;
`;
