import api from "./axios.js";


export const getuser =()=>{
    return api.get("/users");
}

export const createUser = (data) => {
    return api.post("/users", data);
};

export const updateUser = (id, data) => {
    return api.put(`/users/${id}`, data);
};

export const deleteUser = (id) => {
    return api.delete(`/users/${id}`);
};