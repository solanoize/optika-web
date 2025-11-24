import { Form } from "react-bootstrap";

export default function SearchComponent({ search, setSearch, onSearch }) {
  return (
    <Form.Control
      placeholder="Search..."
      value={search || ""}
      className="border-secondary"
      onChange={(e) => setSearch(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          onSearch({ search: e.target.value });
        }
      }}
    />
  );
}
