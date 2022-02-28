import React from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';
import { useState } from 'react';
import StarRating from './StarRating';

function ReadMore({ children, maxCharacterCount = 100}) {
  const text = children;
  const [isTruncated, setIsTruncated] = useState(true)
  const resultString = isTruncated ? text.slice(0, 100) : text ;

  function toggleIsTruncated(){
    setIsTruncated(!isTruncated)
  }

  return (
    <p>{resultString}<span style={{ color: '#e35930' }} onClick={toggleIsTruncated}>{isTruncated ? "Read More" : "Read Less"}</span></p>
  );
}
  
function CardComponent(props) {
    return (
        <div>
            <Card elevation={3} sx={{ maxWidth: 300 }}>
                <CardMedia
                    component="img"
                    height="200"
                    image="/images/everest.jpg"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {props.title}
                  </Typography>
                  <Typography gutterBottom variant="h7" component="div">
                    Address
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <ReadMore>
                    This is the description of the place in few words. fkljdsa fdsak fkdasfkj fadsf dhas fdskfj hdksjf hasdkj 
                    fhasd df hjdsa f shadfkjsdfh hdf hdjdskafha fhka hfkjsdahfdskfhadfddf  fsdakjfhdjfh  fsdajfh ds fdk ka fkdashf 
                    jksd sadhfsadkf THis is the ending.
                    </ReadMore>
                  </Typography>
                </CardContent>
                <CardActions>
                  <Grid container>
                    <Grid item style={{paddingRight: 20}}>
                      <Button size="small" variant='contained' color='success' >Rating {props.rating}</Button>
                    </Grid>
                    <Grid item style={{paddingRight: 20}}> 
                      <Button size="small" variant='contained'>Favourite</Button>
                    </Grid>
                    <Grid item style={{marginTop: 10}}>
                      <StarRating />
                    </Grid>
                  </Grid>
                  
                </CardActions>
            </Card>
        </div>
    );
}

export default CardComponent;