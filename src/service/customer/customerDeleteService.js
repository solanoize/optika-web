import httpService from "../utility/httpService";

export default async function customerDeleteService(id) {
  const config = {
    auth: true,
    method: "DELETE",
  };

  return await httpService(`/optika/customers/${id}/`, config);
}
