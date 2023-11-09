// Club.js
import React, { useState, useEffect } from 'react';
import SearchBar from './SearchBar';
import CreateClubForm from './CreateClubForm';
import ClubCard from './ClubCard';
import Notification from './Notification';
import theme from './theme';

const MovieClub = () => {
  const [clubs, setClubs] = useState([]);
  const [notification, setNotification] = useState('');

  useEffect(() => {
    // Fetch the clubs from the backend when the component mounts
    const fetchClubs = async () => {
      try {
        const response = await fetch('https://flickfeeds-602d4f3e68d7.herokuapp.com/clubs');
        const data = await response.json();
        setClubs(data.clubs);
      } catch (error) {
        console.error('Error fetching clubs:', error);
      }
    };

    fetchClubs();
  }, []);

  const handleCreateClub = async (club) => {
    try {
      const response = await fetch('https://flickfeeds-602d4f3e68d7.herokuapp.com/create_club', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Include other headers if needed
        },
        body: JSON.stringify(club),
      });
      if (response.ok) {
        const newClub = await response.json();
        setClubs([...clubs, newClub]); // Add the new club to the local state
        setNotification('Club created successfully!');
      } else {
        throw new Error('Club creation failed');
      }
    } catch (error) {
      console.error('Error creating club:', error);
      setNotification('Failed to create club.');
    }
  };

  const handleJoinClub = async (clubId) => {
    try {
      const response = await fetch(`https://flickfeeds-602d4f3e68d7.herokuapp.com/join_club/${clubId}`, {
        method: 'POST',
        // Include headers and other configurations if required
      });
      const data = await response.json();
      setNotification(data.message);
    } catch (error) {
      console.error('Error joining club:', error);
      setNotification('Failed to join club.');
    }
  };

  return (
    <div style={{ padding: '20px', backgroundColor: theme.colors.white }}>
      <h1 style={{ color: theme.colors.black }}>Movie Clubs</h1>
      <SearchBar onSearch={() => {}} /> {/* Implement onSearch functionality as needed */}
      <CreateClubForm onCreate={handleCreateClub} />
      {notification && <Notification message={notification} />}
      <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
        {clubs.map((club) => (
          <ClubCard key={club.ClubID} club={club} onJoinClub={handleJoinClub} />
        ))}
      </div>
    </div>
  );
};

export default MovieClub;
