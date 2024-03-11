import {
    Navigate,
    Route,
    Routes
} from "react-router-dom";
import Login from "./pages/login";
import CreateUser from "./pages/user";
import Post from "./pages/posts";

export default function AppRoutes() {
    const getAuth =  () => {
        return sessionStorage.getItem('auth')
    }

    const ProtectedRoute =  ({ children }: { children: JSX.Element }) => {
        const teste = getAuth();
        console.log('teste', teste);
        return teste ? children : <Navigate to={'/login'} replace />
    }

    return (
        <Routes>
            <Route path="/login" element={
                <Login />
            } />
            <Route path="/createUser" element={
                <CreateUser />
            } />
            <Route path="/home" element={
                <ProtectedRoute>
                    <Post/>
                </ProtectedRoute>
            } />
        </Routes>
    );
}