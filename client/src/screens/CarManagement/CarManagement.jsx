import * as React from "react";
import { DataGrid } from '@mui/x-data-grid';
import { 
    Dialog, 
    DialogTitle, 
    DialogContent, 
    DialogActions, 
    Button, 
    Typography, 
    Chip, 
    Stack,
    Box,
    Paper,
    TextField,
    FormControl,
    FormLabel,
    Select,
    MenuItem,
    IconButton
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export default function CarManagement() {
    const [selectedRow, setSelectedRow] = React.useState([]);
    const [openDialog, setOpenDialog] = React.useState(false);
    const [editMode, setEditMode] = React.useState(false);

    const handleClose = () => {
        console.log("Closing dialog..");
        setSelectedRow([]); // clear row selected when dialog closes
        setEditMode(false);
        setOpenDialog(false);
    }

    const handleRowSelect = (params) => {
        setSelectedRow({
            drivers: [],
            students: [],
            ...params.row
        });
        setEditMode(false);
        setOpenDialog(true);
    };

    const handleSave = () => {
        console.log("Saving changes to selected vehicle:", selectedRow);

        // TODO: send updated selectedRow to backend

        setEditMode(false);
    }

    const handleDelete = (row) => {
        console.log("Deleting vehicle:", row.plate);

        // TODO: call delete function from backend, then refresh data grid after successful deletion.
        handleClose();
    }

    // data
    const testCarRows = [
    {
        id: 1,
        plate: "ABC123",
        make: "Toyota",
        model: "Camry",
        color: "Silver",
        drivers: ["Sarah Johnson", "Mark Johnson"],
        isAuthorized: true,
        students: ["Emily Johnson", "Noah Johnson"]
    },
    {
        id: 2,
        plate: "XYZ789",
        make: "Honda",
        model: "Civic",
        color: "Blue",
        drivers: ["Michael Smith"],
        isAuthorized: false,
        students: []
    },
    {
        id: 3,
        plate: "KLM456",
        make: "Ford",
        model: "Escape",
        color: "Red",
        drivers: ["Rachel Lee"],
        isAuthorized: true,
        students: ["Ava Lee"]
    }
    ];

    const allDrivers = [
        "Sarah Johnson",
        "Mark Johnson",
        "Michael Smith",
        "Rachel Lee"
    ];

    const allStudents = [
        "Emily Johnson",
        "Noah Johnson",
        "Ava Lee",
        "Liam Smith"
    ];

    // column rendering logic
    const columns = [
        { field: "plate", headerName: "Plate", width: 150 },
        {
            field: "drivers",
            headerName: "Drivers",
            flex: 1,
            renderCell: (params) =>
                params.value.length === 0 ? (
                <Typography variant="body2" color="text.secondary">None</Typography>
                ) : (
                <Stack direction="row" spacing={1} flexWrap="wrap">
                    {params.value.map((d) => (
                    <Chip key={d} label={d} size="small" />
                    ))}
                </Stack>
            )
        },
        { 
            field: "isAuthorized",
            headerName: "Authorized",
            flex: 1,
            renderCell: (params) =>
                params.value ? (
                <Chip label="Yes" color="success" size="small" />
                ) : (
                <Chip label="No" color="error" size="small" />
            ) 
        },
        { 
            field: "students",
            headerName: "Students",
            flex: 1,
            renderCell: (params) =>
                params.value.length === 0 ? (
                <Typography variant="body2" color="text.secondary">
                    None
                </Typography>
            ) : (
                <Stack direction="row" spacing={1}>
                    {params.value.map((s, i) => (
                    <Chip key={i} label={s} size="small" />
                    ))}
                </Stack>
            ) 
        }
    ];

    return (
        <>
            <Paper>
                <Box>
                    <DataGrid 
                        rows={testCarRows} 
                        columns={columns}
                        autoHeight
                        onRowClick={handleRowSelect}
                    />
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
                    {editMode ? "Edit Vehicle Details" : "Vehicle Details"}
                    <IconButton
                        aria-label="close"
                        onClick={handleClose}
                        sx={{
                            position: "absolute",
                            right: 8,
                            top: 8,
                            color: (theme) => theme.palette.grey[500],
                        }}
                    >
                        <CloseIcon/>
                    </IconButton>
                </DialogTitle>
                <DialogContent dividers>
                    {selectedRow && (
                        <>
                            {editMode ? (
                                <div>
                                    <TextField
                                        label="Plate Number"
                                        value={selectedRow.plate}
                                        variant="outlined"
                                        fullWidth
                                        onChange={(e) =>
                                            setSelectedRow({ ... selectedRow, plate: e.target.value })
                                        }
                                    />
                                    <TextField
                                        label="Make"
                                        fullWidth
                                        margin="normal"
                                        value={selectedRow.make}
                                        onChange={(e) =>
                                            setSelectedRow({ ...selectedRow, make: e.target.value })
                                        }
                                    />
                                    <TextField
                                        label="Model"
                                        fullWidth
                                        margin="normal"
                                        value={selectedRow.model}
                                        onChange={(e) =>
                                            setSelectedRow({ ...selectedRow, model: e.target.value })
                                        }
                                    />
                                    <TextField
                                        label="Color"
                                        fullWidth
                                        margin="normal"
                                        value={selectedRow.color}
                                        onChange={(e) =>
                                            setSelectedRow({ ...selectedRow, color: e.target.value })
                                        }
                                    />
                                    {/* Dropdowns */}
                                    <FormControl>
                                        <FormLabel>Authorized</FormLabel>
                                        <Select
                                            value={selectedRow.isAuthorized ? "true" : "false"}
                                            label="Authorized"
                                            onChange={(e) => setSelectedRow({ ...selectedRow, isAuthorized: e.target.value })}
                                        >
                                            <MenuItem value={true}>Yes</MenuItem>
                                            <MenuItem value={false}>No</MenuItem>
                                        </Select>
                                    </FormControl>
                                    <FormControl fullWidth margin="normal">
                                        <FormLabel>Drivers</FormLabel>
                                        <Select
                                            multiple
                                            value={selectedRow?.drivers ?? []}
                                            label="Drivers"
                                            onChange={() =>
                                                setSelectedRow({
                                                    ...selectedRow,
                                                    drivers: typeof e.target.value === "string"
                                                    ? e.target.value.split(",")
                                                    : e.target.value
                                                })
                                            }
                                            renderValue={
                                                (selected) => (
                                                    <Stack direction="row" spacing={1} flexWrap="wrap">
                                                        {selected.map((name) => (
                                                            <Chip key={name} label={name} size="small" />
                                                        ))}
                                                    </Stack>
                                                )
                                            }
                                        >
                                            {allDrivers.map((driver) => (
                                                <MenuItem key={driver} value={driver}>
                                                    {driver}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                    <FormControl fullWidth margin="normal">
                                        <FormLabel>Students</FormLabel>
                                        <Select
                                            multiple
                                            value={selectedRow?.students ?? []}
                                            label="Students"
                                            onChange={() =>
                                                setSelectedRow({
                                                    ...selectedRow,
                                                    students: typeof e.target.value === "string"
                                                    ? e.target.value.split(",")
                                                    : e.target.value
                                                })
                                            }
                                            renderValue={
                                                (selected) => (
                                                    <Stack direction="row" spacing={1} flexWrap="wrap">
                                                        {selected.map((name) => (
                                                            <Chip key={name} label={name} size="small" />
                                                        ))}
                                                    </Stack>
                                                )
                                            }
                                        >
                                            {allStudents.map((student) => (
                                                <MenuItem key={student} value={student}>
                                                    {student}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </div>
                            ) : (
                                <div>
                                    <div>

                                    </div>
                                    <Typography><strong>Plate:</strong> {selectedRow.plate}</Typography>
                                    <Typography><strong>Make:</strong> {selectedRow.make}</Typography>
                                    <Typography><strong>Model:</strong> {selectedRow.model}</Typography>
                                    <Typography><strong>Color:</strong> {selectedRow.color}</Typography>
                                    <Typography><strong>Authorized:</strong> {selectedRow.isAuthorized ? "Yes" : "No"}</Typography>
                                    <div>
                                        <Typography sx={{ mt: 2 }}><strong>Drivers:</strong></Typography>
                                        {(selectedRow?.drivers ?? []).length === 0 ? (
                                            <Typography variant="body2" color="text.secondary">
                                                None
                                            </Typography>
                                        ) : (
                                            <Stack direction="row" spacing={1} sx={{ mt: 1 }} flexWrap="wrap">
                                                {selectedRow.drivers.map((d) => (
                                                <Chip key={d} label={d} size="small" />
                                                ))}
                                            </Stack>
                                        )}
                                    </div>
                                    <div>
                                        <Typography sx={{ mt: 2 }}><strong>Students:</strong></Typography>
                                        {(selectedRow?.students ?? []).length === 0 ? (
                                            <Typography variant="body2" color="text.secondary">
                                                None
                                            </Typography>
                                        ) : (
                                            <Stack direction="row" spacing={1} sx={{ mt: 1 }} flexWrap="wrap">
                                                {selectedRow.students.map((d) => (
                                                <Chip key={d} label={d} size="small" />
                                                ))}
                                            </Stack>
                                        )}
                                    </div>
                                </div>
                            )}
                        </>
                    )}
                </DialogContent>
                <DialogActions>
                    {editMode ? (
                        <>
                            <Button onClick={() => setEditMode(false)}>Cancel</Button>
                            <Button variant="contained" onClick={() => setEditMode(false)}>
                                Save
                            </Button>
                            <Button color="error" onClick={() => handleDelete(selectedRow)}>
                                Delete
                            </Button>
                        </>
                    ):(
                        <>
                            <Button variant="contained" onClick={() => setEditMode(true)}>
                                Edit
                            </Button>
                            <Button onClick={handleClose}>Close</Button>
                        </>
                    )}
                </DialogActions>
            </Dialog>
        </>
    );
}