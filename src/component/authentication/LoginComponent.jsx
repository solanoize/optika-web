import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Row,
  Spinner,
} from "react-bootstrap";
import bannerOptik from "../../assets/bannerOptik.bmp";

export default function LoginComponent({
  validationError,
  loading,
  onLogin,
  onChange,
  user,
}) {
  return (
    <>
      <Container>
        <Row className="d-flex justify-content-center">
          <Col className="col-sm-12 col-md-6 col-lg-4 col-12">
            <Card>
              <Card.Img variant="top" src={bannerOptik} />
              <Card.Header>
                <strong>Optika Login</strong>
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
                <Form.Group className="mb-3">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    placeholder="username"
                    name="username"
                    value={user.username || ""}
                    onChange={onChange}
                    disabled={loading}
                    className="border-secondary"
                  />
                  {validationError?.username &&
                    validationError?.username?.map((text, index) => (
                      <Form.Text key={index} className="text-danger">
                        {text}
                      </Form.Text>
                    ))}
                </Form.Group>

                <Form.Group>
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    placeholder="password"
                    type="password"
                    name="password"
                    value={user.password || ""}
                    onChange={onChange}
                    disabled={loading}
                    className="border-secondary"
                  />
                  {validationError?.password &&
                    validationError?.password?.map((text, index) => (
                      <Form.Text key={index} className="text-danger">
                        {text}
                      </Form.Text>
                    ))}
                </Form.Group>
              </Card.Body>
              <Card.Footer>
                <Button disabled={loading} onClick={onLogin}>
                  Login
                </Button>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}
