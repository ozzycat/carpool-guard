import * as React from "react";
import Paper from "@mui/material/Paper";
import { DataGrid } from '@mui/x-data-grid';
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function CarManagement() {
    const [selectedRow, setSelectedRow] = React.useState([]);
    const [openDialog, setOpenDialog] = React.useState(false);

    return (
        <>
            <Paper>
                <Box>
                    <DataGrid/>
                </Box>
            </Paper>
            <Dialog>
                <DialogTitle>

                </DialogTitle>
                <DialogContent>

                </DialogContent>
                <DialogContent>
                    
                </DialogContent>
            </Dialog>
        </>
    );
}