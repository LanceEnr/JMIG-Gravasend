import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { TextField } from "@mui/material";

const columns = [
  { field: "id", headerName: "ID", flex: 1 },
  {
    field: "heading",
    headerName: "Heading",
    flex: 2,
    editable: true,
  },
  {
    field: "subHeading",
    headerName: "Subheading",
    flex: 2,
    editable: true,
    renderEditCell: (params) => (
      <TextField
        multiline
        rows={4}
        value={params.value}
        onChange={(event) =>
          params.api.setEditCellValue(
            params.id,
            params.field,
            event.target.value
          )
        }
      />
    ),
  },
];

export const FaqsTable = () => {
  const rows = [
    { id: 1, heading: "Heading 1", subHeading: "Subheading 1" },
    { id: 2, heading: "Heading 2", subHeading: "Subheading 2" },
    { id: 3, heading: "Heading 3", subHeading: "Subheading 3" },
    // Add more rows as needed
  ];

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        components={{
          Toolbar: GridToolbar,
        }}
      />
    </div>
  );
};
