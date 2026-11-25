import {
    createContext,
    useContext,
    useEffect,
    useState,
    type ReactNode
} from "react";

const API_URL = import.meta.env.VITE_API_URL;

interface AuthUser {
    id: string | number;
    username: string;
    email: string;
    role: "user" | "admin";
}

interface RegisterData {
    username: string;
    email: string;
    password: string;
}

interface AuthContextType {
    user: AuthUser | null;
    loading: boolean;
    login: (email: string, password: string) => Promise<any>;
    register: (data: RegisterData) => Promise<any>;
    logout: () => Promise<void>;
    checkAuth: () => Promise<void>;
}

// Perbaikan utama ada di sini
const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
    children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<AuthUser | null>(null);
    const [loading, setLoading] = useState(true);

    const checkAuth = async (): Promise<void> => {
        try {
            const response = await fetch(`${API_URL}/auth/me`, {
                credentials: "include"
            });

            if (!response.ok) {
                setUser(null);
                return;
            }

            const result = await response.json();
            setUser(result.user);

        } catch (error) {
            console.error("Auth error:", error);
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        checkAuth();
    }, []);

    const login = async (email: string, password: string) => {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify({ email, password })
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message);
        }

        setUser(result.data);

        return result;
    };

    const register = async (data: RegisterData) => {
        const response = await fetch(`${API_URL}/auth/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify(data)
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message);
        }

        return result;
    };

    const logout = async (): Promise<void> => {
        const response = await fetch(`${API_URL}/auth/logout`, {
            method: "POST",
            credentials: "include"
        });

        if (!response.ok) {
            throw new Error("Logout gagal");
        }

        setUser(null);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                login,
                register,
                logout,
                checkAuth
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth(): AuthContextType {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error(
            "useAuth harus digunakan di dalam AuthProvider"
        );
    }

    return context;
}