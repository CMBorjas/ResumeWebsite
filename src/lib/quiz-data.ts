export type QuestionType = 'multiple_choice' | 'fill_in_blank'

export type QuizQuestion = {
  id: string
  title: string
  difficulty: 'Easy' | 'Medium' | 'Hard'
  type: QuestionType
  prompt: string
  codeSnippet?: string
  
  // For multiple choice
  options?: string[]
  correctOptionIndex?: number
  
  // For fill in blank (strict string matching)
  correctAnswers?: string[] // Multiple accepted strings just in case
  
  explanation: string
}

export const quizQuestions: QuizQuestion[] = [
  {
    id: 'q1',
    title: 'Two Sum Time Complexity',
    difficulty: 'Easy',
    type: 'multiple_choice',
    prompt: 'What is the optimal time complexity for the Two Sum problem using a Hash Map?',
    codeSnippet: `function twoSum(nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    map.set(nums[i], i);
  }
}`,
    options: ['O(1)', 'O(n)', 'O(n log n)', 'O(n^2)'],
    correctOptionIndex: 1,
    explanation: 'By storing visited elements in a Hash Map, we only need to iterate through the array once, yielding O(n) time complexity.'
  },
  {
    id: 'q2',
    title: 'Binary Search Variable',
    difficulty: 'Easy',
    type: 'fill_in_blank',
    prompt: 'Fill in the blank to complete the standard Binary Search condition: `while (left <= _____)`',
    codeSnippet: `function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;
  
  while (left <= _____) {
    let mid = Math.floor((left + right) / 2);
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) left = mid + 1;
    else right = mid - 1;
  }
  return -1;
}`,
    correctAnswers: ['right', 'right '],
    explanation: 'The loop must continue as long as the left pointer has not crossed the right pointer.'
  },
  {
    id: 'q3',
    title: 'Valid Parentheses Data Structure',
    difficulty: 'Medium',
    type: 'multiple_choice',
    prompt: 'Which data structure is most optimal for solving the "Valid Parentheses" algorithm?',
    options: ['Queue', 'Linked List', 'Stack', 'Binary Search Tree'],
    correctOptionIndex: 2,
    explanation: 'A Stack strictly follows LIFO (Last In First Out), allowing you to push open brackets and pop when encountering matching closing brackets.'
  },
  {
    id: 'q4',
    title: 'Fibonacci Memoization',
    difficulty: 'Medium',
    type: 'fill_in_blank',
    prompt: 'What is the exact Big-O time complexity of computing the nth Fibonacci number WITH memoization? (e.g. type `O(n)`)',
    codeSnippet: `const memo = {};
function fib(n) {
  if (n <= 1) return n;
  if (memo[n]) return memo[n];
  memo[n] = fib(n - 1) + fib(n - 2);
  return memo[n];
}`,
    correctAnswers: ['O(n)', 'o(n)'],
    explanation: 'Memoization caches previously computed values, meaning we only compute each Fibonacci number from 1 to n exactly once.'
  },
  {
    id: 'q5',
    title: 'Graph Traversal',
    difficulty: 'Hard',
    type: 'multiple_choice',
    prompt: 'When finding the shortest path in an unweighted graph, which algorithm should be used?',
    options: ['Depth First Search (DFS)', 'Breadth First Search (BFS)', "Dijkstra's Algorithm", 'A* Search'],
    correctOptionIndex: 1,
    explanation: "BFS explores nodes layer by layer, naturally finding the shortest path in an unweighted graph without the overhead of Dijkstra's priority queue."
  }
]
