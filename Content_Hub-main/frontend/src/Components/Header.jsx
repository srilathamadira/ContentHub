import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

export default function Header() {
    const navigate = useNavigate();
    const navigateToHome = () => {
        navigate("/home");
    };

    return (
        <div className=" h-20  flex justify-between items-center">
            <div >
                <img src="src/assets/images/logo_white.png" alt="logo" className="mt-5 ml-5 w-80 " />

            </div>
            <div className="mr-30 mt-5">
                <Button
                    variant="contained"
                    sx={{
                        textTransform: "none",
                        fontSize: "1rem",
                        fontWeight: "bold",
                        backgroundColor: "#4a90e2", 
                        borderColor: "#1e3a8a", 
                        "&:hover": {
                            backgroundColor: "#2c5bb2", // Slightly Darker Blue on Hover
                        }
                    }}
                    onClick={navigateToHome}
                >
                    Explore Now
                </Button>

            </div>
        </div>
    );
}