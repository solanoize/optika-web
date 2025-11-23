import httpService from "../utility/httpService";

export default async function productRetrieveService(id) {
  const config = {
    auth: true,
    method: "GET",
  };

  return await httpService(`/optika/products/${id}/`, config);
}
