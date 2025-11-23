import { useCallback, useEffect, useState } from "react";
import ValidationDetailException from "../exception/ValidationDetailException";
import Swal from "sweetalert2";
import ValidationErrorException from "../exception/ValidationErrorException";
import customerListService from "../service/customer/customerListService";
import NavbarComponent from "../component/common/NavbarComponent";
import { Col, Container, Row } from "react-bootstrap";
import CustomerListComponent from "../component/customer/CustomerListComponent";
import customerCreateService from "../service/customer/customerCreateService";
import { INITIAL_CUSTOMER } from "../constant/customer";
import { UX_FEEDBACK_CONFIRM, UX_FEEDBACK_SUCCESS } from "../constant/messages";
import CustomerFormComponent from "../component/customer/CustomerFormComponent";
import customerRetrieveService from "../service/customer/customerRetrieveService";
import customerUpdateService from "../service/customer/customerUpdateService";

export default function CustomerPage() {
  const [customers, setCustomers] = useState([]);
  const [customer, setCustomer] = useState(INITIAL_CUSTOMER);

  const [listLoading, setListLoading] = useState(false);
  const [createLoading, setCreateLoading] = useState(false);
  const [retrieveLoading, setRetrieveLoading] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const [count, setCount] = useState(null);
  const [pagination, setPagination] = useState({ next: null, previous: null });
  const [search, setSearch] = useState("");
  const [validationError, setValidationError] = useState();

  const onList = useCallback(async (filterset = {}) => {
    setListLoading(true);
    setValidationError(null);

    try {
      const data = await customerListService(filterset);
      setCustomers(data?.results);
      setPagination({ next: data?.next, previous: data?.previous });
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
      await customerCreateService(customer);
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

  const onRetrieve = async (id) => {
    setRetrieveLoading(true);
    setValidationError(null);

    try {
      const data = await customerRetrieveService(id);
      setCustomer(data);
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
      await customerUpdateService(customer);
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
        // await customerDeleteService(product.id);
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

    setCustomer((val) => ({ ...val, [name]: value }));
  };

  const onReset = useCallback(() => {
    setCustomer(INITIAL_CUSTOMER);
    setValidationError(null);
  }, []);

  const onSave = () => {
    if (customer.id) {
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
            <h5>Customer</h5>
          </Col>
        </Row>
        <Row className="mb-4">
          <Col>
            <CustomerFormComponent
              data={customer}
              validationError={validationError}
              onSave={onSave}
              onChange={onChange}
              onDelete={onDelete}
              loading={
                createLoading ||
                retrieveLoading ||
                updateLoading ||
                deleteLoading
              }
              onReset={onReset}
            />
          </Col>
        </Row>
        <Row className="mb-4">
          <Col>
            <CustomerListComponent
              data={customers}
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
