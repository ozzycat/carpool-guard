import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export default function AppFooter() {
    return (
        <Box
            component="footer"
            className="app-footer"
        >
            <Typography variant="body2" color="text.secondary">
                &copy; {new Date().getFullYear()} Carpool Guard. All rights reserved.
            </Typography>
        </Box>
    );
}