import { fetchAuthInstance } from '@api/instance';
import { useQuery } from '@tanstack/react-query';

export interface OrderDetail {
  category: string;
  storeName: string;
  minimumOrderAmount: number;
  pickUpLocation: string;
  deliveryStatus: string;
  price: number;
  orderDate: number[];
  memberInfo: MemberInfo[];
}

interface MemberInfo {
  memeberId: number;
  deliveryName: string;
  price: number;
  isPayed: boolean;
}

const getPath = (spotId: number) => {
  return `/orders/creator/${spotId}`;
};

const getOrderDetail = async (spotId: number) => {
  const response = await fetchAuthInstance.get<OrderDetail>(getPath(spotId));
  return response.data;
};

export const useGetOrderDetailCreater = (spotId: number) => {
  return useQuery({
    queryKey: ['spotdata', spotId],
    queryFn: () => getOrderDetail(spotId),
  });
};
