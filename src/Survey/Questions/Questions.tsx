import React, {ChangeEvent, useEffect, useState} from 'react';
import { useParams } from "react-router";
import { useQuery} from "@apollo/client";
import getMatchingQuestions from "../Queries/getMatchingQuestions";
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

export interface IObjectAny {
    [key: string]: any;
}

export default function Questions() {
    const [, setQuestions] = useState([])
    const { id } = useParams();
    const { data } = useQuery(getMatchingQuestions(id));
    const [answers, setAnswers] = useState<{input: string, questionId: string}[]>([])

    const handleAnswerTyping = (questionId: string, event: ChangeEvent) => {
        const element = event.currentTarget as HTMLInputElement;
        const actualQuestionIndex = answers
            .findIndex((element) =>  element.questionId === questionId)
        
        if(actualQuestionIndex === -1) {
            setAnswers([...answers, { input: element.value, questionId: questionId}])
        }
        else {
            let items = [...answers];
            let item = {...answers[actualQuestionIndex]};

            item.input = element.value;
            item.questionId = questionId
            items[actualQuestionIndex] = item;
            setAnswers(items)
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
                {data?.findQuestions.map((question: IObjectAny) => {
                    const actualQuestionInput = answers[answers.findIndex((i) => i.questionId === question.id)]?.input
                    return (
                        <Box sx={{bgcolor: '#fcfcfc', borderRadius: '5%'}}>
                            <Typography my={2} fontFamily="Open Sans">{question.text}</Typography>
                            {question.inputType === 'scale' ?
                                <FormControl component="fieldset">
                                    <RadioGroup 
                                        row 
                                        aria-label="gender" 
                                        name="row-radio-buttons-group"
                                        value={actualQuestionInput}
                                        onChange={(event) => handleAnswerTyping(question.id, event)}
                                    >
                                        {[...Array(10)].map((e, step) => {
                                          return  <FormControlLabel value={step+1} control={<Radio />} label={step+1} />

                                        })}
                                    </RadioGroup>
                                </FormControl>
                                :
                                <TextField
                                variant="outlined"
                                value={actualQuestionInput}
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