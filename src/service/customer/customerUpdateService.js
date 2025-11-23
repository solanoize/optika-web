import httpService from "../utility/httpService";

export default async function customerUpdateService(customer) {
  const config = {
    auth: true,
    method: "PUT",
    body: JSON.stringify({
      name: customer.name,
      phone: customer.phone,
      email: customer.email,
      address: customer.address,
    }),
  };

  return await httpService(`/optika/customers/${customer.id}/`, config);
}
