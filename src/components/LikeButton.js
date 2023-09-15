import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { Button, Label, Icon } from 'semantic-ui-react';
import MyPopup from '../util/MyPopup';

function LikeButton({ user, post: { id, likeCount, likes } }) {
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    if (user && likes.find((like) => like.username === user.username)) {
      setLiked(true);
    } else setLiked(false);
  }, [user, likes]);

  const [likePost] = useMutation(LIKE_POST_MUTATION, {
    variables: { postId: id }
  });

  const likeButton = user ? (
    liked ? (
      <Button color="purple"> {/* Set button color to purple */}
        <Icon name="heart" /> Like
      </Button>
    ) : (
      <Button color="purple" basic> {/* Set button color to purple */}
        <Icon name="heart" /> Like
      </Button>
    )
  ) : (
    <Button as={Link} to="/login" color="purple" basic> {/* Set button color to purple */}
      <Icon name="heart" /> Like
    </Button>
  );

  return (
    <MyPopup content={liked ? 'Unlike' : 'Like'}>
      <Button as="div" labelPosition="right" onClick={likePost}>
        {likeButton}
        <Label basic color="purple" pointing="left"> {/* Set label color to purple */}
          {likeCount}
        </Label>
      </Button>
    </MyPopup>
  );
}

const LIKE_POST_MUTATION = gql`
  mutation likePost($postId: ID!) {
    likePost(postId: $postId) {
      id
      likes {
        id
        username
      }
      likeCount
    }
  }
`;

export default LikeButton;
