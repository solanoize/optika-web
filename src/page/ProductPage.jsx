import { useCallback, useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import ProductFormComponent from "../component/product/ProductFormComponent";
import ProductListComponent from "../component/product/ProductListComponent";
import NavbarComponent from "../component/common/NavbarComponent";
import { UX_FEEDBACK_CONFIRM, UX_FEEDBACK_SUCCESS } from "../constant/messages";
import Swal from "sweetalert2";
import productListService from "../service/product/productListService";
import ValidationDetailException from "../exception/ValidationDetailException";
import ValidationErrorException from "../exception/ValidationErrorException";
import productCreateService from "../service/product/productCreateService";
import productRetrieveService from "../service/product/productRetrieveService";
import productUpdateService from "../service/product/productUpdateService";
import productDeleteService from "../service/product/productDeleteService";
import { INTIAL_PRODUCT } from "../constant/product";

export default function ProductPage() {
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState(INTIAL_PRODUCT);

  const [listLoading, setListLoading] = useState(false);
  const [createLoading, setCreateLoading] = useState(false);
  const [retrieveLoading, setRetrieveLoading] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const [count, setCount] = useState();
  const [pagination, setPagination] = useState({ next: null, previous: null });
  const [search, setSearch] = useState("");
  const [validationError, setValidationError] = useState();

  const onList = useCallback(async (filterset = {}) => {
    setListLoading(true);
    setValidationError(null);

    try {
      const data = await productListService(filterset);
      setProducts(data?.results);
      setPagination({ next: data?.next, previous: data.previous });
      setSearch(data?.search);
      setCount(data?.count);
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
      setListLoading(false);
    }
  }, []);

  const onCreate = async () => {
    setCreateLoading(true);
    setValidationError(null);

    try {
      await productCreateService(product);
      await onList();
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

  const onRetrieve = async (object) => {
    setRetrieveLoading(true);
    setValidationError(null);

    try {
      const data = await productRetrieveService(object?.id);
      setProduct(data);
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
      setRetrieveLoading(false);
    }
  };

  const onUpdate = async () => {
    setUpdateLoading(true);
    setValidationError(null);

    try {
      await productUpdateService(product);
      Swal.fire(UX_FEEDBACK_SUCCESS.update);
      onReset();
      await onList();
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
      setUpdateLoading(false);
    }
  };

  const onDelete = async () => {
    setDeleteLoading(true);
    setValidationError(null);

    try {
      const result = await Swal.fire(UX_FEEDBACK_CONFIRM.delete);

      if (result.isConfirmed) {
        await productDeleteService(product.id);
        Swal.fire(UX_FEEDBACK_SUCCESS.delete);
        onReset();
        await onList();
      }
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
      setDeleteLoading(false);
    }
  };

  const onChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setProduct((val) => ({ ...val, [name]: value }));
  };

  const onReset = useCallback(() => {
    setProduct(INTIAL_PRODUCT);
    setValidationError(null);
  }, []);

  const onSave = () => {
    if (product.id) {
      onUpdate();
    } else {
      onCreate();
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      onList();
    };

    fetchData();
  }, [onList]);

  return (
    <>
      <NavbarComponent />
      <Container className="mt-4 mb-4">
        <Row className="mb-3">
          <Col>
            <h5>Product</h5>
          </Col>
        </Row>
        <Row className="mb-4">
          <Col>
            <ProductFormComponent
              data={product}
              validationError={validationError}
              onSave={onSave}
              onDelete={onDelete}
              onChange={onChange}
              loading={
                createLoading ||
                updateLoading ||
                retrieveLoading ||
                deleteLoading
              }
              onReset={onReset}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <ProductListComponent
              data={products}
              pagination={pagination}
              loading={listLoading}
              onPaginate={onList}
              onSearch={onList}
              search={search}
              setSearch={setSearch}
              onRetrieve={onRetrieve}
              count={count}
            />
          </Col>
        </Row>
      </Container>
    </>
  );
}
