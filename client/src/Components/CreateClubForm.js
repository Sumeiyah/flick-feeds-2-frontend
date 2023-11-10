import React, { useState } from 'react';

const CreateClubForm = ({ onCreateClub }) => {
  const [clubName, setClubName] = useState('');
  const [clubGenre, setClubGenre] = useState('');

  const formStyle = {
    backgroundColor: 'white',
    padding: '15px',
    margin: '10px 0',
    border: '1px solid black',
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreateClub({ name: clubName, genre: clubGenre });
    setClubName('');
    setClubGenre('');
  };

  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      <input
        type="text"
        value={clubName}
        onChange={(e) => setClubName(e.target.value)}
        placeholder="Club Name"
        required
      />
      <input
        type="text"
        value={clubGenre}
        onChange={(e) => setClubGenre(e.target.value)}
        placeholder="Club Genre"
        required
      />
      <button type="submit" style={{ backgroundColor: 'red', color: 'white' }}>Create Club</button>
    </form>
  );
};

export default CreateClubForm;
