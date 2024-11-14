import { fetchAuthInstance } from '@api/instance';
import { useMutation } from '@tanstack/react-query';

interface PostData {
  spotId: number;
  // price: number | null;
  // isPayed: boolean | null;
  // participantId: number | null;
}

const getPath = () => {
  return `/orders`;
};

const postParcipate = async (postData: PostData) => {
  return await fetchAuthInstance.post(getPath(), postData);
};

export const usePostParcipate = () => {
  return useMutation({
    mutationFn: (postData: PostData) => postParcipate(postData),
  });
};
