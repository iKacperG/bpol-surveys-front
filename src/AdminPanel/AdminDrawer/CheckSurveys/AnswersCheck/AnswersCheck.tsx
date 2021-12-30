import React, {useEffect, useState} from 'react';
import {Table, TableBody, TableCell, TableContainer, TableRow, Typography} from "@mui/material";
import {useLazyQuery} from "@apollo/client";
import {GET_ANSWERS} from "../Queries/getAnswers";

export default function AnswersCheck({question}: AnswersCheckProps) {
    const [getAnswers, { data: answersData }] = useLazyQuery(GET_ANSWERS);
    const [answers, setAnswers] = useState<{input: string, id: string}[]>([])

    useEffect(() => {
        console.log(question.id)
        getAnswers({variables: {
                questionId: question.id,
            }})
    }, [question, getAnswers])

    useEffect(() => {
        if(answersData) {
            setAnswers(answersData.findAnswers)
        }
    }, [answersData])
    
    return (
        <TableContainer>
            <Table>
                <TableBody>
                    {answers.map((answer: {input: string, id:string}) => {
                        console.log(answer)
                        return (
                            <TableRow  sx={{'&:nth-of-type(odd)': {
                                    backgroundColor: '#e8edf3',
                                },}}>
                                <TableCell><Typography>{answer.input}</Typography></TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export interface AnswersCheckProps {
    question: {text: string, id: string}
}