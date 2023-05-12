import { useState, useEffect } from "react";

export const usePosts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/prompt/`);
      const data = await response.json();
      setPosts(() => data);
    };

    fetchPosts();
  }, []);

  return { posts };
};
