import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useVerifyUserMutation } from "@/features/api/authApi";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Verification = () => {
  const [code, setCode] = useState("");
  const navigate = useNavigate();

  const [sending, setSending] = useState(true);

  const { user } = useSelector((store) => store.auth);

  const [verifyUser, { isSuccess: verified }] = useVerifyUserMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await verifyUser(code);
      toast.success(response.message);
      navigate("/dashboard");
    } catch (err) {
      toast.error(err.data?.message || "Verification failed");
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    const sendCode = async () => {
      setSending(true);
      try {
        const response = await axios.post(
          `http://localhost:8080/api/v1/miscellaneous/send-instructor-code`,
          { email: user.email }, 
          { signal: controller.signal }
        );
        toast.success(
          response.data.message || "Verification code sent successfully"
        );
      } catch (error) {
        if (!axios.isCancel(error)) {
          toast.error(
            error.response?.data?.message || "Failed to send verification code"
          );
          console.error("Error sending code:", error);
        }
      } finally {
        if (!controller.signal.aborted) {
          setSending(false);
        }
      }
    };

    sendCode();

    return () => controller.abort(); 
  }, []); 

  return (
    <div className="max-w-md mx-auto mt-52">
      <Card>
        <CardHeader>
          <CardTitle>Instructor Verification</CardTitle>
          <CardDescription>
            Check your email for the verification code
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Input
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Enter verification code"
            className="mt-4"
          />
        </CardContent>
        <CardFooter>
          <Button onClick={handleSubmit}>Verify</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Verification;
