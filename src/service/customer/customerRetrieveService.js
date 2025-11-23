import httpService from "../utility/httpService";

export default async function customerRetrieveService(id) {
  const config = {
    auth: true,
    method: "GET",
  };

  return await httpService(`/optika/customers/${id}/`, config);
}
