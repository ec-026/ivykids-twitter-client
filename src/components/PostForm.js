import React, { useState } from 'react';
import { Button, Form } from 'semantic-ui-react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';

import { useForm } from '../util/hooks';
import { FETCH_POSTS_QUERY } from '../util/graphql';

function PostForm() {
  const { values, onChange, onSubmit } = useForm(createPostCallback, {
    body: ''
  });

  const [createPost, { error }] = useMutation(CREATE_POST_MUTATION, {
    variables: values,
    update(cache, { data: { createPost } }) {
      // Read the current cache data
      const cachedData = cache.readQuery({ query: FETCH_POSTS_QUERY });
  
      // Add the new post to the cache
      cache.writeQuery({
        query: FETCH_POSTS_QUERY,
        data: {
          getPosts: [createPost, ...cachedData.getPosts],
        },
      });
    },
  });
  

  const [validationError, setValidationError] = useState('');

  function createPostCallback() {
    if (values.body.trim() === '') {
      setValidationError('Post body must not be empty');
      return;
    }
    createPost();
    values.body = '';
    setValidationError(''); // Clear validation error if successful
  }


  return (
    <div className="post-form">
      <Form onSubmit={onSubmit}>
        <h2>Create a post:</h2>
        <Form.Field>
          <Form.TextArea
            placeholder="Hi World!"
            name="body"
            onChange={onChange}
            value={values.body}
            error={validationError ? true : false}
          />
          <Button type="submit" color="purple"> {/* Set the button color to purple */}
            Submit
          </Button>
        </Form.Field>
      </Form>
      {validationError && (
        <div className="ui error message" style={{ marginBottom: 20 }}>
          <ul className="list">
            <li>{validationError}</li>
          </ul>
        </div>
      )}
      {error && (
        <div className="ui error message" style={{ marginBottom: 20 }}>
          <ul className="list">
            <li>{error.graphQLErrors[0].message}</li>
          </ul>
        </div>
      )}
    </div>
  );
}

const CREATE_POST_MUTATION = gql`
  mutation createPost($body: String!) {
    createPost(body: $body) {
      id
      body
      createdAt
      username
      likes {
        id
        username
        createdAt
      }
      likeCount
      comments {
        id
        body
        username
        createdAt
      }
      commentCount
    }
  }
`;

export default PostForm;
