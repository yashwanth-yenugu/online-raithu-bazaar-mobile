import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { ENDPOINTS } from "../constants/Api";

// Define types
type User = {
  id: number;
  name: string;
  email: string;
  role: string;
  profileCompleted: boolean;
  accessToken?: string;
  expiresIn?: number;
  isConsumer?: boolean; // Computed property to easily check role
};

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (
    name: string,
    email: string,
    password: string,
    role?: string
  ) => Promise<void>;
  logout: () => Promise<void>;
};

// Create the context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Process user data before storing
  const processUserData = (
    userData: User,
    token?: string,
    expiry?: number
  ): User => {
    return {
      ...userData,
      accessToken: token || userData.accessToken,
      expiresIn: expiry || userData.expiresIn,
      isConsumer: userData.role === "consumer",
    };
  };

  // Check for stored authentication on startup
  useEffect(() => {
    const loadUser = async () => {
      try {
        const userJSON = await AsyncStorage.getItem("user");
        if (userJSON) {
          const userData = JSON.parse(userJSON);
          setUser(processUserData(userData));
        }
      } catch (error) {
        console.error("Failed to load user data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadUser();
  }, []);

  // Login function
  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      const response = await axios.post(ENDPOINTS.AUTH_LOGIN, {
        email,
        password,
      });

      if (response.data) {
        const { accessToken, expiresIn, user: userData } = response.data;

        // Process and store user data
        const userToStore = processUserData(userData, accessToken, expiresIn);
        setUser(userToStore);
        await AsyncStorage.setItem("user", JSON.stringify(userToStore));

        // Navigate to home
        router.replace("/(tabs)");
      }
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Signup function
  const signup = async (
    name: string,
    email: string,
    password: string,
    role: string = "farmer"
  ) => {
    try {
      setIsLoading(true);
      const response = await axios.post(ENDPOINTS.AUTH_SIGNUP, {
        name,
        email,
        password,
        role,
      });

      if (response.data) {
        const { accessToken, expiresIn, user: userData } = response.data;

        // Process and store user data
        const userToStore = processUserData(userData, accessToken, expiresIn);
        setUser(userToStore);
        await AsyncStorage.setItem("user", JSON.stringify(userToStore));

        // Navigate to home
        router.replace("/(tabs)");
      }
    } catch (error) {
      console.error("Signup error:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = async () => {
    try {
      setIsLoading(true);
      // Clear storage
      await AsyncStorage.removeItem("user");
      // Clear state
      setUser(null);
      // Navigate to login
      router.replace("/auth");
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for using auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
