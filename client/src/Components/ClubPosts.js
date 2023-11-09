// ClubPosts.js
import React, { useState, useEffect } from 'react';
import theme from './theme';

const ClubPosts = ({ clubId }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`https://flickfeeds-602d4f3e68d7.herokuapp.com/posts/${clubId}`);
        const data = await response.json();
        setPosts(data.posts);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, [clubId]);

  return (
    <div>
      {posts.map((post) => (
        <div key={post.PostID} style={theme.post}>
          <img src={post.ImagePath} alt="Post" />
          <p>{post.Review}</p>
          {/* Other post details can be added here */}
        </div>
      ))}
    </div>
  );
};

export default ClubPosts;
