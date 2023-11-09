import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LandingNavigation2 from './LandingNavigation2'

function PostCard() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Fetch posts when the component is mounted
    const fetchPosts = async () => {
      try {
        const response = await axios.get('https://flickfeeds-602d4f3e68d7.herokuapp.com/posts');
        setPosts(response.data.posts); // Assuming the response has a 'posts' field with the data
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  return (
   
    <>
    <LandingNavigation2 />
    <div className="container mx-auto p-4">
      {posts.map((post) => (
        <div key={post.PostID} className="bg-red-800 text-black p-4 rounded-lg shadow-lg mb-4">
          {post.ImagePath && <img src={post.ImagePath} alt="Movie" className="w-full h-64 object-cover mb-4" />}
          <h3 className="text-xl font-bold mb-2">{`Movie ID: ${post.MovieID}`}</h3>
          <p className="text-md mb-1">{`User ID: ${post.UserID}`}</p>
          <p className="mb-2">{post.Review}</p>
          <p className="mb-3">{`Rating: ${post.Rating}`}</p>
          <div className="comments mb-3">
            <h4 className="font-bold mb-1">Comments:</h4>
            {post.Comments.map((comment) => (
              <div key={comment.CommentID} className="bg-netflix-light p-2 rounded mb-2">
                <p className="text-sm">{comment.CommentText}</p>
              </div>
            ))}
          </div>
          <div className="likes">
            <h4 className="font-bold mb-1">Likes:</h4>
            <p className="text-sm">{`Likes: ${post.Likes || 0}`}</p>
          </div>
        </div>
      ))}
    </div>
    </>
  );
}

export default PostCard;
