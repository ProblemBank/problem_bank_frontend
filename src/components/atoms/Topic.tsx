import React, { FC } from 'react';
import { Chip, Typography } from '@mui/material';

type TopicPropsType = {
  name: string;
  selected: false;
  clickable: boolean;
  onClick: any;
}

const Topic: FC<TopicPropsType> = ({
  name,
  selected = false,
  clickable,
  onClick,
}) => {

  return (
    <Chip
      sx={{ margin: '2px' }}
      label={<Typography variant='h6'>{name}</Typography>}
      variant={selected ? 'filled' : 'outlined'}
      color={selected ? 'primary' : 'default'}
      clickable={clickable}
      onClick={onClick}
    />
  );
}

export default Topic;