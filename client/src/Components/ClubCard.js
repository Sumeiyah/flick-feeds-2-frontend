// ClubCard.js
import React, { useState } from 'react';
import theme from './theme';
import ClubPosts from './ClubPosts';

const ClubCard = ({ club, onJoinClub }) => {
  const [showPosts, setShowPosts] = useState(false);

  const togglePosts = () => setShowPosts(!showPosts);

  return (
    <div style={theme.card}>
      <h3>{club.Name}</h3>
      <p>{club.Genre}</p>
      <p>{"Join us for discussions, movie nights, and more!"}</p>
      <button onClick={togglePosts} style={{ ...theme.button, backgroundColor: theme.colors.primary, color: theme.colors.white }}>
        View Posts
      </button>
      <button onClick={() => onJoinClub(club.ClubID)} style={{ ...theme.button, backgroundColor: theme.colors.black, color: theme.colors.white }}>
        Join Club
      </button>
      {showPosts && <ClubPosts clubId={club.ClubID} />}
    </div>
  );
};

export default ClubCard;
