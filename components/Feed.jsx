"use client";

// Custom Hook (usePosts)
import { usePosts } from "@hooks/usePosts";
import { useEffect, useState } from "react";
import PromptCard from "./PromptCard";

const PrompCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  const { posts } = usePosts();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredPosts, setFilteredPosts] = useState([]);

  useEffect(() => {
    const filteredPosts = posts.filter((post) =>
      post.prompt.includes(searchQuery)
    );

    setFilteredPosts(filteredPosts);
  }, [searchQuery]);

  const handleSearchChange = (e) => {
    e.preventDefault();
    setSearchQuery(e.target.value);
  };

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          value={searchQuery}
          placeholder="Search for a tag or username"
          onInput={handleSearchChange}
          className="search_input peer"
          required
        />
      </form>
      <PrompCardList
        data={searchQuery.length > 0 ? filteredPosts : posts}
        handleTagClick={() => {}}
      />
    </section>
  );
};

export default Feed;
