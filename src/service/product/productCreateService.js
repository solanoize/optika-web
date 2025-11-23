import httpService from "../utility/httpService";

export default async function productCreateService(product) {
  const config = {
    auth: true,
    method: "POST",
    body: JSON.stringify(product),
  };

  return await httpService("/optika/products/", config);
}
