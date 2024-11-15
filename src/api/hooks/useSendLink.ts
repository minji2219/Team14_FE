import { fetchAuthInstance } from '@api/instance';
import { useQuery } from '@tanstack/react-query';

const getPath = (spotId: number) => {
  return `/spot/sms/${spotId}`;
};

const sendLink = async (spotId: number) => {
  const response = await fetchAuthInstance.get(getPath(spotId));
  return response.data;
};

export const useSendLink = (spotId: number) => {
  return useQuery({
    queryKey: ['link', spotId],
    queryFn: () => sendLink(spotId),
    enabled: false,
  });
};
