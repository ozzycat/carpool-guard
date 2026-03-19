import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";


export default function Login() {
    // prepare navigate instance
    const navigate = useNavigate();


    const handleSubmit = async (event) => {
        event.preventDefault(); // preventing it from refreshing due to rerendering.

        const formData = new FormData(event.currentTarget);
        const email = formData.get("email");
        const password = formData.get("password");

        // TEMP: mock auth. replace with an axios.post to the api later.
        try {
            if (email === "tester@carpoolguard.com" && password === "tester222") {
                localStorage.setItem("token", "dev-token");

                navigate("/dashboard"); // use router to prevent a reload
                return;
            }


        } catch (error) {
            console.error(error);
            alert("Login failed. Please check your credentials and try again.");
        }
    }

    return (
        <>
            <Container>
                <Card variant="outlined">
                    <CardContent>
                        <h1>Sign In</h1>
                        <Box component="form" noValidate onSubmit={handleSubmit}>
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