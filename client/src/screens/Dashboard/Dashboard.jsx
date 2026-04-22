import * as React from "react";
import Paper from "@mui/material/Paper";
import { DataGrid } from '@mui/x-data-grid';
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function Dashboard() {
    const [isDismissal, setIsDismissal] = React.useState(false);
    const [selectedRow, setSelectedRow] = React.useState([]);
    const [openDialog, setOpenDialog] = React.useState(false);

    const handleClickOpen = () => {
        setOpenDialog(true);
    }

    const handleClose = () => {
        setSelectedRow([]); // clear row selected when dialog closes
        setOpenDialog(false);
    }

    const columns = [
        { field: 'position', headerName: '# in Line', width: 80 },
        { field: 'isAuthorized', headerName: 'Authorized', width: 80 },
        { field: 'car', headerName: 'Vehicle', width: 200 },
        { field: 'students', headerName: 'Students', width: 300 },
    ];

    const rows = [
        { id: 1, position: 1, isAuthorized: false, car: '', students: '' },
        { id: 2, position: 2, isAuthorized: true, car: 'Toyota Camry', students: 'John Doe, Jane Smith' },
    ];

    return (
        <>
            <Paper>
                <Box sx={{ height: 400, width: '100%' }}>
                    <DataGrid columns={columns} rows={rows} />
                </Box>      
            </Paper>
            <Dialog
                open={openDialog}
                onClose={handleClose}
                role="dialog"
            >
                <DialogTitle>
                    {"Vehicle Information"}
                </DialogTitle>
                <DialogContent>

                </DialogContent>
                <DialogContent>

                </DialogContent>
            </Dialog>
        </>
    );
}