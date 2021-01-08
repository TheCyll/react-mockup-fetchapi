import React from 'react';
import { SearchBar } from './SearchBar';
import { UserCard } from './UserCard';

export const UsersTable = () => {
  return (
    <div className="principal-container">
      <h1>Search for Users</h1>
      <div className="users-table">
        <SearchBar />
        <UserCard />
      </div>
    </div>
  )
}
