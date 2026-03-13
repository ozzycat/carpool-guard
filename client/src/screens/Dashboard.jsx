import Paper from "@mui/material/Paper";
import { DataGrid } from '@mui/x-data-grid';
import Box from "@mui/material/Box";

export default function Dashboard() {

    const columns = [
        { field: 'name', headerName: 'Product Name', width: 200 },
        { field: 'description', headerName: 'Description', width: 300 },
    ];

    const rows = [
        { id: 1, name: 'Product A', description: 'Description of Product A' },
        { id: 2, name: 'Product B', description: 'Description of Product B' },
    ];

    return (
        <>
            <Paper>
                <Box sx={{ height: 400, width: '100%' }}>
                    <DataGrid columns={columns} rows={rows} />
                </Box>      
            </Paper>
        </>
    );
}