import { Alert, Button, Form, Table } from "react-bootstrap";

export default function OrderItemListComponent({
  data,
  onDelete,
  validationError,
}) {
  return (
    <>
      <Table striped hover responsive>
        <thead>
          <tr>
            <th>Product</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Subtotal</th>
            <th>Actions</th>
          </tr>
        </thead>
        {validationError?.order_items &&
          validationError?.order_items?.map((text, index) => (
            <tbody key={index}>
              <tr>
                <td colSpan={5}>
                  <Alert variant="danger">{text}</Alert>
                </td>
              </tr>
            </tbody>
          ))}
        <tbody>
          {data?.map((value, index) => (
            <tr key={index}>
              <td>
                {value?.product?.name}

                {validationError?.order_items?.[index]?.product?.map(
                  (text, i) => (
                    <>
                      <br />
                      <Form.Text key={i} className="text-danger">
                        {text}
                      </Form.Text>
                    </>
                  )
                )}
              </td>
              <td>
                {value.quantity}
                {validationError?.order_items?.[index]?.quantity?.map(
                  (text, i) => (
                    <>
                      <br />
                      <Form.Text key={i} className="text-danger">
                        {text}
                      </Form.Text>
                    </>
                  )
                )}
              </td>
              <td>
                {value.price}
                {validationError?.order_items?.[index]?.price?.map(
                  (text, i) => (
                    <>
                      <br />
                      <Form.Text key={i} className="text-danger">
                        {text}
                      </Form.Text>
                    </>
                  )
                )}
              </td>
              <td>
                {value.subtotal}

                {validationError?.order_items?.[index]?.subtotal?.map(
                  (text, i) => (
                    <>
                      <br />
                      <Form.Text key={i} className="text-danger">
                        {text}
                      </Form.Text>
                    </>
                  )
                )}
              </td>
              <td>
                <Button variant="danger" onClick={() => onDelete(value)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}
