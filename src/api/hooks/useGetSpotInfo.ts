import { fetchAuthInstance, fetchInstance } from '@api/instance';
import { useQuery } from '@tanstack/react-query';

export interface StoreListParams {
  id: number;
  category: string;
  minimumOrderAmount: number;
  deadlineTime: number[];
  pickUpLocation: string;
  storeName: string;
  lat: number;
  lng: number;
}

interface RequestParams {
  lat: number;
  lng: number;
}

const getPath = ({ lat, lng }: RequestParams) => {
  return `/spot/${lat}/${lng}`;
};

const getSpotInfo = async ({ lat, lng }: RequestParams) => {
  const response = await fetchInstance.get<StoreListParams[]>(
    getPath({ lat, lng }),
  );
  return response.data.reverse();
};

export const useGetSpotInfo = ({ lat, lng }: RequestParams) => {
  return useQuery({
    queryKey: ['spotInfo', lat, lng],
    queryFn: () => getSpotInfo({ lat, lng }),
  });
};
