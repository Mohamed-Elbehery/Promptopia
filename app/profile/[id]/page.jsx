"use client";

import { Profile } from "@components";
import { usePosts } from "@hooks/usePosts";
import { useUtils } from "@hooks/useUtils";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const DynamicProfile = ({ params }) => {
  const { handleEdit, handleDelete } = useUtils();
  const [post, setPost] = useState([]);
  const { posts: data } = usePosts();
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (params.id == session?.user.id) {
      router.push("/profile");
    }
    setPost(() => data.filter((p) => p.creator._id === params.id));
    console.log(post);
  }, [data]);

  return (
    <Profile
      name={post[0]?.creator.username}
      desc={`Welcome to ${post[0]?.creator.username} personalized page`}
      data={post}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default DynamicProfile;
