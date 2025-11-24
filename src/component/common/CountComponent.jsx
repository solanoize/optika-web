import { Badge } from "react-bootstrap";

export default function CountComponent({ count }) {
  return (
    count && (
      <>
        Total data: <Badge bg="info">{count}</Badge>.
      </>
    )
  );
}
