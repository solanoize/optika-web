import { Col, Form, InputGroup, Row } from "react-bootstrap";

export default function OrderFormComponent({
  data,
  validationError,
  onChange,
  loading,
  customerChoiceComponent,
  customer,
}) {
  return (
    <>
      <Row className="mb-3">
        <Col>
          <Form.Group>
            <Form.Label>Order Number</Form.Label>
            <Form.Control
              type="text"
              name="order_number"
              value={data?.order_number || ""}
              onChange={onChange}
              disabled={loading}
              className="border-secondary"
            />
            {validationError?.order_number &&
              validationError?.order_number?.map((text, index) => (
                <Form.Text key={index} className="text-danger">
                  {text}
                </Form.Text>
              ))}
          </Form.Group>
        </Col>
        <Col>
          <Form.Group>
            <Form.Label>Customer</Form.Label>

            <InputGroup>
              <Form.Control
                type="text"
                readOnly
                value={customer?.name || ""}
                disabled={loading}
                className="border-secondary"
              />
              {customerChoiceComponent && customerChoiceComponent}
            </InputGroup>
            {validationError?.customer &&
              validationError?.customer?.map((text, index) => (
                <Form.Text key={index} className="text-danger">
                  {text}
                </Form.Text>
              ))}
          </Form.Group>
        </Col>
        <Col>
          <Form.Group>
            <Form.Label>Tanggal</Form.Label>
            <Form.Control
              type="date"
              name="date"
              value={data?.date || ""}
              onChange={onChange}
              disabled={loading}
              className="border-secondary"
            />
            {validationError?.date &&
              validationError?.date?.map((text, index) => (
                <Form.Text key={index} className="text-danger">
                  {text}
                </Form.Text>
              ))}
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form.Group>
            <Form.Label>Total</Form.Label>
            <Form.Control
              type="number"
              readOnly
              value={data?.total || 0}
              onChange={onChange}
              disabled={loading}
              className="border-secondary"
            />
            {validationError?.total &&
              validationError?.total?.map((text, index) => (
                <Form.Text key={index} className="text-danger">
                  {text}
                </Form.Text>
              ))}
          </Form.Group>
        </Col>
        <Col>
          <Form.Group>
            <Form.Label>Paid Amount</Form.Label>
            <Form.Control
              type="number"
              name="paid_amount"
              value={data?.paid_amount || ""}
              onChange={onChange}
              disabled={loading}
              className="border-secondary"
            />
            {validationError?.paid_amount &&
              validationError?.paid_amount?.map((text, index) => (
                <Form.Text key={index} className="text-danger">
                  {text}
                </Form.Text>
              ))}
          </Form.Group>
        </Col>
        <Col>
          <Form.Group>
            <Form.Label>Change Amount</Form.Label>
            <Form.Control
              type="number"
              readOnly
              value={data?.change_amount | 0}
              disabled={loading}
              className="border-secondary"
            />
            {validationError?.change_amount &&
              validationError?.change_amount?.map((text, index) => (
                <Form.Text key={index} className="text-danger">
                  {text}
                </Form.Text>
              ))}
          </Form.Group>
        </Col>
      </Row>
    </>
  );
}
