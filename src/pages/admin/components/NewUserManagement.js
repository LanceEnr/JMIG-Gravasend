import { DataGrid, GridToolbar, gridClasses } from "@mui/x-data-grid";
import Typography from "../../../components/common/Typography";
import { rowsUserManagement } from "../helpers/data";
import { alpha, styled } from "@mui/material/styles";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Paper, Box } from "@mui/material";

const fetchUsers = async () => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/get-customers`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};

const transformUsersData = async () => {
  const users = await fetchUsers();
  const orders = await fetchOrders();
  const usersWithOrders = users.map((user) => {
    const userOrders = orders.filter(
      (order) => order._name === `${user._fName}_${user._lName}`
    );
    const clv = userOrders.reduce((totalCLV, order) => {
      const orderValue = order._price * order._quantity;
      return totalCLV + orderValue;
    }, 0);
    return {
      id: user._userName,
      name: `${user._fName} ${user._lName}`,
      contact: user._phone,
      orderCount: userOrders.length,
      clv,
    };
  });
  return usersWithOrders;
};

const isValidUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch (e) {
    return false;
  }
};

const ODD_OPACITY = 0.2;

const StripedDataGrid = styled(DataGrid)(({ theme }) => ({
  [`& .${gridClasses.row}.even`]: {
    backgroundColor: "#EAECEA",
    "&:hover, &.Mui-hovered": {
      backgroundColor: alpha(theme.palette.primary.main, ODD_OPACITY),
      "@media (hover: none)": {
        backgroundColor: "transparent",
      },
    },
    "&.Mui-selected": {
      backgroundColor: alpha(
        theme.palette.primary.main,
        ODD_OPACITY + theme.palette.action.selectedOpacity
      ),
      "&:hover, &.Mui-hovered": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          ODD_OPACITY +
            theme.palette.action.selectedOpacity +
            theme.palette.action.hoverOpacity
        ),
        // Reset on touch devices, it doesn't add specificity
        "@media (hover: none)": {
          backgroundColor: alpha(
            theme.palette.primary.main,
            ODD_OPACITY + theme.palette.action.selectedOpacity
          ),
        },
      },
    },
  },
}));

export default function NewUserManagement() {
  const columnsUserManagement = [
    {
      field: "id",
      headerName: "USERNAME",
      flex: 1,
      renderHeader: (params) => (
        <Typography variant="h3" sx={{ fontWeight: "bold", fontSize: "12px" }}>
          {params.colDef.headerName}
        </Typography>
      ),
    },
    {
      field: "profilePicture",
      headerName: "PICTURE",
      flex: 1,
      renderHeader: (params) => (
        <Typography variant="h3" sx={{ fontWeight: "bold", fontSize: "12px" }}>
          {params.colDef.headerName}
        </Typography>
      ),
      renderCell: (params) => (
        <img
          src={
            isValidUrl(params.row.profilePicture)
              ? params.row.profilePicture
              : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
          }
          alt={"Picture"}
          style={{ width: 50, height: 50, borderRadius: "50%" }}
        />
      ),
    },
    {
      field: "name",
      headerName: "NAME",
      flex: 2,
      renderHeader: (params) => (
        <Typography variant="h3" sx={{ fontWeight: "bold", fontSize: "12px" }}>
          {params.colDef.headerName}
        </Typography>
      ),
    },
    {
      field: "contact",
      headerName: "CONTACT",
      flex: 2,
      renderHeader: (params) => (
        <Typography variant="h3" sx={{ fontWeight: "bold", fontSize: "12px" }}>
          {params.colDef.headerName}
        </Typography>
      ),
    },
    {
      field: "orderCount",
      headerName: "ORDER COUNT",
      flex: 1,
      renderHeader: (params) => (
        <Typography variant="h3" sx={{ fontWeight: "bold", fontSize: "12px" }}>
          {params.colDef.headerName}
        </Typography>
      ),
    },
    {
      field: "clv",
      headerName: "CUSTOMER LIFETIME VALUE",
      flex: 2,
      valueFormatter: (params) => {
        return "₱" + new Intl.NumberFormat().format(params.value);
      },
      renderHeader: (params) => (
        <Typography variant="h3" sx={{ fontWeight: "bold", fontSize: "12px" }}>
          {params.colDef.headerName}
        </Typography>
      ),
    },
  ];

  const [rowsUserManagement, setrowsUserManagement] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchUsers();
        const transformedData = transformUsersData(data);
        setrowsUserManagement(transformedData);
      } catch (error) {
        console.error("Error fetching and transforming data:", error);
      }
    };

    fetchData();
  }, [navigate]);

  return (
    <Box sx={{ my: 14 }}>
      <Typography
        variant="h3"
        marked="left"
        style={{ fontWeight: "bold", fontSize: "30px" }}
        gutterBottom
      >
        Users
      </Typography>

      <Paper sx={{ mt: 3, p: 2, display: "flex", flexDirection: "column" }}>
        <StripedDataGrid
          sx={{
            border: 1,
            borderColor: "primary.light",
            "& .MuiDataGrid-cell:hover": {
              fontWeight: "bold",
            },
          }}
          rows={rowsUserManagement}
          columns={columnsUserManagement}
          pageSize={5}
          disableColumnFilter
          checkboxSelection
          disableColumnSelector
          density="comfortable"
          slots={{ toolbar: GridToolbar }}
          slotProps={{
            toolbar: {
              showQuickFilter: true,
              printOptions: { disableToolbarButton: true },
            },
          }}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5, 10, 25]}
          getRowClassName={(params) =>
            params.indexRelativeToCurrentPage % 2 === 0 ? "even" : "odd"
          }
        />
      </Paper>
    </Box>
  );
}
