import React, { useContext, useState } from 'react';
import gql from 'graphql-tag';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { Button, Card, Image, Icon } from 'semantic-ui-react';
import { useParams } from 'react-router-dom';

import { AuthContext } from '../context/auth';

function UserProfile() {
  const { username } = useParams();
  const { user } = useContext(AuthContext);
  const [loadingFollow, setLoadingFollow] = useState(false);

  const { data } = useQuery(FETCH_USER_QUERY, {
    variables: {
      query: username
    }
  });

  const [toggleFollowUser] = useMutation(FOLLOW_USER_MUTATION, {
    variables: {
      userId: data ? data.searchUsers[0].id : null
    },
    refetchQueries: [
      {
        query: FETCH_USER_QUERY,
        variables: { query: username }
      }
    ],
    onCompleted: () => {
      setLoadingFollow(false);
    },
  });

  const handleToggleFollow = () => {
    setLoadingFollow(true);
    toggleFollowUser();
  };

  let userMarkup;
  if (!data) {
    userMarkup = <p>Loading user...</p>;
  } else {
    const { id, username, followers } = data.searchUsers[0];
    const isFollowing = user && followers && followers.includes(user.id);
    
    // Conditionally render the Follow/Unfollow button based on whether the user is logged in
    const followButton = user && user.id !== id ? (
      <Button
        onClick={handleToggleFollow}
        color={isFollowing ? "red" : "green"}
        loading={loadingFollow}
        style={{
          width: '80px',
          borderRadius: '8px',
          fontSize: '14px',
          padding: '8px 10px',
          marginRight: '10px',
        }}
      >
        {isFollowing ? "Unfollow" : "Follow"}
      </Button>
    ) : null;

    userMarkup = (
      <Card fluid>
        <Card.Content style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ marginRight: '10px' }}>
            <Image
              floated='left'
              size='small'
              src='https://i.ibb.co/FwV0LjR/profile.jpg'
              style={{ borderRadius: '50%' }}
            />
          </div>
          <div style={{ flex: 1 }}>
            <Card.Header style={{ fontSize: '18px', marginBottom: '5px', fontWeight: 'bold' }}>{username}</Card.Header>
            <Card.Meta style={{ display: 'flex', alignItems: 'center', fontSize: '14px' }}>
              <Icon name='users' style={{ marginRight: '4px' }} />
              <span style={{ marginRight: '10px' }}>{followers.length}</span>
              Followers
            </Card.Meta>
          </div>
          <div style={{ marginLeft: 'auto' }}>
            {followButton}
          </div>
        </Card.Content>
      </Card>
    );
  }
  return userMarkup;
}

// ... rest of the code



const FETCH_USER_QUERY = gql`
  query($query: String!) {
    searchUsers(query: $query) {
      id
      username
      followers
      following
    }
  }
`;

const FOLLOW_USER_MUTATION = gql`
  mutation($userId: ID!) {
    followUser(userId: $userId){
        id
    }
  }
`;

export default UserProfile;
