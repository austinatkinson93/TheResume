# TheResume

Welcome to The Resume. This is a command line application that wil generate a simple PDF file based off of user input.

## installation
* Here is the link to the [GitHub Repository](https://github.com/austinatkinson93/TheResume)
* Have a look at my [Bootstrap portfolio](https://austinatkinson93.github.io/TheResume/)

## Usage
The applicaiton is fairly simple.

- 1. first you must pull the repository to your personal device and install all required npm packages.
    - this application utilizes: 
        * inquirer
        * axios
        * html5topdf

- 2. Once downloaded simply running the application with node by entering "node index.js" in the command line.
    - you will be prompted to answer two questions: 
        * what color would you like the resume to be
        *  desired applicants Github profile username

- 3. Once completed an easily accessible html and pdf file will be created in the same file as the rest of the code.
    - your newly generated PDF will include
        * Profile image
        * User name
        * Links to the following:
            * User location via Google Maps
            * User GitHub profile
            * User blog
        * User bio
        * Number of public repositories
        * Number of followers
        * Number of GitHub stars
        * Number of users following

    Here is a demonstration of the application at work. Enjoy!

DEMO -

![The Resume Demo](demo/ApplicationExample.gif)
   
    
## Credits 

Austin Atkinson: [GitHub](https://github.com/austinatkinson93)


## License

Copyright (c) [2020] [Austin Atkinson]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.