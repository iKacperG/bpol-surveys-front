import React, { FormEvent } from 'react';
import { useMutation } from "@apollo/client";
import { Button } from "@mui/material";
import submitAnswersMutation from "../Mutations/submitAnswers";
import { AppProps } from "../../App";

export default function AnswersSubmit({ answers }: AppProps) {
    const mutation = submitAnswersMutation(answers)
    const [submitAnswers, { error }] = useMutation(mutation);

    const handleAnswersSubmit = async (event: FormEvent) => {
        event.preventDefault()
        const response = await submitAnswers()
        if(error) {
        }
        if(response) {
            await console.log(response);
        }
    }
    
    return (
        <>
            <Button onClick={handleAnswersSubmit} type="submit">Submit</Button>
        </>
    )
}