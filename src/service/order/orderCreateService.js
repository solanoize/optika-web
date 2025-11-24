import httpService from "../utility/httpService";

export default async function orderCreateService(order, customer, orderItems) {
  const payload = {
    ...order,
    customer: customer?.id,
    order_items: orderItems?.map((value) => {
      return {
        ...value,
        product: value?.product?.id,
      };
    }),
  };

  const config = {
    auth: true,
    method: "POST",
    body: JSON.stringify(payload),
  };

  return await httpService("/optika/orders/", config);
}
