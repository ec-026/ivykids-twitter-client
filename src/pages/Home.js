import React, { useContext } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Grid, Transition, Header, Icon, Dimmer, Loader } from 'semantic-ui-react';

import { AuthContext } from '../context/auth';
import PostCard from '../components/PostCard';
import PostForm from '../components/PostForm';
import { FETCH_POSTS_QUERY } from '../util/graphql';

function Home() {
  const { user } = useContext(AuthContext);
  const { loading, error, data } = useQuery(FETCH_POSTS_QUERY);

  if (loading) {
    return (
      <Dimmer active inverted>
        <Loader inverted>Loading posts...</Loader>
      </Dimmer>
    );
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  const posts = data.getPosts;

  return (
    <Grid columns={3} stackable>
      <Grid.Row className="page-title">
        <Header as="h1" textAlign="center">
          <Icon name="sticky note outline" className="small-icon" />
          Recent Posts
        </Header>
      </Grid.Row>
      <Grid.Row>
        {user && (
          <Grid.Column>
            <PostForm />
          </Grid.Column>
        )}
        <Transition.Group duration={400}>
          {posts &&
            posts.map((post) => (
              <Grid.Column key={post.id} style={{ marginBottom: '40px' }}>
                <PostCard post={post} />
              </Grid.Column>
            ))}
        </Transition.Group>
      </Grid.Row>
    </Grid>
  );
}

export default Home;
