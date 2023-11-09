// Club.js
import React, { useState, useEffect } from 'react';
import SearchBar from './SearchBar';
import CreateClubForm from './CreateClubForm';
import ClubCard from './ClubCard';
import Notification from './Notification';
import theme from './theme';

const Club = () => {
  const [clubs, setClubs] = useState([]);
  const [notification, setNotification] = useState('');

  useEffect(() => {
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

  const handleCreateClub = async ({ Name, Genre, Description }) => {
    try {
      const response = await fetch('https://flickfeeds-602d4f3e68d7.herokuapp.com/create_club', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ Name, Genre, Description }),
      });
      if (response.ok) {
        const newClub = await response.json();
        setClubs([...clubs, newClub]);
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
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        const data = await response.json();
        setNotification(data.message);
      } else {
        throw new Error('Joining club failed');
      }
    } catch (error) {
      console.error('Error joining club:', error);
      setNotification('Failed to join club.');
    }
  };

  return (
    <div style={{ padding: '20px', backgroundColor: theme.colors.white }}>
      <h1 style={{ color: theme.colors.black }}>Movie Clubs</h1>
      <SearchBar onSearch={() => {}} />
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

export default Club;
