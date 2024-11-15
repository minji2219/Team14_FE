import styled from '@emotion/styled';

import Menubar from '@components/mypage/Menubar';
import PointListItem from '@components/point/PointListItem';
import Button from '@components/common/Button';
import MyPoint from '@components/common/MyPoint';

import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { fetchInstance } from '@api/instance';
import Cookies from 'js-cookie';

interface PointData {
  amount: number;
  date: string;
}

const PointPage = () => {
  const location = useLocation();
  const [pointData, setPointData] = useState<PointData[]>();

  const fetchData = async () => {
    try {
      const token = Cookies.get('access_token');
      const response = await fetchInstance.get('/payments/history', {
        params: { paymentStatus: 'SUCCESS' },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200 && response.data) {
        setPointData(response.data.data.histories);
      }
    } catch (error) {
      console.error('Point Page', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (location.state?.refresh) {
      fetchData();
    }
  }, [location.state]);

  return (
    <Wrapper>
      <InnerWrapper>
        <Menubar />
        <MyPoint showRechargeButton />

        <FilterBox>
          <Button
            label="충전"
            radius="20px"
            bgColor="#000"
            style={{
              color: '#FFF',
              border: '1px solid #000',
              cursor: 'default',
            }}
          />
        </FilterBox>
        <PointList>
          {pointData?.map((point) => (
            <PointListItem
              key={point.date}
              date={point.date}
              point={point.amount}
              filter="충전"
            />
          ))}
        </PointList>
      </InnerWrapper>
    </Wrapper>
  );
};

export default PointPage;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const InnerWrapper = styled.div`
  width: 60%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FilterBox = styled.div`
  width: 60%;
  display: flex;
`;

const PointList = styled.div`
  position: relative;
  width: 60%;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-bottom: 1px solid #ccc;
  margin: 20px 0 20px;
`;
