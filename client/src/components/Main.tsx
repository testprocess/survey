import React, { useState, useEffect } from "react";
import { Button, Box, Grid } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom"

import Navbar, { ButtonBox } from './common/Navbar'
import { Survey } from "./Survey";

function Main() {
    const isLogin = useSelector((state: any) => state.auth.isLogin);

    return (
        <Grid container sx={{ marginTop: "3rem" }} spacing={3}>
            <Navbar>
                <ButtonBox isLogin={isLogin}></ButtonBox>
            </Navbar>

        <Grid item xs md>
        </Grid>
        <Grid item xs={10} md={6}>
        
            <Box sx={{ display: 'grid', marginBottom: "2rem", marginTop: "3rem" }}>
                <Box sx={{ justifyContent: 'center', textAlign: 'center' }}>
                    <Survey></Survey>
                    
                </Box>

            </Box>
        </Grid>
        <Grid item xs md>
        </Grid>
        </Grid>

    );
}



export default Main;