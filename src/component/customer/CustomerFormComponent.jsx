import {
  Button,
  ButtonGroup,
  Card,
  Col,
  Form,
  Row,
  Spinner,
} from "react-bootstrap";

export default function CustomerFormComponent({
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
          <strong>Customer Form</strong>
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
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  type="text"
                  name="phone"
                  value={data.phone || ""}
                  onChange={onChange}
                  disabled={loading}
                  className="border-secondary"
                />
                {validationError?.phone &&
                  validationError?.phone?.map((text, index) => (
                    <Form.Text key={index} className="text-danger">
                      {text}
                    </Form.Text>
                  ))}
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={data.email || ""}
                  onChange={onChange}
                  disabled={loading}
                  className="border-secondary"
                />
                {validationError?.email &&
                  validationError?.email?.map((text, index) => (
                    <Form.Text key={index} className="text-danger">
                      {text}
                    </Form.Text>
                  ))}
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>Address</Form.Label>
                <Form.Control
                  as="textarea"
                  name="address"
                  value={data.address || ""}
                  onChange={onChange}
                  disabled={loading}
                  className="border-secondary"
                />
                {validationError?.address &&
                  validationError?.address?.map((text, index) => (
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
