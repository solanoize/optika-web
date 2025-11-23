import {
  Button,
  ButtonGroup,
  Card,
  Col,
  Form,
  Row,
  Spinner,
} from "react-bootstrap";

export default function ProductFormComponent({
  data,
  validationError,
  onSave,
  onChange,
  loading,
  onReset,
  onDelete,
}) {
  return (
    <>
      <Card>
        <Card.Header>
          <strong>Product Form</strong>
          {loading && (
            <>
              {" "}
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />
            </>
          )}
        </Card.Header>
        <Card.Body>
          <Row className="mb-3">
            <Col>
              <Form.Group>
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={data.name || ""}
                  onChange={onChange}
                  disabled={loading}
                  className="border-secondary"
                />
                {validationError?.name &&
                  validationError?.name?.map((text, index) => (
                    <Form.Text key={index} className="text-danger">
                      {text}
                    </Form.Text>
                  ))}
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>Unit</Form.Label>
                <Form.Control
                  type="text"
                  name="unit"
                  value={data.unit || ""}
                  onChange={onChange}
                  disabled={loading}
                  className="border-secondary"
                />
                {validationError?.unit &&
                  validationError?.unit?.map((text, index) => (
                    <Form.Text key={index} className="text-danger">
                      {text}
                    </Form.Text>
                  ))}
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>Stock</Form.Label>
                <Form.Control
                  type="number"
                  name="stock"
                  value={data.stock || 0}
                  onChange={onChange}
                  disabled={loading || data?.id}
                  className="border-secondary"
                />
                {validationError?.stock &&
                  validationError?.stock?.map((text, index) => (
                    <Form.Text key={index} className="text-danger">
                      {text}
                    </Form.Text>
                  ))}
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="number"
                  name="price"
                  value={data.price || 0}
                  onChange={onChange}
                  disabled={loading}
                  className="border-secondary"
                />
                {validationError?.price &&
                  validationError?.price?.map((text, index) => (
                    <Form.Text key={index} className="text-danger">
                      {text}
                    </Form.Text>
                  ))}
              </Form.Group>
            </Col>
          </Row>
        </Card.Body>
        <Card.Footer>
          <ButtonGroup>
            <Button onClick={onReset} variant="warning">
              Reset
            </Button>
            <Button onClick={onSave} disabled={loading}>
              Save
            </Button>

            <Button
              disabled={!data?.id || loading}
              onClick={onDelete}
              variant="danger"
            >
              Delete
            </Button>
          </ButtonGroup>
        </Card.Footer>
      </Card>
    </>
  );
}
