import { fetchAuthInstance } from '@api/instance';
import { useQuery } from '@tanstack/react-query';

export interface OrderDetail {
  cateogry: string;
  storeName: string;
  minimumOrderAmount: number;
  pickUpLocation: string;
  delieveryStatus: string;
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
    queryKey: [spotId],
    queryFn: () => getOrderDetail(spotId),
  });
};
