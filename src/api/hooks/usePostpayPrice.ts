import { fetchAuthInstance } from '@api/instance';
import { useMutation } from '@tanstack/react-query';

interface PostData {
  orderId: number;
  price: number;
}

const getPath = () => {
  return `/orders/price`;
};

const postPayPrice = async (postData: PostData) => {
  return await fetchAuthInstance.put(getPath(), postData);
};

export const usePostPayPrice = () => {
  return useMutation({
    mutationFn: (postData: PostData) => postPayPrice(postData),
  });
};
