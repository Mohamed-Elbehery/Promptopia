import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

const usePost = () => {
  const [posts, setPosts] = useState([]);
  const { data: session } = useSession();

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${session?.user.id}/posts`);
      const data = await response.json();
      setPosts(() => data);
    };

    if (session?.user.id) fetchPosts();
  }, []);

  return { posts, setPosts };
};

export default usePost;
