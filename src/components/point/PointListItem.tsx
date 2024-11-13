import styled from '@emotion/styled';

interface Props {
  date: Date;
  point: number;
  filter: string;
}

const PointListItem = ({ date, point, filter }: Props) => {
  const newDate = `${(date.getMonth() + 1).toString().padStart(2, '0')}.${date.getDate().toString().padStart(2, '0')}`;
  const newTime = `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
  const newPoint: string = point.toLocaleString('ko-KR');

  return (
    <Container>
      <DateTitle>{newDate}</DateTitle>
      <DetailContainer>
        <Point>{newPoint}P</Point>
        <PointInfo>
          <Time>
            {newTime} {filter}
          </Time>
        </PointInfo>
      </DetailContainer>
    </Container>
  );
};

export default PointListItem;

const Container = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  padding: 10px 30px;
  border-top: 1px solid #ccc;
  box-sizing: border-box;
`;

const DateTitle = styled.p`
  font-size: 13px;
  color: #909090;
`;

const DetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  margin-left: 50px;
`;

const Point = styled.span`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 5px;
`;
const PointInfo = styled.div`
  display: flex;
  align-items: center;
`;

const Time = styled.span`
  font-size: 13px;
  color: #909090;
`;
