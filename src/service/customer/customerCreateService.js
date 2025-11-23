import httpService from "../utility/httpService";

export default async function customerCreateService(customer) {
  const config = {
    auth: true,
    method: "POST",
    body: JSON.stringify(customer),
  };

  return await httpService("/optika/customers/", config);
}
