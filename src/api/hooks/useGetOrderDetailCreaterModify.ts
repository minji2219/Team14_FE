import { fetchAuthInstance } from '@api/instance';
import { useQuery } from '@tanstack/react-query';

interface OrderDetail {
  cateogry: string;
  storeName: string;
  minimumOrderAmount: number;
  deadlineTime: string;
  togetherOrderLink: string;
  pickUpLocation: string;
  lat: number;
  lng: number;
}

const getPath = (spotId: number) => {
  return `/spot/${spotId}`;
};

const getOrderDetailModify = async (spotId: number) => {
  const response = await fetchAuthInstance.get<OrderDetail>(getPath(spotId));
  return response.data;
};

export const useGetOrderDetailModify = (spotId: number) => {
  return useQuery({
    queryKey: ['modify', spotId],
    queryFn: () => getOrderDetailModify(spotId),
    enabled: false,
  });
};
