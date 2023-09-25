import React, { useState } from 'react';
import { Button, Container, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Checkbox, FormGroup, Typography, TextField } from '@mui/material';

interface SurveyQuestion {
  id: number;
  question: string;
  inputType: 'text' | 'radio' | 'checkbox' | "number";
  options?: string[];
}

const Survey: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState<boolean>(false);
  
  const surveyQuestions: SurveyQuestion[] = [
    { id: 1, question: 'What is your name?', inputType: 'text' },
    { id: 2, question: 'What is your favorite color?', inputType: 'text' },
    { id: 3, question: 'How often do you exercise?', inputType: 'radio', options: ['Daily', 'Weekly', 'Monthly', 'Rarely', 'Never'] },
    { id: 4, question: 'Which sports do you enjoy?', inputType: 'checkbox', options: ['Football', 'Basketball', 'Tennis', 'Swimming', 'Other'] },
    { id: 5, question: 'What is your age?', inputType: 'text' },
  ];
  
  const handleNextQuestion = () => {
    if (currentQuestion < surveyQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Handle survey submission
      setSubmitted(true);
    }
  };

  const handleAnswerChange = (event: any) => {
    const newAnswers = [...answers];
    
    if (surveyQuestions[currentQuestion].inputType === 'checkbox') {
      const selectedOptions = (event as React.ChangeEvent<HTMLInputElement[]>).target;
      const selectedValues = Array.from(selectedOptions)
        .filter((option) => option.checked)
        .map((option) => option.value);
        
      newAnswers[currentQuestion] = selectedValues.join(', ');
    } else {
      newAnswers[currentQuestion] = (event as React.ChangeEvent<HTMLInputElement>).target.value;
    }
    
    setAnswers(newAnswers);
  };

  return (
    <Container>
      <Typography variant="h4">Survey</Typography>
      <div>
        {!submitted ? (
          <div>
            <Typography variant="body1">{surveyQuestions[currentQuestion].question}</Typography>
            {surveyQuestions[currentQuestion].inputType === 'text' && (
              <TextField
                variant="outlined"
                fullWidth
                value={answers[currentQuestion] || ''}
                onChange={handleAnswerChange}
              />
            )}
            {surveyQuestions[currentQuestion].inputType === 'number' && (
              <TextField
                type="number"

                variant="outlined"
                fullWidth
                value={answers[currentQuestion] || ''}
                onChange={handleAnswerChange}
              />
            )}
            {surveyQuestions[currentQuestion].inputType === 'radio' && (
              <FormControl component="fieldset">
                <FormLabel component="legend">Select one:</FormLabel>
                <RadioGroup
                  name={`radio-${currentQuestion}`}
                  value={answers[currentQuestion] || ''}
                  onChange={handleAnswerChange}
                >
                  {surveyQuestions[currentQuestion].options?.map((option, index) => (
                    <FormControlLabel
                      key={index}
                      value={option}
                      control={<Radio />}
                      label={option}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            )}
            {surveyQuestions[currentQuestion].inputType === 'checkbox' && (
              <FormControl component="fieldset">
                <FormLabel component="legend">Select one or more:</FormLabel>
                <FormGroup>
                  {surveyQuestions[currentQuestion].options?.map((option, index) => (
                    <FormControlLabel
                      key={index}
                      control={<Checkbox />}
                      label={option}
                      value={option}
                      checked={answers[currentQuestion]?.includes(option) || false}
                      onChange={handleAnswerChange}
                    />
                  ))}
                </FormGroup>
              </FormControl>
            )}
            <Button variant="contained" color="primary" onClick={handleNextQuestion}>
              {currentQuestion < surveyQuestions.length - 1 ? 'Next' : 'Submit'}
            </Button>
          </div>
        ) : (
          <div>
            <Typography variant="h5">Survey Results</Typography>
            <ul>
              {surveyQuestions.map((question, index) => (
                <li key={index}>
                  <strong>{question.question}:</strong> {answers[index]}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </Container>
  );
};

export { Survey };
