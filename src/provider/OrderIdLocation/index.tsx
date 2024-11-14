export const setOrderId = (id: string) => {
  localStorage.setItem('orderId', id);
};

export const getOrderId = (): string | null => localStorage.getItem('orderId');
