import React from 'react';

const ClubCard = ({ club, onJoinClub }) => {
  const cardStyle = {
    backgroundColor: 'white',
    padding: '10px',
    margin: '10px 0',
    border: '1px solid black',
    borderRadius: '5px',
  };

  const buttonStyle = {
    backgroundColor: 'red',
    color: 'white',
    padding: '5px 10px',
    margin: '5px',
    border: 'none',
    borderRadius: '3px',
    cursor: 'pointer',
  };

  return (
    <div style={cardStyle}>
      <h3>{club.Name}</h3>
      <p>{club.Genre}</p>
      {/* Placeholder for a dynamic club description */}
      <p>{`Join the ${club.Name} to discuss and share about ${club.Genre} movies!`}</p>
      <button 
        style={buttonStyle} 
        onClick={() => onJoinClub(club.ClubID)}
      >
        Join Club
      </button>
    </div>
  );
};

export default ClubCard;
