import React, {useEffect, useState} from 'react';
import {useLazyQuery, useQuery} from "@apollo/client";
import {GET_ALL_SURVEYS} from "../../../../Queries/getAllSurveys";
import { Grid, Paper } from "@mui/material";
import QuestionsCheck from "./QuestionsCheck";
import {GET_QUESTIONS} from "../../../../Queries/getQuestions";
import {grid, paper} from "./styles";

export default function CheckSurveys() {
    const { data: surveysData } = useQuery(GET_ALL_SURVEYS);
    const [getQuestions, { data: questionsData }] = useLazyQuery(GET_QUESTIONS);
    const [allSurveys, setAllSurveys] = useState([])
    const [questions, setQuestions] = useState<{text: string, id: string, inputType: string, average: number}[]>([])
    
    const handleCheckSurvey = (surveyId: string) => {
        return getQuestions({variables: {
            surveyId: surveyId,
            }})
    }
        
    useEffect(() => {
        if(surveysData) {
            setAllSurveys(surveysData.getAllSurveys)
        }
    }, [surveysData]) 
    
    useEffect(() => {
        if(questionsData) {
            setQuestions(questionsData.findQuestions)
        }
    }, [questionsData])

    return (
        <>
            <Grid container>
                {allSurveys.map((survey: {name: string, id: string}) => {
                    return (
                        <Grid item sx={grid}>
                            <Paper sx={paper}
                                   elevation={1}
                                   onClick={() => handleCheckSurvey(survey.id)}
                            >
                                {survey.name}
                            </Paper>
                        </Grid>
                    )
                })}
            </Grid>
        <QuestionsCheck questions={questions} />
    </>
    )
}