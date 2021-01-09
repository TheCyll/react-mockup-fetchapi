import React, { useEffect, useState } from 'react';

export const UserCard = (props) => {

  const user = props.user;
  
  return (
    
    <div className="user-card">      
      <div className="info">
        <h3><strong>Name: </strong>{user.name}</h3>
        <h3><strong>UserName: </strong>@{user.username}</h3>
        <h3><strong>Posts: </strong>{user.posts}</h3>
      </div>
      <div className="post-titles"> 
        <label>
          <h3><strong>Post titles:</strong></h3>
          <select name="select">
            <option value="value1">Value 1</option>
            <option value="value2">Value 2</option>
            <option value="value3">Value 3</option>
          </select>
        </label>         
      </div>
    </div> 
    
  )  
}
