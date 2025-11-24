import { useCallback, useEffect, useState } from "react";
import productListService from "../../service/product/productListService";
import ValidationDetailException from "../../exception/ValidationDetailException";
import Swal from "sweetalert2";
import { Card, Col, Row } from "react-bootstrap";
import ProductListComponent from "../../component/product/ProductListComponent";
import SearchComponent from "../../component/common/SearchComponent";
import PaginateComponent from "../../component/common/PaginateComponent";
import CountComponent from "../../component/common/CountComponent";

export default function ProductChoiseEmbedWidget({ onTransfer }) {
  const [products, setProducts] = useState([]);

  const [listLoading, setListLoading] = useState(false);

  const [count, setCount] = useState();
  const [pagination, setPagination] = useState({ next: null, previous: null });
  const [search, setSearch] = useState("");

  const onList = useCallback(async (filterset = {}) => {
    setListLoading(true);

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
      } else {
        console.log(error);
      }
    } finally {
      setListLoading(false);
    }
  }, []);

  const onRetrieve = async (data) => {
    onTransfer(data);
  };

  useEffect(() => {
    const fetchData = async () => {
      onList();
    };

    fetchData();
  }, [onList]);

  return (
    <>
      <Card>
        <Card.Header>
          <strong>Product Choice</strong>
        </Card.Header>
        <Card.Body>
          <Row>
            <Col>
              <SearchComponent
                onSearch={onList}
                search={search}
                setSearch={setSearch}
              />
            </Col>
            <Col>
              <PaginateComponent onPaginate={onList} pagination={pagination} />
            </Col>
          </Row>
        </Card.Body>
        <ProductListComponent
          data={products}
          loading={listLoading}
          onRetrieve={onRetrieve}
        />
        <Card.Footer>
          <CountComponent count={count} />
        </Card.Footer>
      </Card>
    </>
  );
}
