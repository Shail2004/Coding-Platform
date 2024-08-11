import React, { useState } from 'react';
import { Box, Button, FormControl, FormLabel, Input, Select, Textarea, VStack } from '@chakra-ui/react';

const CreateProblem = ({ onAddProblem }) => {
  const [description, setDescription] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [testCases, setTestCases] = useState([{ input: '', output: '' }]);
  const [example, setExample] = useState({ input: '', output: '' });

  const addTestCase = () => {
    setTestCases([...testCases, { input: '', output: '' }]);
  };

  const handleTestCaseChange = (index, field, value) => {
    const newTestCases = testCases.map((testCase, i) => {
      if (i === index) {
        return { ...testCase, [field]: value };
      }
      return testCase;
    });
    setTestCases(newTestCases);
  };

  const handleSubmit = () => {
    const newProblem = {
      description,
      difficulty,
      testCases,
      example,
    };
    onAddProblem(newProblem);
    // Reset form after submission
    setDescription('');
    setDifficulty('');
    setTestCases([{ input: '', output: '' }]);
    setExample({ input: '', output: '' });
  };

  return (
    <Box p={5} shadow='md' borderWidth='1px'>
      <VStack spacing={4}>
        <FormControl id='description'>
          <FormLabel>Description</FormLabel>
          <Textarea value={description} onChange={(e) => setDescription(e.target.value)} />
        </FormControl>
        <FormControl id='difficulty'>
          <FormLabel>Difficulty</FormLabel>
          <Select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
            <option value='easy'>Easy</option>
            <option value='medium'>Medium</option>
            <option value='hard'>Hard</option>
          </Select>
        </FormControl>
        <FormControl id='example-input'>
          <FormLabel>Example Input</FormLabel>
          <Input value={example.input} onChange={(e) => setExample({ ...example, input: e.target.value })} />
        </FormControl>
        <FormControl id='example-output'>
          <FormLabel>Example Output</FormLabel>
          <Input value={example.output} onChange={(e) => setExample({ ...example, output: e.target.value })} />
        </FormControl>
        {testCases.map((testCase, index) => (
          <VStack key={index} spacing={2}>
            <FormControl id={`input-${index}`}>
              <FormLabel>Test Case {index + 1} Input</FormLabel>
              <Input
                value={testCase.input}
                onChange={(e) => handleTestCaseChange(index, 'input', e.target.value)}
              />
            </FormControl>
            <FormControl id={`output-${index}`}>
              <FormLabel>Test Case {index + 1} Output</FormLabel>
              <Input
                value={testCase.output}
                onChange={(e) => handleTestCaseChange(index, 'output', e.target.value)}
              />
            </FormControl>
          </VStack>
        ))}
        <Button onClick={addTestCase}>Add Another Test Case</Button>
        <Button colorScheme='blue' onClick={handleSubmit}>
          Submit Problem
        </Button>
      </VStack>
    </Box>
  );
};

export default CreateProblem;
