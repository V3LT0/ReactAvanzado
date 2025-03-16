import { ReactNode, useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { CharacterContainer } from "../characters/CharactersContainer";
import { AuthContext } from "../auth/context/AuthContext";
import { AuthContainer } from "../auth/AuthContainer";

const PrivateRoute = ({ children }: { children: ReactNode }) => {
    const { state } = useContext(AuthContext)
  
    return state.isAuthenticated ? children : <Navigate to="/" />;
  }

export const AppRouter = () => (
    <Routes>
        <Route path="/*" element={<AuthContainer/>}/>
        <Route path="/characters" element={<PrivateRoute><CharacterContainer/></PrivateRoute>}/>
    </Routes>
)