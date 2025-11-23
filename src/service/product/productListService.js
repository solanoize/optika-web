import httpService from "../utility/httpService";

export default async function productListService(filterset = {}) {
  const config = {
    auth: true,
    method: "GET",
  };

  let path = "/optika/products/";

  if (filterset?.search) {
    const params = new URLSearchParams({ search: filterset?.search });
    path = `${path}?${params}`;
  } else if (filterset?.page) {
    path = filterset?.page;
  }

  return await httpService(path, config);
}
