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
  return `https://order-together.duckdns.org/api/v1/spot`;
};

const postSpot = async (postData: PostData) => {
  return await fetchAuthInstance.post(getPath(), postData);
};

export const usePostSpot = () => {
  return useMutation({
    mutationFn: (postData: PostData) => postSpot(postData),
  });
};
