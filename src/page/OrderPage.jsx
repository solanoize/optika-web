import { useCallback, useEffect, useState } from "react";
import { INITIAL_ORDER } from "../constant/order";
import NavbarComponent from "../component/common/NavbarComponent";
import {
  Button,
  ButtonGroup,
  Card,
  Col,
  Container,
  Row,
} from "react-bootstrap";
import ProductChoiseEmbedWidget from "../widgets/product/ProductChoiseEmbedWidget";
import { INTIAL_PRODUCT } from "../constant/product";
import OrderFormComponent from "../component/order/OrderFormComponent";
import { INITIAL_CUSTOMER } from "../constant/customer";
import ValidationDetailException from "../exception/ValidationDetailException";
import Swal from "sweetalert2";
import ValidationErrorException from "../exception/ValidationErrorException";
import { UX_FEEDBACK_SUCCESS } from "../constant/messages";
import orderCreateService from "../service/order/orderCreateService";
import CustomerChoiseModalWidget from "../widgets/customer/CustomerChoiseModalWidget";
import OrderItemListComponent from "../component/order/OrderItemListComponent";

export default function OrderPage() {
  const [order, setOrder] = useState(INITIAL_ORDER);
  const [orderItems, setOrderItems] = useState([]);
  const [product, setProduct] = useState(INTIAL_PRODUCT);
  const [customer, setCustomer] = useState(INITIAL_CUSTOMER);

  const [createLoading, setCreateLoading] = useState(false);

  const [validationError, setValidationError] = useState();

  const onChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setOrder((val) => ({ ...val, [name]: value }));
  };

  const onCreate = async () => {
    setCreateLoading(true);
    setValidationError(null);

    try {
      await orderCreateService(order, customer, orderItems);
      onReset();
      Swal.fire(UX_FEEDBACK_SUCCESS.create);
    } catch (error) {
      if (error instanceof ValidationDetailException) {
        Swal.fire({
          title: "Ups!",
          text: error?.data?.detail,
          icon: "warning",
        });
      } else if (error instanceof ValidationErrorException) {
        setValidationError(error.data);
      } else {
        console.log(error);
      }
    } finally {
      setCreateLoading(false);
    }
  };

  const onDelete = (object) => {
    setOrderItems((prev) =>
      prev.filter((item) => item?.product?.id !== object?.product?.id)
    );
  };

  const onReset = useCallback(() => {
    setCustomer(INITIAL_CUSTOMER);
    setProduct(INTIAL_PRODUCT);
    setOrder(INITIAL_ORDER);
    setOrderItems([]);
    setValidationError(null);
  }, []);

  useEffect(() => {
    const action = () => {
      if (product?.id) {
        setOrderItems((prev) => {
          const exists = prev.some((item) => item?.product?.id === product.id);
          if (!exists) {
            // kalau belum ada, tambah baru
            return [
              ...prev,
              {
                product,
                quantity: 1,
                price: product?.price,
                subtotal: product?.price * 1,
              },
            ];
          }

          // kalau sudah ada → quantity++ dan update subtotal
          return prev.map((item) => {
            if (item.product.id === product.id) {
              const newQty = item.quantity + 1;
              return {
                ...item,
                quantity: newQty,
                subtotal: item.price * newQty,
              };
            }

            return item;
          });
        });
      }
    };

    action();
  }, [product]);

  useEffect(() => {
    const action = () => {
      if (orderItems.length > 0) {
        const total = orderItems.reduce((sum, item) => sum + item.subtotal, 0);
        setOrder((val) => ({ ...val, total }));
      } else {
        setOrder((val) => ({ ...val, total: 0 }));
      }
    };

    action();
  }, [orderItems]);

  useEffect(() => {
    const action = () => {
      setOrder((prev) => {
        const change = prev.paid_amount - prev.total;

        return {
          ...prev,
          change_amount: change > 0 ? change : 0, // tidak boleh minus
        };
      });
    };

    action();
  }, [order.paid_amount, order.total]);

  return (
    <>
      <NavbarComponent />
      <Container className="mt-4 mb-4">
        <Row className="mb-3">
          <Col>
            <h5>Order</h5>
          </Col>
        </Row>
        <Row className="mb-4">
          <Col>
            <Card>
              <Card.Header>
                <strong>Order Form</strong>
              </Card.Header>
              <Card.Body>
                <OrderFormComponent
                  data={order}
                  customer={customer}
                  validationError={validationError}
                  onChange={onChange}
                  loading={createLoading}
                  customerChoiceComponent={
                    <CustomerChoiseModalWidget onTransfer={setCustomer} />
                  }
                />
              </Card.Body>
              <Card.Footer>
                <ButtonGroup>
                  <Button
                    onClick={onReset}
                    disabled={createLoading}
                    variant="warning"
                  >
                    Reset
                  </Button>
                  <Button disabled={createLoading} onClick={onCreate}>
                    Save
                  </Button>
                </ButtonGroup>
              </Card.Footer>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col>
            <Card>
              <Card.Header>
                <strong>Order Items</strong>
              </Card.Header>
              <OrderItemListComponent
                data={orderItems}
                onDelete={onDelete}
                validationError={validationError}
              />
            </Card>
          </Col>
          <Col md={4}>
            <ProductChoiseEmbedWidget
              onTransfer={(p) => setProduct({ ...p })}
            />
          </Col>
        </Row>
      </Container>
    </>
  );
}
