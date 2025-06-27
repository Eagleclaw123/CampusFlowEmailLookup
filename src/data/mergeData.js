function mergeStudentPasswords() {
  try {
    // Import the student data
    const { studentsData } = require("./studentsData.js");

    // Import the passwords data
    const { data: passwordsData } = require("./studentsPasswords.js");

    // Create a map of roll numbers to passwords for faster lookup
    const passwordMap = {};
    passwordsData.forEach((student) => {
      passwordMap[student["Roll Number"]] = student.Password;
    });

    // Add passwords to student data
    const updatedStudentsData = studentsData.map((student) => {
      const password = passwordMap[student.RollNumber];
      return {
        ...student,
        Password: password || null, // Add null if password not found
      };
    });

    // Write the merged data to a new file
    const fs = require("fs");
    const outputContent = `export const studentsData = ${JSON.stringify(
      updatedStudentsData,
      null,
      2
    )};`;
    fs.writeFileSync("mergedStudentsData.js", outputContent);

    console.log("Successfully merged student data with passwords!");
    console.log(`Total students processed: ${updatedStudentsData.length}`);

    // Show statistics
    const studentsWithPasswords = updatedStudentsData.filter(
      (s) => s.Password !== null
    ).length;
    const studentsWithoutPasswords =
      updatedStudentsData.length - studentsWithPasswords;

    console.log(`Students with passwords: ${studentsWithPasswords}`);
    console.log(`Students without passwords: ${studentsWithoutPasswords}`);

    if (studentsWithoutPasswords > 0) {
      console.log("\nStudents without passwords:");
      updatedStudentsData
        .filter((s) => s.Password === null)
        .forEach((s) => console.log(`- ${s.Name} (${s.RollNumber})`));
    }
  } catch (error) {
    console.error("Error merging files:", error.message);
  }
}

// Run the merge function
mergeStudentPasswords();
