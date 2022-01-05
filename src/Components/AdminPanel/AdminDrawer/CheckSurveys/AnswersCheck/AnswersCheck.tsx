import React, {useEffect, useState} from 'react';
import {Table, TableBody, TableCell, TableContainer, TableRow, Typography} from "@mui/material";
import {useLazyQuery} from "@apollo/client";
import {GET_ANSWERS} from "../../../../../Queries/getAnswers";
import {tableRow} from "./styles";

export default function AnswersCheck({question}: IAnswersCheckProps) {
    const [getAnswers, { data: answersData }] = useLazyQuery(GET_ANSWERS);
    const [answers, setAnswers] = useState<{input: string, id: string}[]>([])

    useEffect(() => {
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
                    {answers.map((answer: {input: string, id:string}) => (
                            <TableRow  sx={tableRow}>
                                <TableCell>
                                    <Typography>{answer.input}</Typography>
                                </TableCell>
                            </TableRow>
                        )
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

interface IAnswersCheckProps {
    question: {text: string, id: string}
}