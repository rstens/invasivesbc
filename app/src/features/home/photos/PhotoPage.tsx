import { Container } from '@material-ui/core';
import ManageDatabaseContainer from 'components/database/ClearDatabase';
import React from 'react';
import PhotoContainer from 'components/photos/PhotoContainer';

interface IPhotoPageProps {
  classes?: any;
}

const PhotoPage: React.FC<IPhotoPageProps> = (props) => {
  return (
    <Container className={props.classes.container}>
      <PhotoContainer />
    </Container>
  );
};

export default PhotoPage;
  