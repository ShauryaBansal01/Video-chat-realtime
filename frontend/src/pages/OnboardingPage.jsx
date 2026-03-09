import { useState } from "react";
import useAuthUser from "../hooks/useAuthUser";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { completeOnboarding } from "../lib/api";

const OnboardingPage = () => {
  const {authUser} = useAuthUser();
  const queyClient = useQueryClient();
  const [formState, setFormState] = useState({
    fullName: authUser?.fullName || "",
    bio: authUser?.bio || "",
    nativeLanguage: authUser?.nativeLanguage || "",
    learningLanguage: authUser?.learningLanguage || "",
    location: authUser?.location || "",
    profilePic: authUser?.profilePic || ""
  }); 

  const {mutate, onboardingMutation,isPending} = useMutation({
    mutationFn: completeOnboarding,
    onSuccess: () => {
      toast.success("Onboarding completed successfully!");
      queyClient.invalidateQueries({queryKey: ['authUser']});
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate(formState);
  }

  return (
    <div>
      
    </div>
  )
}

export default OnboardingPage
