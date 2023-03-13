// Get references to HTML elements
console.log('Script loaded!');
const csvDataTextarea = document.getElementById('csv-data');
const parseBtn = document.getElementById('parse-btn');
const outputList = document.getElementById('output-list');

// Add event listener to parse button
parseBtn.addEventListener('click', () => {
  // Parse the CSV data using Papa Parse library
  const parsedData = Papa.parse(csvDataTextarea.value.trim(), { header: true });

  // Get the column names (excluding the ID column)
  const columns = Object.keys(parsedData.data[0]).filter(column => column !== 'ID');

  // Iterate over all combos of headings
  for (let i = 1; i <= columns.length; i++) {
    const combos = getCombinations(columns, i);
    combos.forEach(candidate => {
      // Filter the data based on the candidate key
      const filteredData = parsedData.data.filter(row => {
        const values = candidate.map(column => row[column]);
        return values.join(',') === candidate.length.toString();
      });
      // If filtered data has the same length as the original data, it's a candidate key
      if (filteredData.length === parsedData.data.length) {
        const li = document.createElement('li');
        li.textContent = candidate.join(',');
        outputList.appendChild(li);
      }
    });
  }
});

// Helper function to generate all combinations of a given size from an array
function getCombinations(arr, size) {
  const result = [];
  const current = new Array(size);
  function helper(startIndex, currentSize) {
    if (currentSize === size) {
      result.push(current.slice());
      return;
    }
    for (let i = startIndex; i < arr.length; i++) {
      current[currentSize] = arr[i];
      helper(i + 1, currentSize + 1);
    }
  }
  helper(0, 0);
  return result;
}
