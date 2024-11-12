import { fetchAuthInstance, fetchInstance } from '@api/instance';
import { useQuery } from '@tanstack/react-query';

export interface OrderDetail {
  cateogry: string;
  storeName: string;
  minimumOrderAmount: number;
  pickUpLocation: string;
  delieveryStatus: boolean;
  memeberInfo: memeberInfo[];
  //TODO: 현재 명세에는 없지만, 추가되어야함(스팟 수정 때문에)
  // deadlineTime:string;
  // togetherOrderLink:string;
  // lat:number;
  // lng:number;
}

interface memeberInfo {
  memeberId: number;
  deliveryName: string;
  price: number;
  isPayed: boolean;
}

const getPath = (spotId: number) => {
  //BaseURL 재영님꺼로 변경
  return `http://3.34.191.43:8080/api/v1/orders/creator/${spotId}`;
};

const getOrderDetail = async (spotId: number) => {
  const response = await fetchAuthInstance.get<OrderDetail>(getPath(spotId));
  return response.data;
};

export const useGetOrderDetail = (spotId: number) => {
  return useQuery({
    queryKey: [spotId],
    queryFn: () => getOrderDetail(spotId),
  });
};
