import { INITIAL_CUSTOMER } from "./customer";
import { INTIAL_PRODUCT } from "./product";

export const INITIAL_ORDER = {
  order_number: "",
  customer: INITIAL_CUSTOMER,
  date: "",
  paid_mount: 0,
  change_mount: 0,
};

export const INITIAL_ORDER_ITEM = {
  product: INTIAL_PRODUCT,
  quantity: 0,
  price: 0,
  subtotal: 0,
};
