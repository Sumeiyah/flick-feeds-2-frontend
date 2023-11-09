import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const JoinClubButton = ({ clubId, onJoinClub }) => {
  const [isJoining, setIsJoining] = useState(false);

  const handleJoinClub = () => {
    if (isJoining) {
      return;
    }

    setIsJoining(true);

    axios
      .post(`https://flickfeeds-602d4f3e68d7.herokuapp.com/join_club/${clubId}`)
      .then((response) => {
        onJoinClub();
      })
      .catch((error) => {
        console.error('Error joining club:', error);
      })
      .finally(() => {
        setIsJoining(false);
      });
  };

  return (
    <Link to={`/club/${clubId}/posts`} onClick={handleJoinClub}>
      {isJoining ? 'Joining...' : 'Join Club'}
    </Link>
  );
};

export default JoinClubButton;
