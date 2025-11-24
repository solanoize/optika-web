import { Button, Table } from "react-bootstrap";
import TablePlaceholderComponent from "../common/TablePlaceholderComponent";

export default function ProductListComponent({ data, loading, onRetrieve }) {
  return (
    <>
      {loading ? (
        <TablePlaceholderComponent
          headers={["Name", "Unit", "Stock", "Price", "Created By"]}
        />
      ) : (
        <Table className="mt-2 mb-4" striped hover responsive>
          <thead className="border-top">
            <tr>
              <th>Name</th>
              <th>Unit</th>
              <th>Stock</th>
              <th>Price</th>
              <th>Created By</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((p) => (
              <tr key={p.id}>
                <td>{p.name}</td>
                <td>{p.unit}</td>
                <td>{p.stock}</td>
                <td>{p.price}</td>
                <td>{p.user}</td>
                <td>
                  <Button variant="info" onClick={() => onRetrieve(p)}>
                    Retrieve
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
}
