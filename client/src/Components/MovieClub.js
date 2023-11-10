import React, { useState, useEffect } from 'react';
import axios from 'axios';



const genres = ['Action', 'Comedy', 'Drama', 'Fantasy', 'Horror', 'Mystery', 'Romance', 'Sci-Fi', 'Thriller']; // Example genres

const  MovieClub = () => {
  const [clubsData, setClubsData] = useState([]);
  const [postsData, setPostsData] = useState([]);
  const [expandedClub, setExpandedClub] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [showCreateClubForm, setShowCreateClubForm] = useState(false);
  const [newClubData, setNewClubData] = useState({ Name: '', Genre: genres[0] });

  useEffect(() => {
    const fetchClubsAndPosts = async () => {
      const clubsResponse = await axios.get('https://flickfeeds-602d4f3e68d7.herokuapp.com/clubs');
      setClubsData(clubsResponse.data.clubs.map(club => ({
        ...club,
        Description: `Join the exciting ${club.Name}, a hub for ${club.Genre} lovers to explore and discuss their passions.` // Generating a unique description
      })));
      const postsResponse = await axios.get('https://flickfeeds-602d4f3e68d7.herokuapp.com/posts');
      setPostsData(postsResponse.data.posts);
    };
    fetchClubsAndPosts();
  }, []);

  const handleCreateClub = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('https://flickfeeds-602d4f3e68d7.herokuapp.com/create_club', newClubData);
      setClubsData([...clubsData, { ...newClubData, ClubID: response.data.ClubID, Description: `Join the new ${newClubData.Name}, a place for ${newClubData.Genre} enthusiasts.` }]);
      setShowCreateClubForm(false);
      alert('Club created successfully!');
    } catch (error) {
      alert('Failed to create club. Please try again.');
    }
  };

  const handleJoinClub = async (clubId) => {
    try {
      await axios.post(`https://flickfeeds-602d4f3e68d7.herokuapp.com/join_club/${clubId}`);
      alert('Joined club successfully!');
    } catch (error) {
      alert('Failed to join club. Please try again.');
    }
  };

  const handleTogglePosts = (clubId) => {
    setExpandedClub(expandedClub === clubId ? null : clubId);
  };

  const filteredClubs = searchText ? clubsData.filter(club => club.Name.toLowerCase().includes(searchText.toLowerCase())) : clubsData;

  return (

 

    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px', backgroundColor: 'white' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Search Club"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          style={{ flex: '1', marginRight: '10px', padding: '10px', fontSize: '16px', borderRadius: '4px', border: '1px solid #ddd' }}
        />
        <button
          onClick={() => setShowCreateClubForm(!showCreateClubForm)}
          style={{ backgroundColor: 'black', color: 'white', padding: '10px 20px', fontSize: '16px', border: 'none', cursor: 'pointer' }}
        >
          {showCreateClubForm ? 'Cancel' : 'Create Club'}
        </button>
      </div>

      {showCreateClubForm && (
        <div style={{ backgroundColor: 'white', color: 'black', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', marginBottom: '20px' }}>
          <h3 style={{ marginTop: '0' }}>Create Club</h3>
          <form onSubmit={handleCreateClub}>
            <input
              type="text"
              placeholder="Club Name"
              required
              onChange={(e) => setNewClubData({ ...newClubData, Name: e.target.value })}
              style={{ width: '100%', padding: '10px', fontSize: '16px', marginBottom: '10px', borderRadius: '4px', border: '1px solid #ddd' }}
            />
            <select
              required
              onChange={(e) => setNewClubData({ ...newClubData, Genre: e.target.value })}
              style={{ width: '100%', padding: '10px', fontSize: '16px', marginBottom: '20px', borderRadius: '4px', border: '1px solid #ddd', background: 'white' }}
            >
              {genres.map((genre, index) => (
                <option key={index} value={genre}>{genre}</option>
              ))}
            </select>
            <button type="submit" style={{ backgroundColor: 'red', color: 'white', padding: '10px 20px', fontSize: '16px', border: 'none', cursor: 'pointer', display: 'block', width: '100%' }}>Create</button>
          </form>
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
        {filteredClubs.map((club) => (
          <div key={club.ClubID} style={{ border: '1px solid #ddd', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', position: 'relative', display: 'flex', flexDirection: 'column' }}>
            <div style={{ padding: '20px', backgroundColor: '#fff', flex: '1' }}>
              <h2 style={{ fontSize: '24px', margin: '0 0 10px 0', color: '#333' }}>{club.Name}</h2>
              <p style={{ margin: '0 0 10px 0', color: '#555' }}>Genre: {club.Genre}</p>
              <p style={{ margin: '0', color: '#555', flex: '1' }}>{club.Description}</p>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 20px', backgroundColor: '#f7f7f7' }}>
              <button onClick={() => handleTogglePosts(club.ClubID)} style={{ backgroundColor: 'red', color: 'white', padding: '5px 10px', fontSize: '14px', border: 'none', cursor: 'pointer', borderRadius: '20px' }}>
                {expandedClub === club.ClubID ? 'Hide Posts' : 'View Posts'}
                </button>
              {expandedClub === club.ClubID && (
                <div style={{ maxHeight: '400px', overflowY: 'auto', backgroundColor: '#f7f7f7', padding: '10px', marginTop: '10px' }}>
                  {postsData.filter(post => post.MovieID === club.ClubID).map((post) => (
                    <div key={post.PostID} style={{ marginBottom: '10px', padding: '10px', backgroundColor: 'white', borderRadius: '4px' }}>
                      <img src={post.ImagePath} alt="Post" style={{ maxWidth: '100px', marginBottom: '10px' }} />
                      <p style={{ fontSize: '14px', margin: '0' }}>Rating: {post.Rating}</p>
                      <p style={{ fontSize: '14px', margin: '0' }}>Review: {post.Review}</p>
                    </div>
                  ))}
                </div>
              )}
              <button onClick={() => handleJoinClub(club.ClubID)} style={{ backgroundColor: 'black', color: 'white', padding: '10px', width: '100%', border: 'none', cursor: 'pointer', marginTop: '10px', borderRadius: '4px' }}>
                Join Club
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
   
  );
};

export default MovieClub;

