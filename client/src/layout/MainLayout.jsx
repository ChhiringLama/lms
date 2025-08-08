import NavBar from "@/components/ui/NavBar";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
    return (
        <div>
            <NavBar/>
            <div>
                <Outlet></Outlet>
            </div>
        </div>
    )
};

export default MainLayout;
