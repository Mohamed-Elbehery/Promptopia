"use client";

// Custom Hook (usePosts)
import { usePosts } from "@hooks/usePosts";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
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
  const [tagQuery, setTagQuery] = useState("");
  const [filteredPosts, setFilteredPosts] = useState([]);
  const { data: session } = useSession();

  // Search
  useEffect(() => {
    const filteredPosts = posts.filter((post) =>
      post.prompt.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setFilteredPosts(filteredPosts);
  }, [searchQuery]);

  // Tag
  useEffect(() => {
    const filteredPosts = posts.filter((post) =>
      post.tag.toLowerCase().includes(tagQuery.replace("#", "").toLowerCase())
    );

    setFilteredPosts(filteredPosts);
  }, [tagQuery]);

  // Search Functionality
  const handleSearchChange = (e) => {
    e.preventDefault();
    setSearchQuery(e.target.value);
  };

  // Tag Functionality
  const handleTagClick = (tag) => {
    setTagQuery(() => tag);
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
      <span
        className="cursor-pointer font-bold font-inter text-sm text-gray-500 hover:text-gray-400 mt-5 transition"
        onClick={() => {
          setTagQuery("");
          setSearchQuery("");
        }}
      >
        {tagQuery && "Reset"}
      </span>
      {session?.user.id && (
        <PrompCardList
          data={
            tagQuery
              ? filteredPosts
              : searchQuery.length > 0
              ? filteredPosts
              : posts
          }
          handleTagClick={handleTagClick}
        />
      )}
    </section>
  );
};

export default Feed;
