import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../components/ui/dialog";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { toast } from "sonner";
import { Label } from "../components/ui/label";
import { Loader2 } from "lucide-react";
import {
  useLoadUserQuery,
  usePushActivityMutation,
  useUpdateUserMutation,
} from "../features/api/authApi";
import { useState, useEffect } from "react";

const Profile = () => {
  const { data, isLoading, refetch } = useLoadUserQuery();
  const user = data?.user;

  const [pushActivity, {isSuccess: pushSuccess}]= usePushActivityMutation();

  const [updateUser,{ //eslint-disable-next-line 
  data: updateUserData, isLoading: updateUserIsLoading, error: updateUserError, isSuccess},
  ] = useUpdateUserMutation();

  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [profilePhoto, setProfilePhoto] = useState("");

  const onChangeHandler = (e) => {
    const file = e.target.files?.[0];
    if (file) setProfilePhoto(file);
  };

  const updateuserHandler = async () => {
    console.log(name, profilePhoto);

    const formData = new FormData();

    formData.append("name", name);
    formData.append("bio", bio);
    formData.append("profilePhoto", profilePhoto);
    await updateUser(formData);

    pushActivity({ action: "Edited profile", actionDes: "Profile detail changed" })
  };

  useEffect(() => {
    if (isSuccess) {
      refetch();
      toast.success(data.message || "Profile Updated");
    }
    if (updateUserError) {
      toast.error(updateUserError.message || "Operation failed");
    }
  }, [updateUser, isSuccess, updateUserError, refetch, data]);

  // useEffect(() => {
  //   refetch();
  // }, []);

  if (isLoading) {
    return (
      <div className="max-w-2xl mx-auto my-20 px-4 md:px-0 flex flex-col items-center">
        <Loader2 className="animate-spin h-10 w-10 text-green-700 mb-4" />
        <h1 className="font-funnel font-bold text-2xl text-green-800 mb-6 text-center">
          Loading Profile...
        </h1>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="max-w-2xl mx-auto my-20 px-4 md:px-0">
        <h1 className="font-funnel font-bold text-2xl text-red-800 mb-6 text-center">
          No user data found.
        </h1>
      </div>
    );
  }

  return (
   <>
        <Avatar className="h-28 w-28 mb-4 ring-4 ring-green-200">
          <AvatarImage src={user.photoUrl} />
          <AvatarFallback>{user.name?.[0] || "U"}</AvatarFallback>
        </Avatar>
        <h2 className="font-funnel text-2xl font-bold text-green-800 mb-2">
          {user.name}
        </h2>
        <span className="text-sm text-gray-500 mb-6">{user.email}</span>
        <div className="w-full border-t border-gray-100 my-4"></div>
        <div className="w-full flex flex-col gap-2 mb-4">
          <div>
            <span className="font-semibold text-green-900 w-24 inline-block">
              Role:
            </span>
            <h4 className="text-gray-700">
              {user.role == "student" ? "Student" : "Instructor"}
            </h4>
          </div>
          <div>
            <span className="font-semibold text-green-900 w-24 inline-block">
              Bio:
            </span>
            <h4 className="text-gray-700">{user.bio || "No bio yet."}</h4>
          </div>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="mt-2" variant="outline">
              Edit Profile
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Profile</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="bio">Bio</Label>
                <Input
                  id="bio"
                  name="bio"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="avatar">Profile Image</Label>
                <Input
                  id="avatar"
                  name="avatar"
                  type="file"
                  accept="image/*"
                  onChange={onChangeHandler}
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                onClick={updateuserHandler}
                disabled={updateUserIsLoading}
              >
                {updateUserIsLoading ? "Updating" : "Save changes"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        </>
  );
};

export default Profile;
