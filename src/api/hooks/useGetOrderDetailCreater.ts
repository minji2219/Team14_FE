import { fetchAuthInstance } from '@api/instance';
import { useQuery } from '@tanstack/react-query';

export interface OrderDetail {
  cateogry: string;
  storeName: string;
  minimumOrderAmount: number;
  pickUpLocation: string;
  delieveryStatus: boolean;
  memeberInfo: memeberInfo[];
}

interface memeberInfo {
  memeberId: number;
  deliveryName: string;
  price: number;
  isPayed: boolean;
}

const getPath = (spotId: number) => {
  //BaseURL 재영님꺼로 변경필요
  return `http://3.34.191.43:8080/api/v1/orders/creator/${spotId}`;
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
