import React, {ChangeEvent, useEffect, useState} from 'react';
import { useParams } from "react-router";
import { useQuery} from "@apollo/client";
import {GET_MATCHING_QUESTIONS} from "../../../Queries/getMatchingQuestions";
import {
    Box,
    FormControl,
    FormControlLabel,
    Radio,
    RadioGroup,
    TextField,
    Typography,
} from "@mui/material";
import AnswersSubmit from "../AnswersSubmit";

export default function Questions() {
    const { id } = useParams();
    const { data } = useQuery(GET_MATCHING_QUESTIONS, {variables: {id: id}});
    const [questions, setQuestions] = useState([])
    const [answers, setAnswers] = useState<{input: string, questionId: string}[]>([])
    
    const getActualQuestionInput = (question: IObjectAny) => {
        return answers[answers.findIndex(
            (answer) => answer.questionId === question.id)]?.input
    }

    const handleAnswerTyping = (questionId: string, event: ChangeEvent) => {
        const element = event.currentTarget as HTMLInputElement;
        const actualQuestionIndex = answers
            .findIndex((element) =>  element.questionId === questionId)
        
        if(actualQuestionIndex === -1) {
            setAnswers([...answers, { input: element.value, questionId: questionId}])
        }
        else {
            let tempAnswers = [...answers];
            tempAnswers[actualQuestionIndex] = {
                ...answers[actualQuestionIndex],
                input: element.value,
                questionId: questionId
            };

            setAnswers(tempAnswers)
        }
    }
    
    useEffect(() => {
        if(data) {
            setQuestions(data.findQuestions)
        }
    }, [data])
    
    return (
        <>
            <Typography>{id}</Typography>
            <form>
                {questions.map((question: IObjectAny) => {
                    return (
                        <Box sx={{bgcolor: '#fcfcfc', borderRadius: '5%'}}>
                            <Typography my={2} fontFamily="Open Sans">{question.text}</Typography>
                            {question.inputType === 'scale' ?
                                <FormControl component="fieldset">
                                    <RadioGroup 
                                        row 
                                        aria-label="gender" 
                                        name="row-radio-buttons-group"
                                        value={getActualQuestionInput(question)}
                                        onChange={(event) => handleAnswerTyping(question.id, event)}
                                    >
                                        {[...Array(10)].map((element, step) => {
                                          return  <FormControlLabel value={step+1} control={<Radio />} label={step+1} />

                                        })}
                                    </RadioGroup>
                                </FormControl>
                                :
                                <TextField
                                variant="outlined"
                                value={getActualQuestionInput(question)}
                                onChange={(event) => handleAnswerTyping(question.id, event)}
                            /> 
                            }
                         
                        </Box>
                    )
                })}
                <AnswersSubmit answers={answers}/>
            </form>
        </>
    )
}

export interface IObjectAny {
    [key: string]: any;
}