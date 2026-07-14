import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const RoleRoute = ({allowedRoles})=>{

    const {user} = useSelector(
        (state) => state.auth
    );

    if(!user)
    {
        return <Navigate to="/login" replace />;

    }

    return allowedRoles.includes(user.role)
    ? <Outlet/>
    : <Navigate to="/unauthorized" replace/>
}


export default RoleRoute