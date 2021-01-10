import React from 'react';

export const UserCard = (props) => {

  const user = props.user;

  return (
    
    <div className="user-card">      
      <div className="info">
        <h3><strong>Name: </strong>{user.name}</h3>
        <h3><strong>UserName: </strong>{user.username}</h3>
        <h3><strong>Posts: </strong>{user.posts}</h3>
      </div>
      <div className="post-titles"> 
        <label>
          <h3><strong>Post titles:</strong></h3>          
          <select name="select">
            {
              user.titles.map( title => {                
                return <option value={'title'}>{title}</option>
              })
            }  
          </select>        
        </label>         
      </div>
    </div> 
    
  )  
}
