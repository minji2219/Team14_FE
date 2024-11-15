import { fetchAuthInstance } from '@api/instance';
import { useMutation } from '@tanstack/react-query';

interface PostData {
  lat: number;
  lng: number;
  category: string;
  storeName: string;
  minimumOrderAmount: number;
  togetherOrderLink: string;
  pickUpLocation: string;
  deadlineTime: string;
}

const getPath = () => {
  return `/spot`;
};

const putSpot = async (postData: PostData) => {
  return await fetchAuthInstance.put(getPath(), postData);
};

export const usePutSpot = () => {
  return useMutation({
    mutationFn: (postData: PostData) => putSpot(postData),
  });
};
