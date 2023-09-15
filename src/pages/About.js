// About.js (in your pages folder)
import React from 'react';
import { Container, Header, List, Icon, Segment } from 'semantic-ui-react';

function About() {
  return (
    <Container text>
      <Header as="h2" color="purple">
        <Icon name="info circle" /> About the Mini Twitter Clone
      </Header>
      <Segment color="purple">
        <p>
          The Mini Twitter Clone is a web application developed using the MERN Stack (MongoDB, Express.js, React.js, Node.js). It allows users to register, post tweets, follow other users, and view the tweets of the other users.
        </p>
      </Segment>
      <Header as="h3" color="purple">Key Features</Header>
      <List bulleted>
        <List.Item>
          <strong>User Registration and Authentication System:</strong> Users can register with a unique username and password. They can also log in and log out.
        </List.Item>
        <List.Item>
          <strong>Authentication using JWT:</strong> JSON Web Tokens are used for secure authentication.
        </List.Item>
        <List.Item>
          <strong>Database Schema using MongoDB:</strong> The MongoDB database stores user data, tweets, and follower information.
        </List.Item>
        <List.Item>
          <strong>Tweet Management:</strong> Users can create, edit, and delete tweets.
        </List.Item>
        <List.Item>
          <strong>Follow/Unfollow:</strong> Users can follow and unfollow other users to customize their feed.
        </List.Item>
        <List.Item>
          <strong>View Timeline:</strong> The timeline displays tweets from followed users in chronological order.
        </List.Item>
        <List.Item>
          <strong>Deployment:</strong> Both the frontend and backend applications are deployed for accessibility.
        </List.Item>
        <List.Item>
          <strong>GraphQL API Gateway:</strong> GraphQL is used to interact with the backend from the frontend, ensuring efficient data retrieval.
        </List.Item>
      </List>
      <Header as="h3" color="purple">Best Practices</Header>
      <Segment color="purple">
        <p>
          Development adheres to best practices in code architecture and MongoDB design principles. The focus is on clean and well-architected code to enhance scalability and maintainability.
        </p>
      </Segment>
      <Header as="h3" color="purple">Connect with Me</Header>
      <List horizontal size="huge">
        <List.Item>
          <a href="https://www.linkedin.com/in/tejassingh026/" target="_blank" rel="noopener noreferrer">
            <Icon name="linkedin" size="big" color="purple" />
          </a>
        </List.Item>
        <List.Item>
          <a href="https://github.com/ec-026" target="_blank" rel="noopener noreferrer">
            <Icon name="github" size="big" color="purple" />
          </a>
        </List.Item>
      </List>
    </Container>
  );
}

export default About;
