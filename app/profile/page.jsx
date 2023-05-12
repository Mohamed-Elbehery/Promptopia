"use client";
// Custom Hook (usePost)
import usePost from "@hooks/usePost";
import { Profile } from "@components";
import { useUtils } from "@hooks/useUtils";

const MyProfile = () => {
  const { posts } = usePost();
  const { handleEdit, handleDelete } = useUtils();

  return (
    <Profile
      name="My"
      desc="Welcome to your personalized page"
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default MyProfile;
