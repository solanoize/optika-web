import { Table, Placeholder } from "react-bootstrap";

export default function TablePlaceholderComponent({ headers = [], rows = 5 }) {
  const placeholderRows = Array.from({ length: rows });

  return (
    <Table className="mt-2" borderless>
      <thead>
        <tr>
          {headers.map((h, i) => (
            <th key={i}>{h}</th>
          ))}
        </tr>
      </thead>

      <tbody>
        {placeholderRows.map((_, r) => (
          <tr key={r}>
            {headers.map((_, c) => (
              <td key={c}>
                <Placeholder
                  as="div"
                  animation="glow"
                  className="bg-opacity-25 "
                >
                  <Placeholder xs={12} className="bg-opacity-25 bg-dark " />
                </Placeholder>
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
