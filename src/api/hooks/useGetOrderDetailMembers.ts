import { fetchAuthInstance } from '@api/instance';
import { useQuery } from '@tanstack/react-query';

export interface OrderDetail {
  category: string;
  storeName: string;
  minimumOrderAmount: number;
  pickUpLocation: string;
  delieveryStatus: string;
  price: number;
}

const getPath = (spotId: number) => {
  return `/orders/participant/${spotId}`;
};

const getOrderDetail = async (spotId: number) => {
  const response = await fetchAuthInstance.get<OrderDetail>(getPath(spotId));
  return response.data;
};

export const useGetOrderDetailMemeber = (spotId: number) => {
  return useQuery({
    queryKey: ['participant', spotId],
    queryFn: () => getOrderDetail(spotId),
  });
};
