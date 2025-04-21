import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const handleSuccess = async (credentialResponse: any) => {
    // Decode the JWT token to get user info
    const decoded: any = jwtDecode(credentialResponse.credential);
    console.log(decoded);
    // Send the user data to your backend
    try {
      const response = await fetch(
        "http://localhost:8080/api/auth/google-signin",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            email: decoded.email,
            name: decoded.name,
            picture: decoded.picture,
            sub: decoded.sub, // Google's user ID
            credential: credentialResponse.credential, // Send the JWT token for verification
          }),
        }
      );

      if (response.ok) {
        // Handle successful login
        const userData = await response.json();
        console.log(userData);
        // Redirect to board page
        navigate("/board");
      } else {
        console.error("Login failed");
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <div className="login-container">
      <h2>Welcome to Reversi</h2>
      <GoogleLogin
        onSuccess={handleSuccess}
        onError={() => console.log("Login Failed")}
      />
    </div>
  );
}

export default Login;
