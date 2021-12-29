import React, {ChangeEvent, FormEvent, useState} from 'react';
import {Box, TextField, Button, Grid, Typography, ButtonGroup} from "@mui/material";
import {useMutation} from "@apollo/client";
import createSurveyMutation from "../../Mutations/createSurvey";

export default function CreateSurvey() {
    const [actualQuestion, setActualQuestion] = useState("");
    const [title, setTitle] = useState("");
    const [questions, setQuestions] = useState<string[]>([]);
    const [createSurvey, { error }] = useMutation(createSurveyMutation(title, questions));
    const [surveyResponse, setSurveyResponse] = useState({
        createSurvey: {
            url: "",
        },
    });
    
    const handleTitleChange = ({currentTarget}: ChangeEvent) => {
        const element = currentTarget as HTMLInputElement;
        const value = element.value;
        setTitle(value);
    }  
    
    const handleActualQuestionChange = ({currentTarget}: ChangeEvent) => {
        const element = currentTarget as HTMLInputElement;
        const value = element.value;
        setActualQuestion(value);
    }
    
    const handleAddQuestionClick = () => {
        setQuestions((prevState) => [...prevState, actualQuestion]);
        setActualQuestion("");
    }
    
    const handleAddSurveySubmit = async (event: FormEvent) => {
        event.preventDefault()
        const response = await createSurvey()
        if(error) {
        }
        if(response) {
            await setSurveyResponse(response.data)
        }
    }
    
    return (
        <Box>
            <form onSubmit={(event) => handleAddSurveySubmit(event)}>
                <Grid container spacing={2} sm={4}>
                    <Grid item sm={12}>
                        <TextField 
                            onChange={(event) => handleTitleChange(event)}
                            label="Name" 
                            value={title}
                            fullWidth
                        />
                    </Grid>
                    {questions.map((question) => {
                        return (
                            <Grid item sm={12}>
                                <Typography fontFamily="Open Sans" >{question}</Typography>
                            </Grid>
                        )
                    })}
                    <Grid item sm={12}>
                        <TextField
                            onChange={(event) => handleActualQuestionChange(event)}
                            label="New question"
                            value={actualQuestion}
                            fullWidth
                        />
                    </Grid>
                    <Grid item sm={12}>
                        <ButtonGroup>
                            <Button
                                onClick={handleAddQuestionClick}
                                variant="contained">Add
                            </Button>
                            <Button
                                type="submit"
                                variant="contained">Submit
                            </Button>
                        </ButtonGroup>
                    </Grid>
                </Grid>
            </form>
            <Box my={2}>
                <Typography>{surveyResponse.createSurvey.url && "Grab URL with access to your survey:"}</Typography>
                <Typography sx={{}}>{surveyResponse.createSurvey.url}</Typography>
            </Box>
        </Box>
    )
}