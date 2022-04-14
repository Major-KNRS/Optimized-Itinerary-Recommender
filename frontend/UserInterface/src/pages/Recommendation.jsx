import React from 'react'
import CardComponent from '../components/Card'

import { Button, Container, Grid, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { makeStyles } from '@mui/styles';
import { useState, useRef, useCallback } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import users from './data';

import api from '../api/base';

const useStyles = makeStyles({
  root: {
    backgroundColor: 'red',
    color: (props) => props.color,
  },
  cover: {
      padding: 10,
      margin: 10,
      border: 5,
      borderStyle: 'solid',
      borderColor: '#4287f5',
      borderWidth: 2,
  },
});

export default function Recommendation() {
  const classes = useStyles();
    const [search1, setSearch1] = useState(['Kathmandu']);
    const [posts, setPosts] = useState([]);

    const apiCall1 = async () => {
      try {
        let response = await api.get(`/api/places/recommend/${search1}`);
        console.log(response.data);
        setPosts(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    useEffect( () => {
      apiCall1();
    },[]);

    const handleSubmit = (e) => {
      e.preventDefault();
      apiCall1();
  };

    return (
        <Container className={classes.cover}>
            <h3>Recommendation</h3>
            <form className='ui form' onSubmit={e => {handleSubmit(e)}}>
                <div className='field' style={{margin:5}}>
                    <input 
                    type="text"
                    name="name"
                    placeholder="Search.."
                    value={search1}
                    onChange={(e) => setSearch1(e.target.value)}
                    />
                    <button style={{margin:5}} type='submit'> Search </button>
                </div>
            </form>
            <Box >
                {/* <Grid container spacing={3} justifyContent="center">
                    {users.map((cheq) => (
                        <Grid item lg={3} md ={6} sm={6}> <CardComponent title={cheq.title} rating={cheq.avg_rating}/> </Grid>
                    ))}
                </Grid> */}
                <Grid container spacing={3} justifyContent="center">
                    {posts.map((cheq) => (
                        <Grid item lg={3} md ={6} sm={6}> <CardComponent title={cheq.name} description={cheq.description} photo={cheq.photo} rating={cheq.avg_rating}/> </Grid>
                    ))}
                </Grid>
            </Box> 
        </Container>
    )
}

