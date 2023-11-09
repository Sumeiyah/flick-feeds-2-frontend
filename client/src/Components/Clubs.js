import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Clubs = () => {
  const [clubs, setClubs] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newClub, setNewClub] = useState({ name: '', genre: '', description: '' });
  const [notification, setNotification] = useState('');
  const [selectedClubId, setSelectedClubId] = useState(null);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get('https://flickfeeds-602d4f3e68d7.herokuapp.com/clubs')
      .then(response => {
        setClubs(response.data.clubs);
      })
      .catch(error => console.error('Error fetching clubs:', error));
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewClub(prevState => ({ ...prevState, [name]: value }));
  };

  const handleCreateClub = (event) => {
    event.preventDefault();
    axios.post('https://flickfeeds-602d4f3e68d7.herokuapp.com/create_club', newClub)
      .then(response => {
        setClubs([...clubs, response.data]);
        setNotification('Club created successfully!');
        setShowCreateForm(false);
        setNewClub({ name: '', genre: '', description: '' });
      })
      .catch(error => console.error('Error creating club:', error));
  };

  const handleJoinClub = (clubId) => {
    axios.post(`https://flickfeeds-602d4f3e68d7.herokuapp.com/join_club/${clubId}`)
      .then(response => {
        setNotification('Joined club successfully!');
      })
      .catch(error => console.error('Error joining club:', error));
  };

  const handleViewPosts = (clubId) => {
    if (selectedClubId === clubId) {
      setSelectedClubId(null);
      setPosts([]);
    } else {
      setSelectedClubId(clubId);
      axios.get(`https://flickfeeds-602d4f3e68d7.herokuapp.com/posts/${clubId}`)
        .then(response => {
          setPosts(response.data.posts);
        })
        .catch(error => console.error('Error fetching posts:', error));
    }
  };

  const filteredClubs = clubs.filter(club => club.name.toLowerCase().includes(searchText.toLowerCase()));

  const styles = {
    container: {
      backgroundColor: '#fff',
      color: '#333',
      padding: '20px',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      marginBottom: '10px',
    },
    header: {
      backgroundColor: 'red',
      color: '#fff',
      padding: '10px',
      borderRadius: '4px',
    },
    button: {
      backgroundColor: 'red',
      color: '#fff',
      border: 'none',
      padding: '10px 15px',
      margin: '5px',
      borderRadius: '4px',
      cursor: 'pointer',
    },
    input: {
      padding: '10px',
      margin: '5px 0',
      borderRadius: '4px',
      border: '1px solid #ddd',
      width: '100%',
    },
    notification: {
      position: 'absolute',
      top: '10px',
      right: '10px',
      backgroundColor: 'black',
      color: 'white',
      padding: '10px',
      borderRadius: '5px',
      zIndex: 1000,
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      marginBottom: '10px',
    },
    postImage: {
      width: '80px',
      height: '80px',
      borderRadius: '4px',
      marginRight: '10px',
    }
  };

  return (
    <div style={{ backgroundColor: 'black', padding: '20px' }}>
      {notification && <div style={styles.notification}>{notification}</div>}
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <div style={{ ...styles.container, backgroundColor: 'white' }}>
          <input
            type="text"
            name="search"
            placeholder="Search clubs..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            style={styles.input}
          />
          <button onClick={() => setShowCreateForm(!showCreateForm)} style={styles.button}>
            {showCreateForm ? 'Cancel' : 'Create Club'}
          </button>
        </div>

        {showCreateForm && (
          <div style={{ ...styles.container, backgroundColor: 'white' }}>
            <form onSubmit={handleCreateClub} style={styles.form}>
              <input
                type="text"
                name="name"
                placeholder="Club Name"
                value={newClub.name}
                onChange={handleInputChange}
                style={styles.input}
              />
              <input
                type="text"
                name="genre"
                placeholder="Club Genre"
                value={newClub.genre}
                onChange={handleInputChange}
                style={styles.input}
              />
              <textarea
                name="description"
                placeholder="Description"
                value={newClub.description}
                onChange={handleInputChange}
                style={{ ...styles.input, height: '100px' }}
              />
              <button type="submit" style={styles.button}>Create Club</button>
            </form>
          </div>
        )}

        {filteredClubs.map(club => (
          <div key={club.id} style={{ ...styles.container, backgroundColor: 'white' }}>
            <div style={styles.header}>{club.name}</div>
            <p>Genre: {club.genre}</p>
            <p>{club.description}</p>
            <button onClick={() => handleViewPosts(club.id)} style={styles.button}>View Posts</button>
            <button onClick={() => handleJoinClub(club.id)} style={styles.button}>Join Club</button>
          </div>
        ))}

        {selectedClubId && posts.map(post => (
          <div key={post.id} style={{ ...styles.container, display: 'flex', alignItems: 'center', backgroundColor: 'white' }}>
            <img src={post.imagePath} alt="Post" style={styles.postImage} />
            <div>
              <p>Rating: {post.rating}</p>
              <p>{post.review}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Clubs;
