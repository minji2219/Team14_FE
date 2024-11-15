import { fetchAuthInstance } from '@api/instance';
import { useQuery } from '@tanstack/react-query';

interface Post {
  id: number;
  spotId: number;
  category: string;
  storeName: string;
  minimumOrderAmount: number;
  pickUpLocation: string;
  deliveryStatus: string;
  orderDate: number[];
  price?: number;
  isCreator: boolean;
}

interface OrderHistoryData {
  totalPages: number;
  totalElements: number;
  ordersInfo: Post[];
}
const getPath = () => {
  return '/orders';
};

const getOrderList = async (currentPage: number) => {
  const response = await fetchAuthInstance.get<OrderHistoryData>(getPath(), {
    params: { page: currentPage, size: 5, sort: 'createdAt,desc' },
  });
  return response.data;
};

export const useGetOrderList = (currentPage: number) => {
  return useQuery({
    queryKey: ['currentPage', currentPage],
    queryFn: () => getOrderList(currentPage),
    enabled: false,
  });
};
