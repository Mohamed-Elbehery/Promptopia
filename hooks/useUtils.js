"use client";

import { useRouter } from "next/navigation";
import usePost from "./usePost";

export const useUtils = () => {
  const { posts, setPosts } = usePost();
  const router = useRouter();

  const handleEdit = (post) => {
    router.push(`/update-prompt?id=${post._id}`);
  };

  const handleDelete = async (post) => {
    const hasConfirmed = confirm(
      "Are you sure you want to delete this prompt?"
    );

    if (hasConfirmed) {
      try {
        await fetch(`/api/prompt/${post._id.toString()}`, {
          method: "DELETE",
        });

        const filteredPosts = posts.filter((p) => p._id !== post._id);

        setPosts(filteredPosts);
        router.push(`/profile/${post.creator._id}`);
      } catch (err) {
        console.error(err);
      }
    }
  };

  return { handleEdit, handleDelete };
};
