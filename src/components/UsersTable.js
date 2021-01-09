import React, { useEffect, useState } from 'react';
import { SearchBar } from './SearchBar';
import { UserCard } from './UserCard';

export const UsersTable = () => {

  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [completeUsers, setcompleteUsers] = useState([]);

  useEffect(async() => {    
    fetch("https://jsonplaceholder.typicode.com/posts")
    .then(response => {
      if (response.status == 200) {
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

    });
  });    

  useEffect(async() => {
    fetch("https://jsonplaceholder.typicode.com/users")
    .then(response => {
      if (response.status == 200) {
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

      setUsers(usersData); 
      
      if(users.length > 0 ){
    
        let completeUsersArr = users.map( user => {           
          if( user.userId == posts[user.userId].userId ){
            return {
              userId: user.userId,
              name: user.name,
              username: user.username,
              posts: posts[user.userId].posts,
              titles: posts[user.userId].titles
            }
          }
        });   
        
        setcompleteUsers(completeUsersArr);
              
      }
    });

  }); 

  return (
    <div className="principal-container">
      <h1>Search for Users</h1>
      <div className="users-table">
        <SearchBar />
        <div className="card-container">
        {
          completeUsers.map(user => {            
          return <UserCard key={user.userId} user={user} />
          })
        }
        </div>
      </div>
    </div>
  )
}
