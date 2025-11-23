import {
  Badge,
  Button,
  ButtonGroup,
  Card,
  Col,
  Form,
  Row,
  Table,
} from "react-bootstrap";
import TablePlaceholderComponent from "../common/TablePlaceholderComponent";

export default function CustomerListComponent({
  data,
  pagination,
  loading,
  onPaginate,
  onSearch,
  search,
  setSearch,
  onRetrieve,
  count,
}) {
  return (
    <>
      <Card>
        <Card.Header>
          <strong>Customer List</strong>
        </Card.Header>
        <Card.Body>
          <Row>
            <Col md={8}>
              <Form.Control
                placeholder="Search customer..."
                value={search || ""}
                className="border-secondary"
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    onSearch({ search: e.target.value });
                  }
                }}
              />
            </Col>
            <Col className="d-flex justify-content-end">
              <ButtonGroup>
                {pagination?.previous ? (
                  <Button
                    variant="outline-primary"
                    onClick={() => onPaginate({ page: pagination?.previous })}
                  >
                    Previous
                  </Button>
                ) : (
                  <Button disabled variant="outline-primary">
                    Previous
                  </Button>
                )}

                {pagination?.next ? (
                  <Button
                    variant="outline-primary"
                    onClick={() => onPaginate({ page: pagination.next })}
                  >
                    Next
                  </Button>
                ) : (
                  <Button variant="outline-primary" disabled>
                    Next
                  </Button>
                )}
              </ButtonGroup>
            </Col>
          </Row>
        </Card.Body>

        {loading ? (
          <TablePlaceholderComponent
            headers={["Name", "Phone", "Email", "Created By", "Created By"]}
          />
        ) : (
          <Table className="mt-2 mb-2" striped hover>
            <thead className="border-top">
              <tr>
                <th>Name</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Created By</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((c) => (
                <tr key={c.id}>
                  <td>{c.name}</td>
                  <td>{c.phone}</td>
                  <td>{c.email}</td>
                  <td>{c.user}</td>
                  <td>
                    <Button variant="info" onClick={() => onRetrieve(c.id)}>
                      Detail
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
        <Card.Footer>
          {count && (
            <>
              You have <Badge bg="info">{count}</Badge> customer
              {count > 0 && "s"}
            </>
          )}
        </Card.Footer>
      </Card>
    </>
  );
}
