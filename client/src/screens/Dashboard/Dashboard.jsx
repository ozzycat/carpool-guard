import * as React from "react";
import { DataGrid } from '@mui/x-data-grid';
import CarCrashIcon from "@mui/icons-material/CarCrash";
import { 
    Dialog, 
    DialogTitle, 
    DialogContent, 
    DialogActions, 
    Button, 
    Box,
    Paper,
    IconButton,
    Typography,
    Stack,
    Chip
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export default function Dashboard() {
    const [isDismissal, setIsDismissal] = React.useState(false);
    const [selectedRow, setSelectedRow] = React.useState([]);
    const [openDialog, setOpenDialog] = React.useState(false);
    const [queue, setQueue] = React.useState([
        { id: 1, position: 1, plate: 'NOTAUT',isAuthorized: false, make: '', model: '', color: '', students: [] },
        { id: 2, position: 2, plate: 'ABC123', isAuthorized: true, make: 'Toyota', model: 'Camry', color: 'White', students: ['Jane Doe'], drivers: ['John Doe'] },
    ]);

    const handleRowSelect = (params) => {
        setSelectedRow({
            drivers: [],
            students: [],
            ...params.row
        });
        setOpenDialog(true);
    }

    const handleClose = () => {
        setSelectedRow([]); // clear row selected when dialog closes
        setOpenDialog(false);
    }

    const startDismissal = async () => {
        // TODO: send request to backend to start dismissal
        setIsDismissal(true);
    }

    const stopDismissal = async () => {
        //TODO: send request to backend to stop dismissal
        setIsDismissal(false);
    }

    const handleDismiss = (row) => {
        setQueue((prev) => {
            // remove the vehicle
            const updatedQueue = prev.filter((vehicle) => vehicle.id !== row.id);

            // update positions of remaining vehicles
            return updatedQueue.map((vehicle, index) => ({
            ...vehicle,
            position: index + 1   // correct because queue starts at 1
            }));
        });

        setOpenDialog(false);
    };

    const columns = [
        { field: 'position', headerName: '# in Line', width: 80 },
        {
            field: "vehicle",
            headerName: "Vehicle",
            width: 200,
            renderCell: (params) => {
                const { make = "", model = "", color = "" } = params.row || {};
                return `${color} ${make} ${model}`.trim();
            }
        },
        { field: 'students', headerName: 'Students', width: 300 },
        {
            field: 'isAuthorized',
            headerName: '',          // no header text
            width: 60,
            sortable: false,
            filterable: false,
            align: 'center',
            headerAlign: 'center',
            renderCell: (params) => {
            const unauthorized = params.row?.isAuthorized === false;

            return unauthorized ? (
                <CarCrashIcon color="error" />
            ) : null;  // show nothing if authorized
            }
        }
    ];

    return (
        <>
            <Paper>
                <div>
                    <Button
                        variant="contained"
                        color="success"
                        onClick={startDismissal}
                        disabled={isDismissal}
                    >
                        Start Dismissal
                    </Button>
                    <Button
                        variant="contained"
                        color="error"
                        onClick={stopDismissal}
                        disabled={!isDismissal}
                    >
                        Stop Dismissal
                    </Button>
                </div>
                <Box sx={{ height: 400, width: '100%' }}>
                    <DataGrid columns={columns} rows={queue} onRowClick={handleRowSelect}/>
                </Box>      
            </Paper>
            <Dialog
                open={openDialog}
                onClose={handleClose}
                role="dialog"
                fullWidth
                maxWidth="sm"
            >
                <DialogTitle>
                    {"Vehicle Information"}
                    <IconButton
                        aria-label="close"
                        onClick={handleClose}
                        sx={{
                            position: 'absolute',
                            right: 8,
                            top: 8,
                            color: (theme) => theme.palette.grey[500]
                        }}
                    >
                        <CloseIcon/>
                    </IconButton>
                </DialogTitle>
                <DialogContent dividers>
                    <Typography>
                        <strong>Authorized:</strong> {selectedRow.isAuthorized ? "Yes" : "No"}
                    </Typography>
                    <Typography><strong>Plate:</strong> {selectedRow.plate}</Typography>
                    <Typography><strong>Make:</strong> {selectedRow.make}</Typography>
                    <Typography><strong>Model:</strong> {selectedRow.model}</Typography>
                    <Typography><strong>Color:</strong> {selectedRow.color}</Typography>

                    <Typography sx={{ mt: 2 }}><strong>Drivers:</strong></Typography>
                    {selectedRow.drivers?.length > 0 ? (
                    <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ mt: 1 }}>
                        {selectedRow.drivers.map((d) => (
                        <Chip key={d} label={d} size="small" />
                        ))}
                    </Stack>
                    ) : (
                    <Typography color="text.secondary">Unknown</Typography>
                    )}

                    <Typography sx={{ mt: 2 }}><strong>Students:</strong></Typography>
                    {selectedRow.students?.length > 0 ? (
                    <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ mt: 1 }}>
                        {selectedRow.students.map((s) => (
                        <Chip key={s} label={s} size="small" />
                        ))}
                    </Stack>
                    ) : (
                    <Typography color="text.secondary">Unknown</Typography>
                    )}

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button color="primary" variant="contained" onClick={() => handleDismiss(selectedRow)} disabled={!isDismissal}>
                        Dismiss
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}