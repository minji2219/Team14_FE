import styled from '@emotion/styled';

import Menubar from '@components/mypage/Menubar';
import PointListItem from '@components/point/PointListItem';
import Button from '@components/common/Button';
import MyPoint from '@components/common/MyPoint';

import { useEffect, useState } from 'react';
import { Common } from '@styles/globalStyle';
// import Cookies from 'js-cookie';
import { fetchInstance } from '@api/instance';

interface PointData {
  amount: number;
  date: Date;
}

const PointPage = () => {
  type PointFilter = '충전' | '결제' | '환전';
  const [pointFilterValue, setPointFilterValue] = useState<PointFilter>('충전');
  const [pointData, setPointData] = useState<PointData[]>();

  const changePointFilter = (filter: PointFilter) => {
    setPointFilterValue(filter);
  };

  // const filteredPointData = pointDataSet.filter(
  //   (pointData) => pointData.filter === pointFilterValue,
  // );

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const token = Cookies.get('access_token');
        const response = await fetchInstance.get(
          'http://43.203.132.224:8080/api/v1/payments/history',
          {
            params: { paymentStatus: 'SUCCESS' },
            headers: {
              Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI1IiwiaWF0IjoxNzMxNTA2MzcwLCJleHAiOjUzMzE1MDYzNzB9.u4U-UL0ANUxHRg97sY3xOILmSqEeKUDbULqUWPUkmLE`,
            },
          },
        );

        console.log('Response data:', response);

        if (response.status === 200 && response.data) {
          setPointData(response.data.histories);
          console.log(response.data);
        }
      } catch (error) {
        console.error('Point Page', error);
      }
    };

    fetchData();
  }, []);

  return (
    <Wrapper>
      <InnerWrapper>
        <Menubar />
        <MyPoint />
        <PaymentBox>
          <Button
            label="충전하기"
            radius="20px"
            bgColor={Common.colors.primary}
            padding="9px 25px"
          />
          <Space />
          <Button
            label="환전하기"
            radius="20px"
            bgColor={Common.colors.primary05}
            padding="9px 25px"
          />
        </PaymentBox>
        <FilterBox>
          <Button
            label="충전"
            radius="20px"
            onClick={() => changePointFilter('충전')}
            bgColor={pointFilterValue === '충전' ? '#000' : '#FFF'}
            style={{
              color: pointFilterValue === '충전' ? '#FFF' : '#000',
              border: '1px solid #000',
            }}
          />
          <Space />
          <Button
            label="결제"
            radius="20px"
            onClick={() => changePointFilter('결제')}
            bgColor={pointFilterValue === '결제' ? '#000' : '#FFF'}
            style={{
              color: pointFilterValue === '결제' ? '#FFF' : '#000',
              border: '1px solid #000',
            }}
          />
          <Space />
          <Button
            label="환전"
            radius="20px"
            onClick={() => changePointFilter('환전')}
            bgColor={pointFilterValue === '환전' ? '#000' : '#FFF'}
            style={{
              color: pointFilterValue === '환전' ? '#FFF' : '#000',
              border: '1px solid #000',
            }}
          />
        </FilterBox>
        <PointList>
          {pointData?.map((point) => (
            <PointListItem
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

const PaymentBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;

const FilterBox = styled.div`
  width: 80%;
  display: flex;
`;

const PointList = styled.div`
  position: relative;
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-bottom: 1px solid #ccc;
  margin: 20px 0 20px;
`;

const Space = styled.div`
  width: 15px;
`;
