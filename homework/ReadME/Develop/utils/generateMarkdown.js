function generateMarkdown(data) {
  return `
  # ${data.title}

  [![License: ${data.license}](https://img.shields.io/badge/License-${data.license}-blue.svg)](https://opensource.org/licenses/${data.license})
  
  ## Description 
  
  ${data.description}

  ## Table of Contents
  
  [Installation](#installation)
  
  [Usage](#usage)
  
  [Contributing](#contributing)
  
  [Tests](#tests)
  
  [Questions](#questions)
  
  [License](#license)

  ## Installation
  
  ${data.installation}

  ## Usage
  
  ${data.usage}

  ## Contributing
  
  ${data.contributing}

  ## Tests
  
  ${data.tests}

  ## Questions
  
  Github username : ${data.username}
  
  Link to my profile: https://github.com/${data.username}
  
  If you have any additional questions, you can reach me at ${data.email}. 

  ## License 
  
  Licensed under the ${data.license} license. 
  
`;
}
module.exports = generateMarkdown;
