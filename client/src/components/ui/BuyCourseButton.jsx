import { useCreateCheckoutSessionMutation } from "@/features/api/purchaseApi";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";
import { toast } from "sonner";

const BuyCourseButton = ({ courseId }) => {
  const [createCheckoutSession, {data, isLoading, isSuccess, isError, error }] =
    useCreateCheckoutSessionMutation();

  const purchaseCourseHandler = async () => {
    await createCheckoutSession({courseId});
  };

  useEffect(() => {
    if (isSuccess && data?.url) {
      window.location.href = data.url;
    }
  }, [isSuccess, data]);
  
  useEffect(() => {
    if (isError) {
      toast.error(error?.data?.message || "Failed to create checkout session");
    }
  }, [isError, error]);

  return (
    <button
      disabled={isLoading}
      onClick={purchaseCourseHandler}
      className="font-funnel w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition"
    >
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        </>
      ) : (
        "Purchase Course"
      )}
    </button>
  );
};

export default BuyCourseButton;
