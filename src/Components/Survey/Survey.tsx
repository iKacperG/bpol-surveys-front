import React, {useEffect, useState} from 'react';
import { useParams } from "react-router";
import {useQuery} from "@apollo/client";
import {GET_SURVEY} from "../../Queries/getSurvey";
import Questions from "./Questions";
import {
    Container,
    Box,
    Grid,
    Typography,
    Paper,
} from "@mui/material"

export default function Survey() {
    const [surveyName, setSurveyName] = useState("")
    const { id } = useParams();
    const { data } = useQuery(GET_SURVEY, {variables: {id: id}});
    
    useEffect(() => {
        if(data) {
            setSurveyName(data.getSurvey.name)
        }
    }, [data])
    
    return (
        <Box sx={{bgcolor: '#eee'}}>
            <Container fixed>
                <Paper>
                    <Grid 
                        container
                        spacing={2}
                        justifyContent="center" 
                        sx={{ height: '100vh' }}>
                        <Grid item xs={12}>
                            <Typography 
                                variant="h1" textAlign="center" mt={5}>{surveyName}
                            </Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Container maxWidth="sm">
                                <Questions />
                            </Container>
                        </Grid>
                    </Grid>
                </Paper>
            </Container>
        </Box>
    )
}