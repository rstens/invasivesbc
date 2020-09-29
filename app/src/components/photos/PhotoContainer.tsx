import { Button } from '@material-ui/core';
import { DeleteForever } from '@material-ui/icons';
import { DatabaseContext } from 'contexts/DatabaseContext';
import React, { useContext } from 'react';

interface IManageDatabaseContainerProps {
  classes?: any;
}

const PhotoContainer: React.FC<IManageDatabaseContainerProps> = (props) => {
  const databaseContext = useContext(DatabaseContext);

  return (
    <div>
      <Button variant="contained" startIcon={<DeleteForever />} >
        Store Photo
      </Button>
    </div>
  );
};

export default PhotoContainer;
