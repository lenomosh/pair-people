# Student Standup Pairing Tool

The program is a tool used to pair up students who will run both morning and evening sessions of the meeting. It can also be used to pair up students for peer programming and other coding challenges. It is completely random with no dependent variables.

## Instructions

Please keep in mind that the program has no UI and other users might find it challenging to use. Open the index.html file in your desired text editor and provide the index.js file.

## Functions Explained

The **pairPeople()** function expects two parameters, the data array containing the students and the number of students you wish to have in one group. The function then returns an array with the said groups members.

**generateOneWeekData()** generates pairs that will lead the standups for both morning and evening session. The function returns an object where the keys are days of the week from Monday to Friday.

**downloadData()** expects three parameters; data, filename and extension. This function generates a download link for files of type either JSON or csv.

**formateDataAsCSV()** expects jsonData to be the data generated or has the same format as **generateOneWeekData()** function.
