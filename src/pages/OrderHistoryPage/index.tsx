import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import Menubar from '@components/mypage/Menubar';
import OrderListItem from '@components/OrderHistory/OrderListItem';

import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';
import { getDynamicPath } from '@routes/path';
import { fetchInstance } from '@api/instance';
import Cookies from 'js-cookie';

interface Post {
  id: number;
  spotId: number;
  category: string;
  storeName: string;
  minimumOrderAmount: number;
  pickUpLocation: string;
  deliveryStatus: string;
  price?: number;
  isCreator: boolean;
}

interface OrderHistoryData {
  totalPages: number;
  totalElements: number;
  ordersInfo: Post[];
}

const OrderHistoryPage = () => {
  const VIEW_PAGE_COUNT = 5;
  const [orderHistoryData, setOrderHistoryData] = useState<OrderHistoryData>();
  const [data, setData] = useState<Post[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const pageNumbers = Array.from(
    { length: orderHistoryData?.totalPages || 0 },
    (_, i) => i + 1,
  );

  const startPage =
    Math.floor((currentPage - 1) / VIEW_PAGE_COUNT) * VIEW_PAGE_COUNT + 1;
  const endPage = Math.min(
    startPage + VIEW_PAGE_COUNT - 1,
    orderHistoryData?.totalPages || 0,
  );
  const visiblePages = pageNumbers.slice(startPage - 1, endPage);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= (orderHistoryData?.totalPages || 0)) {
      setCurrentPage(page);
    }
  };

  useEffect(() => {
    const token = Cookies.get('access_token');
    fetchInstance
      .get('/orders', {
        params: { page: currentPage, size: 3, sort: 'createdAt,desc' },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.status === 200 && response.data) {
          setOrderHistoryData(response.data);
          setData(response.data.ordersInfo);
        }
      })
      .catch((error) => {
        console.error('OrderHistoryPage:', error);
      });
  }, [currentPage]);

  return (
    <Wrapper>
      <InnerWrapper>
        <Menubar />
        <OrderListContainer>
          {data.length === 0 ? (
            <div style={{ width: '100%' }}>주문내역이 없습니다.</div>
          ) : (
            data.map((post) => (
              <Link
                key={post.id}
                to={getDynamicPath.orderDetail(post.spotId)}
                state={{ createrModeData: post.isCreator }}
                style={{ textDecoration: 'none', color: '#000' }}
              >
                <OrderListItem
                  category={post.category}
                  storeName={post.storeName}
                  pickUpLocation={post.pickUpLocation}
                  price={post.price}
                  deliveryStatus={post.deliveryStatus}
                />
              </Link>
            ))
          )}
        </OrderListContainer>
      </InnerWrapper>
      <InnerWrapper>
        <PagenationUl>
          {startPage > 1 && (
            <PrevBtn onClick={() => handlePageChange(currentPage - 1)}>
              <HiChevronLeft />
              이전
            </PrevBtn>
          )}
          {visiblePages.map((page) => (
            <PageNumber
              key={page}
              onClick={() => handlePageChange(page)}
              isActive={page === currentPage}
            >
              {page}
            </PageNumber>
          ))}
          {endPage < (orderHistoryData?.totalPages || 0) && (
            <NextBtn onClick={() => handlePageChange(currentPage + 1)}>
              다음 <HiChevronRight />
            </NextBtn>
          )}
        </PagenationUl>
      </InnerWrapper>
    </Wrapper>
  );
};

export default OrderHistoryPage;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const InnerWrapper = styled.div`
  width: 60%;
`;

const OrderListContainer = styled.div`
  width: 100%;
`;
const PagenationUl = styled.ul`
  width: 100%;
  list-style: none;
  margin: 40px 0;
  padding-inline-start: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  color: #7e7e7e;
`;
const PrevBtn = styled.li`
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-right: 10px;
  font-weight: bold;
`;

const NextBtn = styled.li`
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-left: 10px;
  font-weight: bold;
`;

const PageNumber = styled.li<{ isActive: boolean }>`
  box-sizing: border-box;
  width: 35px;
  height: 35px;
  margin: 0 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  cursor: pointer;
  color: ${(props) => (props.isActive ? '#FFF' : '#7E7E7E')};
  background-color: ${(props) => (props.isActive ? '#059770' : null)};
  border-radius: 50%;
`;
