import httpService from "../utility/httpService";

export default async function productUpdateService(product) {
  const config = {
    auth: true,
    method: "PUT",
    body: JSON.stringify({
      name: product.name,
      unit: product.unit,
      price: product.price,
    }),
  };

  return await httpService(`/optika/products/${product.id}/`, config);
}
