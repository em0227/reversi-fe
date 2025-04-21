import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
} from "react";

// Define a type for your auth context value
interface AuthContextType {
  user: any | null;
  loading: boolean;
  checkAuthStatus: () => Promise<void>;
}

// Create context with a default value matching the type
const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  // Check authentication status on mount
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/auth/user", {
        credentials: "include",
      });
      console.log("get user", response);
      if (response.ok) {
        const userData = await response.json();
        setUser(userData.authenticated ? userData : null);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error("Error checking auth status:", error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  // Create a value object containing all the context values
  const value: AuthContextType = {
    user,
    loading,
    checkAuthStatus,
  };

  // Pass the value object to the Provider using the value prop
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
