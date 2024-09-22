import React, { useState } from 'react';
import { Table, Thead, Tbody, Tr, Th, Td, TableContainer, Badge, Button, Box } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const ProblemTable = () => {
  const [problems, setProblems] = useState([
    {
      id: 1,
      number: "1",
      name: "Two Sum",
      topic: "Array, Hash Table",
      difficulty: "Easy"
    },
    {
      id: 2,
      number: "2",
      name: "Add Two Numbers",
      topic: "Linked List, Math",
      difficulty: "Medium"
    },
    {
      id: 3,
      number: "3",
      name: "Longest Substring Without Repeating Characters",
      topic: "Hash Table, String, Sliding Window",
      difficulty: "Medium"
    },
    {
      id: 4,
      number: "4",
      name: "Median of Two Sorted Arrays",
      topic: "Array, Binary Search, Divide and Conquer",
      difficulty: "Hard"
    },
  ]);

  return (
    <Box>
      <Button as={Link} to="/create-problem" colorScheme="teal" mb={4}>
        Create a Problem
      </Button>
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Problem No</Th>
              <Th>Problem Name</Th>
              <Th>Topic</Th>
              <Th>Difficulty</Th>
            </Tr>
          </Thead>
          <Tbody>
            {problems.map((problem) => (
              <Tr key={problem.id}>
                <Td>{problem.number}</Td>
                <Td>
                  <Link to={`/problem/CodingArena`}>{problem.name}</Link>
                </Td>
                <Td>{problem.topic}</Td>
                <Td>
                  <Badge colorScheme={
                    problem.difficulty === 'Easy' ? 'green' :
                    problem.difficulty === 'Medium' ? 'orange' :
                    'red'
                  }>
                    {problem.difficulty}
                  </Badge>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ProblemTable;
