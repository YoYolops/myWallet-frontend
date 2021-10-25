import API from './api';

async function login(email, password) {
    const body = {
        email,
        password
    }
    try {
        const response = await API.post("/auth", body);
        if(!response.data) {
            return false
        }
        return response.data;
    } catch (e){
        return false
    }
}

async function register(name, email, password) {
    const body = {
        name,
        email,
        password
    }
    try {
        await API.post("/register", body);
        return true;
    } catch {
        return false;
    }
}

async function logout(token) {
    try {
        await API.get("/logout", {
            headers: { Authorization: `Bearer ${token}` }
        })
        return true
    } catch {
        return false
    }
}

export {
    login,
    register,
    logout
}