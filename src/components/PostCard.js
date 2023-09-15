import React, { useContext } from 'react';
import { Button, Card, Icon, Label, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import moment from 'moment';

import { AuthContext } from '../context/auth';
import LikeButton from './LikeButton';
import DeleteButton from './DeleteButton';
import MyPopup from '../util/MyPopup';

function PostCard({
  post: { body, createdAt, id, username, likeCount, commentCount, likes }
}) {
  const { user } = useContext(AuthContext);

  return (
    <Card fluid color="purple"> {/* Set the main color to purple */}
      <Card.Content style={{ display: 'flex', alignItems: 'center' }}>
        <div style={{ border: '3px solid purple', borderRadius: '50%', padding: '2px' }}>
          <Image
            size="tiny"
            src="https://i.ibb.co/FwV0LjR/profile.jpg"
            style={{ border: 'none', borderRadius: '50%', width: '50px', height: '50px' }}
          />
        </div>
        <div style={{ marginLeft: '10px', flex: '1' }}>
          <Card.Header style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
            {username}
          </Card.Header>
          <Card.Meta as={Link} to={`/posts/${id}`} style={{ fontSize: '0.9rem' }}>
            {moment(createdAt).fromNow(true)}
          </Card.Meta>
          <Card.Description style={{ fontSize: '1rem' }}>{body}</Card.Description>
        </div>
      </Card.Content>
      <Card.Content extra>
        <MyPopup content="Like this post">
          <LikeButton user={user} post={{ id, likes, likeCount }} />
        </MyPopup>
        <MyPopup content="Comment on post">
          <Button labelPosition="right" as={Link} to={`/posts/${id}`} color="purple"> {/* Set the button color to purple */}
            <Button color="purple" basic>
              <Icon name="comments" />
            </Button>
            <Label basic color="purple" pointing="left">
              {commentCount}
            </Label>
          </Button>
        </MyPopup>
        {user && user.username === username && <DeleteButton postId={id} />}
      </Card.Content>
    </Card>
  );
}

export default PostCard;
