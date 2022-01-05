import React, { FormEvent } from 'react';
import { useMutation } from "@apollo/client";
import {Button} from "@mui/material";
import {IAppProps} from "../../../App";
import {SUBMIT_ANSWERS} from "../../../Mutations/submitAnswers";

export default function AnswersSubmit({ answers }: IAppProps) {
    const [submitAnswers, { data: answerSubmitData }] = useMutation(SUBMIT_ANSWERS);

    const handleAnswersSubmit = async (event: FormEvent) => {
        event.preventDefault();
        await submitAnswers({
            variables: {
                userAnswers: answers
            }
        });
    }

    return (
        answerSubmitData?.addAnswers.response ||  
        <Button onClick={handleAnswersSubmit} type="submit">Submit</Button>
    )
}