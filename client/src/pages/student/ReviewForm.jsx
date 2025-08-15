import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const ReviewForm = ({ setMessage, handleRatingChange, handleRatingSubmit, purchaseStatus }) => {
    

    const showToast=()=>{
        toast.error("You haven't purchased the course")
    }
    
    return (
    <div className="border mt-6 bg-white p-6 rounded-xl shadow-lg mb-8 space-y-5  mx-auto">
        <h3 className="font-funnel text-xl font-bold text-gray-900 border-b pb-2">Leave a review</h3>
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
            <Textarea
                onChange={e => setMessage(e.target.value)}
                placeholder="Write your review here..."
                rows={4}
                required
                className="w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
            />
        </div>

        <div className="w-full md:w-56">
            <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
            <Select onValueChange={handleRatingChange} modal={false}>
                <SelectTrigger className="rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200">
                    <SelectValue placeholder="Select rating" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="5">⭐ 5 - Excellent</SelectItem>
                    <SelectItem value="4">⭐ 4 - Good</SelectItem>
                    <SelectItem value="3">⭐ 3 - Average</SelectItem>
                    <SelectItem value="2">⭐ 2 - Poor</SelectItem>
                    <SelectItem value="1">⭐ 1 - Terrible</SelectItem>
                </SelectContent>
            </Select>
             {purchaseStatus?.purchased ? 

             <Button
                className="mt-5"
                onClick={handleRatingSubmit}
            >
                Submit Review
            </Button> : <Button onClick={showToast}  className="mt-5"> Submit Review</Button>}
        
        </div>


    </div>)
}

export default ReviewForm;