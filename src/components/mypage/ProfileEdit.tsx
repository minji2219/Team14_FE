import styled from 'styled-components';

import { Common } from '@styles/globalStyle';
import Button from '@components/common/Button';
import InputField from '@components/common/InputField';
import { useState } from 'react';
import { fetchInstance } from '@api/instance';
import Cookies from 'js-cookie';

interface Props {
  phoneNumber: string;
  name: string;
  editMode: () => void;
}

const ProfileEdit = ({ editMode, phoneNumber, name }: Props) => {
  const [editPhoneNumber, setEditPhoneNumber] = useState<string>(phoneNumber);
  const [editName, setEditName] = useState<string>(name);

  const editInfo = () => {
    fetchInstance
      .put(
        'http://3.39.23.121:8080/api/v1/members',
        { nickName: editName, phoneNumber: editPhoneNumber },
        {
          headers: {
            'access-token': Cookies.get('access_token'),
          },
        },
      )
      .then((response) => {
        if (response.status === 200 && response.data) {
          console.log(response.data.message);
          editMode();
        }
      });
  };

  return (
    <div>
      <MyPageContainerMiddle>
        <MyPageInfoDescription>
          <LeftContent>닉네임 변경</LeftContent>
          <br />
          <LeftContent>전화번호 변경</LeftContent>
        </MyPageInfoDescription>
        <MyPageInfo>
          <InputField
            width="65%"
            bgColor="#EDEDED"
            value={name}
            onChange={(e) => setEditName(e.target.value)}
          />
          <Space />
          <InputField
            width="65%"
            bgColor="#EDEDED"
            value={phoneNumber}
            onChange={(e) => setEditPhoneNumber(e.target.value)}
          />
        </MyPageInfo>
      </MyPageContainerMiddle>
      <MyPageContainerBottom>
        <Button
          label="저장하기"
          bgColor={Common.colors.primary}
          onClick={editInfo}
          radius="20px"
        />
      </MyPageContainerBottom>
    </div>
  );
};

export default ProfileEdit;
const MyPageContainerMiddle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 20px 0;
`;

const MyPageInfoDescription = styled.div`
  width: 35%;
`;
const MyPageInfo = styled.div`
  width: 65%;
  margin-left: 30px;
`;

const Space = styled.div`
  height: 45px;
`;

const LeftContent = styled.p`
  font-size: 20px;
  font-weight: bold;
  text-align: end;
`;

const MyPageContainerBottom = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
