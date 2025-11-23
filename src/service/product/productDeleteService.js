import httpService from "../utility/httpService";

export default async function productDeleteService(id) {
  const config = {
    auth: true,
    method: "DELETE",
  };

  return await httpService(`/optika/products/${id}/`, config);
}
