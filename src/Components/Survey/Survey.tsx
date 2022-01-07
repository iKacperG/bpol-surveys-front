import React, {useEffect, useState} from 'react';
import { useParams } from "react-router";
import {useQuery} from "@apollo/client";
import {GET_SURVEY} from "../../Queries/getSurvey";
import Questionnaire from "./Questionnaire";
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
            <Container maxWidth="xl">
                <Paper>
                    <Grid 
                        container
                        spacing={2}
                        justifyContent="center" 
                        sx={{ height: '100vh', overflow: 'auto' }}>
                        <Grid item xs={12}>
                            <Typography 
                                variant="h1" textAlign="center" fontSize={64} mt={5}>{surveyName}
                            </Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Container maxWidth="sm">
                                <Questionnaire />
                            </Container>
                        </Grid>
                    </Grid>
                </Paper>
            </Container>
        </Box>
    )
}