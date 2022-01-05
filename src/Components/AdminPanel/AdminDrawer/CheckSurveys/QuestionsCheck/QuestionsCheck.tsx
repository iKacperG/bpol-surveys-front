import React from 'react';
import {
    Accordion, AccordionSummary, Typography,
} from "@mui/material";

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AnswersCheck from "../AnswersCheck";

export default function QuestionsCheck({questions}: IQuestionsCheckProps) {

    return (
        <>
            {questions.map((question) => {
                return (
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Typography sx={{fontWeight: "bold"}}>{question.text}</Typography>
                        </AccordionSummary>
                        <AnswersCheck question={question} />
                    </Accordion>
                )
            })}
        </>
    )
}

interface IQuestionsCheckProps {
    questions: {
        text: string,
        id: string,
        inputType: string,
        average: number
    }[]
}