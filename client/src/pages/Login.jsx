import { Check, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState } from "react";
import {
  usePushActivityMutation,
  useRegisterUserMutation,
} from "@/features/api/authApi";
import { useLoginUserMutation } from "@/features/api/authApi";
import { useNavigate } from "react-router-dom";


const Login = () => {


  const navigate = useNavigate();

  const [signupInput, setSignupInput] = useState({
    name: "",
    email: "",
    forInstructor: false,
    password: "",
  });
  const [loginInput, setLoginInput] = useState({ email: "", password: "" });

  const [activeTab, setActiveTab] = useState("signup");

  const [pushActivity] = usePushActivityMutation();

  const [
    registerUser,
    { data: registerData,  error: registerError,  isLoading: registerIsLoading,  isSuccess: registerIsSuccess,},
  ] = useRegisterUserMutation();
  const [
    loginUser,
    {
      data: loginData,
      error: loginError,
      isLoading: loginIsLoading,
      isSuccess: loginIsSuccess,
    },
  ] = useLoginUserMutation();

  const changeInputHandler = (e, type) => {
    const { name, value } = e.target;

    if (type === "signup") {
      setSignupInput({ ...signupInput, [name]: value });
    } else {
      setLoginInput({ ...loginInput, [name]: value });
    }
  };

  const handleRegistration = async (type) => {
    const inputData = type === "signup" ? signupInput : loginInput;
    const action = type == "signup" ? registerUser : loginUser;
    await action(inputData);
    console.log(inputData);
  };

  useEffect(() => {
    if (registerIsSuccess && registerData) {
      toast.success(registerData.message || "Signup succesfull");
      setActiveTab("login");
      navigate("/login");
    }
    if (registerError) {
      toast.error(registerError.data.message || "Sign up failed");
    }
    if (loginIsSuccess && loginData) {
      toast.success(loginIsSuccess.message || "Login succesfull");

      pushActivity({ action: "User Logged in", actionDes: "Logged in" });
      navigate("/dashboard");
    }
    if (loginError) {
      toast.error(loginError.data.message || "Login failed");
    }
  }, [ loginIsLoading, registerIsLoading, loginData, registerData, loginError, registerError, loginIsSuccess, registerIsSuccess ]);

  // useEffect(() => {
  //   if(userRole){
  //     navigate(`/dashboard`)
  //   }
  // }, [userRole])
  return (
    <div className="flex items-center w-full justify-center h-screen mt-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
            <TabsTrigger value="login">Login</TabsTrigger>
          </TabsList>
          <TabsContent value="signup">
            <Card>
              <CardHeader>
                <CardTitle>Sign up</CardTitle>
                <CardDescription>
                  Create an acount and get started learning.
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-6">
                <div className="grid gap-3">
                  <Label htmlFor="tabs-demo-name">Name</Label>
                  <Input
                    name="name"
                    value={signupInput.name}
                    onChange={(e) => changeInputHandler(e, "signup")}
                    type="text"
                    placeholder="Example : Chhiring Lama"
                    required
                  />
                </div>

                <div className="grid gap-3">
                  <Label htmlFor="tabs-demo-email">Email</Label>
                  <Input
                    name="email"
                    value={signupInput.email}
                    onChange={(e) => changeInputHandler(e, "signup")}
                    type="email"
                    placeholder="Example : chhiring@gmail.com"
                    required
                  />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="tabs-demo-password">Password</Label>
                  <Input
                    name="password"
                    value={signupInput?.password}
                    onChange={(e) => changeInputHandler(e, "signup")}
                    type="password"
                    placeholder="******"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center space-x-2">
                    <input
                      id="instructor-checkbox"
                      name="forInstructor"
                      type="checkbox"
                      checked={signupInput.forInstructor}
                      onChange={(e) =>
                        setSignupInput({
                          ...signupInput,
                          forInstructor: e.target.checked,
                        })
                      }
                      className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <Label
                      htmlFor="instructor-checkbox"
                      className="text-sm font-medium leading-none"
                    >
                      Signing up as instructor?
                    </Label>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Tick the box above if you're an instructor
                  </p>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  disabled={registerIsLoading}
                  onClick={() => handleRegistration("signup")}
                >
                  {registerIsLoading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin">
                      Please Wait
                    </Loader2>
                  ) : (
                    "Sign Up"
                  )}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="login">
            <Card>
              <CardHeader>
                <CardTitle>Login</CardTitle>
                <CardDescription>
                  We are eager to have you back.
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-6">
                <div className="grid gap-3">
                  <Label htmlFor="tabs-demo-email">Email</Label>
                  <Input
                    name="email"
                    value={loginInput.email}
                    onChange={(e) => changeInputHandler(e, "login")}
                    type="email"
                    placeholder="Example : chhiring@gmail.com"
                    required
                  />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="tabs-demo-current">Password</Label>
                  <Input
                    name="password"
                    value={loginInput.password}
                    onChange={(e) => changeInputHandler(e, "login")}
                    type="password"
                    placeholder="****"
                    required
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={() => handleRegistration("login")}>
                  {loginIsLoading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin">
                      Loading
                    </Loader2>
                  ) : (
                    "Login"
                  )}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Login;
