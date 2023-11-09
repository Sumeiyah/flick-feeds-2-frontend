import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PostList = ({ clubId }) => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch posts for the selected club using the API
    axios
      .get(`https://flickfeeds-602d4f3e68d7.herokuapp.com/posts?club_id=${clubId}`)
      .then((response) => {
        setPosts(response.data.posts);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setIsLoading(false);
      });
  }, [clubId]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>Club Posts</h2>
      <ul>
        {posts.map((post) => (
          <li key={post.PostID}>
            <h3>{post.MovieName}</h3>
            <p>{post.Review}</p>
            {/* Add more post details */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostList;
