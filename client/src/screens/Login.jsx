import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

export default function Login() {
    return (
        <>
            <Container>
                <Card variant="outlined">
                    <CardContent>
                        <h1>Sign In</h1>
                        <Box component="form" noValidate>
                            <FormControl>
                                <FormLabel htmlFor="email">Email</FormLabel>
                                <TextField
                                    id="email"
                                    type="email"
                                    name="email"
                                    placeholder="your@email.com"
                                    autoFocus
                                    required
                                    variant="outlined"
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel htmlFor="password">Password</FormLabel>
                                <TextField
                                    id="password"
                                    type="password"
                                    name="password"
                                    placeholder="••••••"
                                    autoFocus
                                    required
                                    variant="outlined"
                                />
                            </FormControl>
                            <Button type="submit" variant="contained">Sign In</Button>
                        </Box>
                    </CardContent>
                </Card>
            </Container>
        </>
    );
}