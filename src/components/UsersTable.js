import React, { useEffect, useState } from 'react';
import { SearchBar } from './SearchBar';
import { UserCard } from './UserCard';

export const UsersTable = () => {

  const [posts, setPosts] = useState([]);  
  const [completeUsers, setcompleteUsers] = useState([]);
  const [filteredtext, setfilteredText] = useState('');

  useEffect(() => { 

    fetch("https://jsonplaceholder.typicode.com/posts")
    .then(response => {
      if (response.status === 200) {
        return response.json();
      } else {
        console.log(response);
      }
    })
    .then(json => {
      var postTitlesByUser = json.map(post => {
        return {
          userId: post.userId,
          title: post.title
        };
      });     

      var postsByUser = postTitlesByUser.reduce((acc, curr) => {

        if (acc[curr.userId] == null) {
          acc[curr.userId] = { userId:curr.userId, posts: 1, titles: [curr.title] };
        } else {
          acc[curr.userId].posts++;
          acc[curr.userId].titles.push(curr.title);
        }

        return acc;
      }, {}); 

      setPosts(postsByUser); 
    
    })
  }, []); 

  useEffect(() => {
    
    fetch("https://jsonplaceholder.typicode.com/users")
    .then(response => {
      if (response.status === 200) {
        return response.json();
      } else {
        console.log(response);
      }
    })
    .then(response => {
      let usersData = response.map( obj => {
        return {
          userId: obj.id, 
          name: obj.name, 
          username: obj.username
        }
      });
      
      let completeUsersArr = usersData.map( user => {    
        return {
          userId: user.userId,
          name: user.name,
          username: user.username,
          posts: posts[user.userId].posts,
          titles: posts[user.userId].titles
        }        
      });  
                
      setcompleteUsers(completeUsersArr);        
      
    });  

  }, [posts]); 

  function textChange(value) {
    setfilteredText( value );
  }

  let filteredUsers = [];

  completeUsers.forEach( user => {
    if( user.name.toLowerCase().includes(filteredtext.toLowerCase()) 
      || user.username.toLowerCase().includes(filteredtext.toLowerCase())
    ){
      filteredUsers.push(user);
    }    
  });

  return (
    <div className="principal-container">
      <h1>Search for Users</h1>
      <div className="users-table">
        <SearchBar onTextChange={textChange} filteredtext={filteredtext}/>
        <div className="card-container">
        {
          filteredUsers.map(user => {            
          return <UserCard key={user.userId} user={user} />
          })
        }
        </div>
      </div>
    </div>
  )
}
