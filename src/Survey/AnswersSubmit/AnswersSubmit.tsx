import React, { FormEvent } from 'react';
import { useMutation } from "@apollo/client";
import { Button } from "@mui/material";
import { AppProps } from "../../App";
import {SUBMIT_ANSWERS} from "../Mutations/submitAnswers";

export default function AnswersSubmit({ answers }: AppProps) {
    const [submitAnswers, { error }] = useMutation(SUBMIT_ANSWERS);

    const handleAnswersSubmit = async (event: FormEvent) => {
        event.preventDefault()
        const response = await submitAnswers({variables: {userAnswers: answers}})
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