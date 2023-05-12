"use client";
// Custom Hook (usePost)
import usePost from "@hooks/usePost";
import { Profile } from "@components";
import { useUtils } from "@hooks/useUtils";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const MyProfile = () => {
  const { posts } = usePost();
  const { handleEdit, handleDelete } = useUtils();
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!session?.user.id) router.push("/");
  }, []);

  return (
    session?.user.id && (
      <Profile
        name="My"
        desc="Welcome to your personalized page"
        data={posts}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
    )
  );
};

export default MyProfile;
