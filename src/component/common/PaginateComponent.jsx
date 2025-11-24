import { Button, ButtonGroup } from "react-bootstrap";

export default function PaginateComponent({ pagination, onPaginate }) {
  return (
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
  );
}
