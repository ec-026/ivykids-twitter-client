import React, { useState, useEffect } from 'react';
import { Dropdown, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { useLazyQuery } from '@apollo/client';
import gql from 'graphql-tag';

const SEARCH_USERS = gql`
  query searchUsers($query: String!) {
    searchUsers(query: $query) {
      id
      username
    }
  }
`;

function UserSearchComponent() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searchUsers, { data }] = useLazyQuery(SEARCH_USERS);

  useEffect(() => {
    if (searchQuery !== '') {
      handleSearch();
    }
  }, [searchQuery]);

  const handleSearch = async () => {
    searchUsers({
      variables: {
        query: searchQuery
      }
    });
  };

  useEffect(() => {
    if (data && data.searchUsers) {
      setSearchResults(data.searchUsers);
    }
  }, [data]);

  const dropdownOptions = searchResults.map(user => ({
    key: user.id,
    text: user.username,
    value: user.username,
    content: <Link to={`/users/${user.username}`}>{user.username}</Link>
  }));

  return (
    <Dropdown
      fluid
      search
      selection
      icon="search" // This sets the icon to a search icon
      options={dropdownOptions}
      placeholder="Search users..."
      onSearchChange={(e, data) => {
        setSearchQuery(data.searchQuery);
      }}
      value={null}
      style={{ width: '400px' }} // Adjust the width to your preference
    />
  );
}

export default UserSearchComponent;
