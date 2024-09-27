const fs = require('fs');
const path = require('path');

// Get the directory path of the JSON files
const directoryPath = path.join(__dirname, 'src', 'content', 'tags');

// Get all file names in the directory
const fileNames = fs.readdirSync(directoryPath);

// Create an empty array to hold the tags options
const tagsOptions = [];

// Process each file
fileNames.forEach((fileName) => {
  // Load the JSON file
  const filePath = path.join(directoryPath, fileName);
  const fileContent = fs.readFileSync(filePath, 'utf8');

  // Parse the JSON content
  const tagData = JSON.parse(fileContent);

  // Add the tag name to the options array
  tagsOptions.push({ value: tagData.name, label: tagData.name });
});

// Write the tagsOptions to a file
fs.writeFileSync(path.join(__dirname, 'src', 'tagsOptions.json'), JSON.stringify(tagsOptions));