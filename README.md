# Graph Search

<div>
  Implementation of A* algorithm to solve two problems:
  <ul>
    <li>4x4 Sudoku</li>
    <li>15-Puzzle</li>
  </ul>
</div>

```/components``` contains ```PuzzleBoard``` and ```SudokuBoard``` UI components. ```/containers/HomePage``` implements both React components. ```/GraphSearch``` contains ```js``` classes that implement a solution to a problem with A*:

<div>
  <ul>
    <li><strong>Node.js:</strong> Implements a Graph Node.</li>
    <li><strong>OperationHelpers.js and SearchHelpers.js:</strong> Contains helper functions and A* implementation.</li>
    <li><strong>Problem.js:</strong> Creates a Problem object that will need to be solved.</li>
    <li><strong>State.js:</strong> State object used to save current configuration for problem.</li>
  </ul>
</div>

## References

<div>
  <ul>
    <li><a href="https://github.com/react-boilerplate/react-boilerplate">React Boilerplate</a>. Used to start a React project.</li>
    <li><a href="https://www.cs.bham.ac.uk/~mdr/teaching/modules04/java2/TilesSolvability.html">15-Puzzle Solvability</a>. Literature for determining 15-Puzzle Solvability.</li>
  </ul>
</div>