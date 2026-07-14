import api from "./axios.js"


export const login =(data)=>{
    return api.post("/auth/login",data)
}

export const logout =()=>{
    return api.post("/auth/logout")
}

export const refreshToken = () => {
    return api.post("/auth/refresh-token");
};

export const getProfile = () => {
    return api.get("/auth/me");
};