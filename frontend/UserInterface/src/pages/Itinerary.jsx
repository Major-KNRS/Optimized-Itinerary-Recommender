import React, { useEffect } from 'react'

import { Button, Container, Grid, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { makeStyles } from '@mui/styles';
import { useState, useRef, useCallback } from 'react';

import axios from 'axios';

import 'mapbox-gl/dist/mapbox-gl.css'
import 'react-map-gl-geocoder/dist/mapbox-gl-geocoder.css'

import Geocoder from 'react-map-gl-geocoder'

import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import { Source, Layer } from 'react-map-gl';

const MAPBOX_TOKEN = 'pk.eyJ1Ijoia2FtYWxnb2RhciIsImEiOiJjazVpOGwxbWgwYnllM2ptbm43ajF0ZmQ0In0.f1zLLWQiv7d5tIc-Lu9n0w'

const useStyles = makeStyles({
  root: {
    backgroundColor: 'red',
    color: (props) => props.color,
  },
  cover: {
      padding: 10,
      margin: 10,
    //   border: 5,
    //   borderStyle: 'solid',
    //   borderColor: '#4287f5',
    //   borderWidth: 2,
  },
});

function Itinerary() {

    const classes = useStyles();

    const [selectedMarker, setSelectedMarker] = useState(null);
    
    const [coordinatevalue, setCoordinatevalue] = useState([]);

    const [fromapi, setFromapi] = useState([]);

    const [dis, setDistance] = useState([]);
    const [tim, setTime] = useState([]);

    const [search1, setSearch1] = useState([3]);

    const [viewport, setViewport] = useState({
        latitude: 27.682200,
        longitude: 85.323816,
        width: '55vw',
        height: '75vh',
        zoom: 12,
        pitch: 30,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        apiCall1();
        apiCall2();
    };

    // points is an array of [[long, lat],[long, lat]]
    // const coordinates = [[85.320351,27.694653],[85.317555,27.690084],[85.316131,27.688521],[85.318615,27.684670],[85.318749,27.683173],[85.319566,27.682085],[85.320894,27.682750]];\

    const geocoderContainerRef = useRef();
    const mapRef = useRef();
    const handleViewportChange = useCallback(
        (newViewport) => setViewport(newViewport),
        []
    );

    const apiCall1 = async () => {
      try {
        let response = await axios.get(`http://127.0.0.1:8000/api/itinerary/${search1}`);
        for (var i=0; i<(10); i++){
            let x = response.data[i].long;
            let y = response.data[i].lat;
            let startlong = Number(x);
            let startlat = Number(y);

            let x1 = response.data[i+1].long;
            let y1 = response.data[i+1].lat;
            let destlong = Number(x1);
            let destlat = Number(y1);

            console.log(startlong);
            console.log(startlat);
            console.log(destlong);
            console.log(destlat);

            let response1 = await axios.get(`https://api.mapbox.com/directions/v5/mapbox/driving/${startlong},${startlat};${destlong},${destlat}?geometries=geojson&access_token=pk.eyJ1IjoicmFuamFuNDM1IiwiYSI6ImNrNWIzdnNqeTE2ZjgzZG82OG40aG82ejcifQ.nrFTVyOERu6YhgS66Gxr8A`);
            let data = response1.data.routes[0].geometry.coordinates;
            // console.log(data);
            // let data1 = JSON.stringify(data);
            // console.log(data1);
            setCoordinatevalue(coordinatevalue => [...coordinatevalue, ...data]);

            let dist = response1.data.routes[0].distance;
            setDistance(dis => [...dis, dist]);

            let t = response1.data.routes[0].duration;
            setTime(tim => [...tim, t]);
        }
      } catch (err) {
        console.log(err);
      }
    };

    const apiCall2 = async () => {
        try {
            let response = await axios.get(`http://127.0.0.1:8000/api/itinerary/${search1}`);
            console.log(response.data);
            setFromapi(response.data);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect( () => {
        apiCall1();
        apiCall2();
    },[]);

    function indexplusone(index) {
        if(index<=9){
            console.log("this is index"+index);
            return(fromapi[index+1].name);
        }
}

    const dataOne = {
        type: "Feature",
        properties: {},
        geometry: {
            type: "LineString",
            coordinates: coordinatevalue
        }
    };
    
    return (
      <div>
        <Container className={classes.cover}>
            <Box>
                <Grid container>
                    <Grid item style={{ flexGrow:1 }}><Typography variant="h5" style={{ textAlign:'left' }}>Maps</Typography></Grid>
                </Grid>
            </Box>
            <Box>
                <Grid container>
                    <Grid item xs={9}>
                        <ReactMapGL
                            ref={mapRef}
                            {...viewport}
                            mapStyle={'mapbox://styles/kamalgodar/ckz5h5lys00h215ldob7bu2fc'}
                            mapboxApiAccessToken='pk.eyJ1Ijoia2FtYWxnb2RhciIsImEiOiJjazVpOGwxbWgwYnllM2ptbm43ajF0ZmQ0In0.f1zLLWQiv7d5tIc-Lu9n0w'
                            onViewportChange={(viewport) => {
                                setViewport(viewport);
                            }}
                            >       
                            <Geocoder
                                mapRef={mapRef}
                                containerRef={geocoderContainerRef}
                                onViewportChange={handleViewportChange}
                                mapboxApiAccessToken={MAPBOX_TOKEN}
                                position="top-right"
                            />

                            {fromapi.map((x, index) => (
                                <Marker key={x.id} latitude={Number(x.lat)} longitude={Number(x.long)} offsetTop={-(viewport.zoom*2+20)} offsetLeft={-(viewport.zoom*2)}>
                                <Button onClick={(e) => {
                                    e.preventDefault();
                                    setSelectedMarker(x);
                                }}>
                                
                                <img src='/images/bluemarker.png'
                                    width={viewport.zoom * 2}
                                    height={viewport.zoom * 2}
                                />
                                <h5 style={{color:'black'}}>{index+1}</h5>
                                </Button>

                            </Marker>

                            ))}

                            {selectedMarker && <Popup latitude={Number(selectedMarker.lat)} longitude={Number(selectedMarker.long)} onClose={()=>{setSelectedMarker(null);}}>
                                <Box>
                                    <h4>{selectedMarker.name}</h4>
                                    <h5>{selectedMarker.description}</h5>
                                </Box>
                            </Popup>
                            }

                            <Source id="polylineLayer" type="geojson" data={dataOne}>
                                <Layer
                                  id="lineLayer"
                                  type="line"
                                  source="my-data"
                                  layout={{
                                    "line-join": "round",
                                    "line-cap": "round"
                                  }}
                                  paint={{
                                    "line-color": "rgba(255, 0, 0, 0.8)",
                                    "line-width": 5
                                  }}
                                />
                            </Source>
                
                        </ReactMapGL>
                    </Grid>

                    <Grid item xs={3}>

                        <Box>
                            <table border={1} cellSpacing={0} cellPadding={5}>
                            <tr>
                                <th>From</th>
                                <th>To</th>
                                <th>Distance(km)</th>
                                <th>Time(min)</th>
                            </tr>

                            {fromapi.map((x,index) => (
                            <tr>
                                <td>{x.name}</td>
                                <td>{indexplusone(index)}</td>
                                <td>{parseFloat(dis[index]/1000).toFixed(4)}</td>
                                <td>{parseFloat(tim[index]/60).toFixed(3)}</td>
                            </tr>

                            ))}

                            </table>
                        </Box>
                    </Grid>
                </Grid>
                
            </Box>

            <Box>
            <form className='ui form' onSubmit={e => {handleSubmit(e)}}>
                <div className='field' style={{margin:5}}>
                    <label>Location to visit</label>
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
            </Box>
            
        </Container>

      </div>
    )
}

export default Itinerary;
