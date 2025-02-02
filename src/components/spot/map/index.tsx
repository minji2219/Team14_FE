import { LocationContext } from '@provider/PresentLocation';
import { useContext, useState } from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import { BsPlusCircleFill } from 'react-icons/bs';
import styled from 'styled-components';
import { Common } from '@styles/globalStyle';
import Modal from '@components/common/Modal';
import RecruitDialog from '../RecruitDialog';
import { SearchSpotProvider } from '@provider/SearchSpot';
import AlertDialog from '@components/common/Modal/AlertDialog';
import { useNavigate } from 'react-router-dom';
import { getDynamicPath, RouterPath } from '@routes/path';
import { ClickedLocationContext } from '@provider/ClickedLocation';
import { useGetSpotInfo } from '@api/hooks/useGetSpotInfo';
import Cookies from 'js-cookie';

const KakaoMap = () => {
  const { location, setLocation } = useContext(LocationContext);
  const { setClickedLocation } = useContext(ClickedLocationContext);
  const [spotId, setSpotId] = useState(0);

  const navigate = useNavigate();

  const dragEnd = (marker: any) => {
    //위도(lat,Ma), 경도(lng,La)
    const { La, Ma } = marker.getPosition();
    const geocoder = new kakao.maps.services.Geocoder();
    geocoder.coord2Address(La, Ma, (result, status) => {
      if (status === kakao.maps.services.Status.OK) {
        setLocation({
          dong: result[0].address.region_3depth_name,
          lat: Ma,
          lng: La,
        });
        localStorage.setItem(
          'location',
          JSON.stringify({
            dong: result[0].address.region_3depth_name,
            lat: Ma,
            lng: La,
          }),
        );
      }
    });
  };

  const { data = [] } = useGetSpotInfo({
    lat: location.lat,
    lng: location.lng,
  });

  const [recruitIsOpen, setRecruitIsOpen] = useState(false);
  const [completeModalIsOpen, setCompleteModalIsOpen] = useState(false);
  const [errorModalIsOpen, setErrorModalIsOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const handlePlusBtn = () => {
    if (Cookies.get('access_token')) {
      //로그인이 되어있을 경우
      setRecruitIsOpen(true);
    } else {
      //로그인이 안되어 있을 경우
      setIsLoginOpen(true);
    }
  };
  return (
    <Map
      center={{ lat: location.lat, lng: location.lng }}
      style={{ width: '100%', height: '100%' }}
      level={3}
    >
      <PlusBtnIcon onClick={handlePlusBtn}>
        <BsPlusCircleFill size="50" />
      </PlusBtnIcon>

      {/* 현재 내위치_빨간색 마커 */}
      <MapMarker
        position={{
          lat: location.lat,
          lng: location.lng,
        }}
        image={{
          src: '/image/myLocation.png',
          size: { width: 33, height: 45 },
        }}
        draggable={true}
        onDragEnd={(marker) => dragEnd(marker)}
      />

      {/* 배달 스팟들의 위치_파란색 마커 */}
      {data.map((data) => (
        <MapMarker
          key={data.id}
          position={{
            lat: data.lat,
            lng: data.lng,
          }}
          clickable={true}
          // 해당 스팟에 있는 배달 리스트를 리스트에서 보여주기
          onClick={() => {
            setClickedLocation({ lat: data.lat, lng: data.lng });
          }}
        />
      ))}

      <Modal
        size="big"
        type="transparent"
        isOpen={recruitIsOpen}
        onRequestClose={() => setRecruitIsOpen(false)}
        title="모집"
        content={
          <SearchSpotProvider>
            <RecruitDialog
              onRequestClose={() => setRecruitIsOpen(false)}
              onRequestConfirm={() => setCompleteModalIsOpen(true)}
              onRequestError={() => setErrorModalIsOpen(true)}
              setSpotId={setSpotId}
            />
          </SearchSpotProvider>
        }
      />
      <Modal
        type="complete"
        isOpen={completeModalIsOpen}
        onRequestClose={() => setCompleteModalIsOpen(false)}
        title="완료"
        content={
          <AlertDialog
            type="complete"
            content={
              <div>
                스팟 생성이 완료됐습니다.
                <br />
                스팟 내역은 마이페이지에서 확인할 수 있습니다.
                <br />
                이동하시겠습니까?
              </div>
            }
            onRequestClose={() => setCompleteModalIsOpen(false)}
            onRequestConfirm={() =>
              navigate(getDynamicPath.orderDetail(Number(spotId)), {
                state: { createrModeData: true },
              })
            }
          />
        }
      />
      <Modal
        size="small"
        type="warning"
        isOpen={errorModalIsOpen}
        onRequestClose={() => setErrorModalIsOpen(false)}
        title={<div style={{ color: 'white' }}>에러 발생</div>}
        content={
          <AlertDialog
            type="warning"
            content="스팟 생성 중 에러가 발생했습니다."
            onRequestConfirm={() => setErrorModalIsOpen(false)}
          />
        }
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
    </Map>
  );
};
export default KakaoMap;

const PlusBtnIcon = styled.div`
  position: absolute;
  right: 20px;
  top: 10px;
  z-index: ${Common.zIndex.common};
  cursor: pointer;
`;
