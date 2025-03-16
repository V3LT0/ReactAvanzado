import { jwtDecode } from "jwt-decode"
import { User } from "../../auth/models/AuthState"

const tokenKey = "token"

export class TokenStorage {
    static getToken(): string | null {
        return localStorage.getItem(tokenKey)
    }

    static setToken(token: string): void {
        if(token === ""){
            throw new Error("token is empty")
        }
        localStorage.setItem(tokenKey, token)
    }

    static removeToken(): void {
        localStorage.removeItem(tokenKey)
    }

    static decodeToken(token: string): User {
        return jwtDecode<User>(token)
    }
}