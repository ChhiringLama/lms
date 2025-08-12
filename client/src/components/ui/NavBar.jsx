// import logo from "@/assets/technology.png";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "./button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ToggleMode from "@/pageFeature/ToggleMode";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { useLogoutUserMutation } from "@/features/api/authApi";
import { useEffect } from "react";
import { toast } from "sonner";
import { useSelector } from "react-redux";

const NavBar = () => {
  const {user} = useSelector(store=>store.auth);
  
  const [logoutUser, {data, isSuccess}]=useLogoutUserMutation();

  const logoutHandler=async()=>{
    await logoutUser();
  }

  const navigate =useNavigate();

  useEffect(()=>{
    if(isSuccess){
      toast.success(data.message || "User loggout successfull");
      navigate("/login")
    }
  }, [isSuccess])

  return (
    <div className="font-funnel h-14 dark:bg-[#0A0A0A] bg-white border-b dark:border-b-gray-800 border-b-gray-200 fixed top-0 left-0 right-0 duration-300 z-[100] mar">
      {/* Desktop  */}

      <div className="max-w-7xl mx-auto hidden md:flex justify-between items-center gap-10 h-full">
        <div className="flex items-center gap-2">
          {/* <img src={logo} alt="Logo" className="w-8 h-8 object-contain" /> */}
          <h1 className="font-headvig hidden md:block font-semibold text-2xl text-cyan-800"><Link to={"/"}>Edu<span className="text-emerald-800">Online</span></Link></h1>
        </div>
        {/* user icon and dark mode  */}
        <div className="flex items-center gap-7">
          {user ? (
            <DropdownMenu modal={false}>
              <DropdownMenuTrigger>
                <Avatar>
                  <AvatarImage src={user?.photoUrl || "https://github.com/shadcn.png"} />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
            
             
                    <DropdownMenuItem><Link to='/dashboard'>Dashboard</Link></DropdownMenuItem>
              
                <DropdownMenuItem onClick={logoutHandler}>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-2">
              <Button variant="outline" onClick={()=>{navigate('login')}}>Login</Button>
              <Button  onClick={()=>{navigate('login')}}>Signup</Button>
            </div>
          )}
          <ToggleMode />
        </div>
      </div>

      {/*Mobile device */}
      <div className="flex md:hidden items-center justify-between px-4 h-full">
        <h1>Edu Online</h1>
        <MobileNavBar  />
      </div>
    </div>
  );
};

const MobileNavBar = () => {

      const role = "instructor";
  return (
    <div>
      <Sheet>
        <SheetTrigger>
          <Button
            size="icon"
            className="rounded-full bg-gray-200 hover:bg-gray-200"
          >
            <Menu></Menu>
          </Button>
        </SheetTrigger>
        <SheetContent className="flex flex-col">
          <SheetHeader
            className={"flex flexrow items-center justify-between mt-2"}
          >
            <SheetTitle>Edu Online</SheetTitle>
            <ToggleMode />
          </SheetHeader>
          <Separator className="mr-2"></Separator>
          <nav className="flex flex-col space-y-4">
            <span>My Learning</span>
            <span>Edit Profile</span>
            <span>Logout</span>
          </nav>
          {role === "instructor" && (
            <SheetFooter>
              <Button type="submit">Dashboard</Button>
            </SheetFooter>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default NavBar;
