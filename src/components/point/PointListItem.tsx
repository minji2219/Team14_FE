import styled from '@emotion/styled';

interface Props {
  date: string;
  point: number;
  filter: string;
}

const PointListItem = ({ date, point, filter }: Props) => {
  const newPoint: string = point.toLocaleString('ko-KR');

  const splitDate = (date: string) => {
    const days = date.split(' ')[0];
    const times = date.split(' ')[1];

    return {
      month: days.split('-')[1],
      day: days.split('-')[2],
      hour: times.split(':')[0],
      minute: times.split(':')[1],
    };
  };
  return (
    <Container>
      <DateTitle>
        {splitDate(date).month}.{splitDate(date).day}
      </DateTitle>
      <DetailContainer>
        <Point>{newPoint}P</Point>
        <PointInfo>
          <Time>
            {splitDate(date).hour}:{splitDate(date).minute} {filter}
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
