import React from 'react';
import { ButtonGroup, Button } from 'react-bootstrap';

export const ActionButtons = ({ isTopic, onPublish, onEdit, onDelete }) => {
  return (
    <ButtonGroup size='sm'>
      {isTopic ? (
        <Button variant='success' onClick={onPublish}>
          Publish
        </Button>
      ) : null}

      <Button onClick={onEdit}>Edit</Button>
      <Button variant='danger' onClick={onDelete}>
        Delete
      </Button>
    </ButtonGroup>
  );
};
