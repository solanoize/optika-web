import { useCallback, useState } from "react";
import ValidationDetailException from "../../exception/ValidationDetailException";
import Swal from "sweetalert2";
import customerListService from "../../service/customer/customerListService";
import customerRetrieveService from "../../service/customer/customerRetrieveService";
import { Button, Modal } from "react-bootstrap";
import CustomerListComponent from "../../component/customer/CustomerListComponent";

export default function CustomerChoiseModalWidget({ onTransfer }) {
  const [customers, setCustomers] = useState([]);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [listLoading, setListLoading] = useState(false);
  const [retrieveLoading, setRetrieveLoading] = useState(false);

  const [count, setCount] = useState();
  const [pagination, setPagination] = useState({ next: null, previous: null });
  const [search, setSearch] = useState("");

  const onList = useCallback(async (filterset) => {
    setListLoading(true);

    try {
      const data = await customerListService(filterset);
      setCustomers(data?.results);
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
      } else {
        console.log(error);
      }
    } finally {
      setListLoading(false);
    }
  }, []);

  const onRetrieve = async (id) => {
    setRetrieveLoading(true);

    try {
      const data = await customerRetrieveService(id);
      onTransfer(data);
      handleClose();
    } catch (error) {
      if (error instanceof ValidationDetailException) {
        Swal.fire({
          title: "Ups!",
          text: error?.data?.detail,
          icon: "warning",
        });
      } else {
        console.log(error);
      }
    } finally {
      setRetrieveLoading(false);
    }
  };

  return (
    <>
      <Button onClick={handleShow}>Customer</Button>

      <Modal show={show} onHide={handleClose} onEnter={onList} size="lg">
        <Modal.Body>
          <CustomerListComponent
            data={customers}
            pagination={pagination}
            loading={listLoading || retrieveLoading}
            onPaginate={onList}
            onSearch={onList}
            setSearch={setSearch}
            search={search}
            onRetrieve={onRetrieve}
            count={count}
          />
        </Modal.Body>
      </Modal>
    </>
  );
}
