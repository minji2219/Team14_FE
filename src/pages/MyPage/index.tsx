import styled from '@emotion/styled';
import { useEffect, useState } from 'react';

import Menubar from '@components/mypage/Menubar';
import ProfileEdit from '@components/mypage/ProfileEdit';
import Profile from '@components/mypage/Profile';
import { fetchInstance } from '@api/instance';
import Cookies from 'js-cookie';

import { IoPersonCircleSharp } from 'react-icons/io5';

interface ProfileData {
  deliveryName: string;
  phoneNumber: string;
  point: number;
}

const MyPage = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [data, setData] = useState<ProfileData | undefined>();

  const editMode = () => {
    setIsEdit(!isEdit);
  };

  useEffect(() => {
    const token = Cookies.get('access_token');
    fetchInstance
      .get(`/members`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.status === 200 && response.data) {
          setData(response.data.data);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, [isEdit]);

  return (
    <Wrapper>
      <InnerWrapper>
        <Menubar />
        <MyPageContainer>
          <MyPageContainerTop>
            <IoPersonCircleSharp size={200} />
            <PointsBalance>
              잔여 포인트:{' '}
              {data?.point ? `${data.point.toLocaleString()}P` : '0P'}
            </PointsBalance>
          </MyPageContainerTop>

          {isEdit
            ? data && (
                <ProfileEdit
                  editMode={editMode}
                  name={data.deliveryName}
                  phoneNumber={data.phoneNumber}
                />
              )
            : data && (
                <Profile
                  editMode={editMode}
                  name={data.deliveryName}
                  phoneNumber={data.phoneNumber}
                />
              )}
        </MyPageContainer>
      </InnerWrapper>
    </Wrapper>
  );
};

export default MyPage;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const InnerWrapper = styled.div`
  width: 60%;
  margin-bottom: 20px;
`;
const MyPageContainer = styled.div`
  width: 100%;
`;

const MyPageContainerTop = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const PointsBalance = styled.p`
  font-size: 20px;
  font-weight: bold;
`;
