import React, {ChangeEvent, FormEvent, useState} from 'react';
import {
    Box,
    TextField,
    Button,
    Grid,
    Typography,
    ButtonGroup,
    FormControlLabel,
    FormControl,
    RadioGroup,
    Radio,
} from "@mui/material";
import {useMutation} from "@apollo/client";
import {CREATE_SURVEY} from "../../Mutations/createSurvey";

export default function CreateSurvey() {
    const [actualQuestion, setActualQuestion] = useState({
        text: "",
        inputType: "text",
    });
    const [inputType, setInputType] = useState("text")
    const [title, setTitle] = useState("");
    const [questions, setQuestions] = useState<{text: string, inputType: string}[]>([]);
    const [createSurvey, { error }] = useMutation(CREATE_SURVEY);
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
        setActualQuestion({...actualQuestion, text: value,});
    }
    
    const handleRadioChange = ({target}: ChangeEvent) => {
        const element = target as HTMLInputElement;
        const value = element.value;
        setActualQuestion({...actualQuestion, inputType: value})
        setInputType(value);
    }
    
    const handleAddQuestionClick = () => {
        setQuestions((prevState) => [...prevState, actualQuestion]);
    }
    
    const handleAddSurveySubmit = async (event: FormEvent) => {
        event.preventDefault()
        const response = await createSurvey({variables: {title: title, questions: questions}})
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
                                <Typography fontFamily="Open Sans" >{question.text}</Typography>
                            </Grid>
                        )
                    })}
                    <Grid item sm={12}>
                        <TextField
                            onChange={(event) => handleActualQuestionChange(event)}
                            label="New question"
                            value={actualQuestion.text}
                            fullWidth
                        />
                        <FormControl component="fieldset">
                            <RadioGroup
                                row
                                aria-label="input type"
                                defaultValue="text"
                                name="radio-buttons-group"
                                value={inputType}
                                onChange={handleRadioChange}
                            >
                                <FormControlLabel value="text" control={<Radio />} label="Text" />
                                <FormControlLabel value="scale" control={<Radio />} label="Scale" />
                            </RadioGroup>
                        </FormControl>
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