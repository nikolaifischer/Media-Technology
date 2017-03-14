# mtPlannr - Media Technology Angular Frontend

## Installation
1. Download the repository
2. Install npm modules: `npm install`
3. Install bower dependencies `bower install`
4. Start up the server: `node server.js`
5. View in browser at http://localhost:8080

Edit app.js to point the app to a local API for testing!



--------------------------------------

## General Information

* There are 3 user levels:
  * Student
    - Can participate in labs and exercises and create or enter groups
  * Tutor
    - Can create and exercises and labs
  * Administrator
    - Has full rights to edit, delete and create

# First Start

1. Log in as Admin
2. A pop-up appears which allows you to create a new Semester. Do this to avoid errors.

## Home

**Group**

**News**

**Calendar**
In the calendar are displayed all important dates for each user.
On click you can see details (time, location,...) of the appointment.

Student:
* Unique Dates (Exam,...)
* Exercises he/she assigned to in exercises tab
* Labs his/her group got assigned to after the algorithm processed the priorities

Tutor:
* Unique Dates (Exam,...)
* Exercises he/she is assigned to as tutor
* Labs he/she is assigned to as tutor

Admin:
* Unique Dates (Exam,...)

## Whitelists

Whitelists are used to allow only specific users (participants of the course) to
register accounts for this platform.

**Create or edit the whitelist**

* As an Admin click on the red user icon in the top left corner
* Upload a CSV... TODO HIER WEITER

## Labs

There are 3 LabTypes (Photo, Video and Audio). Every Group has to select 3 Priorities for each of the LabTypes. An algorithm decides which dates are assigned to which group.

**Edit LabTypes**

* As Admin select LabType Management in the Admin Tools.
* Edit the descriptions for Tutors and Students. These description will be shown in the respective lab tab.
* Set a deadline for the priority selection. After this date, students will not be able to select priorities.
* Open the priority selection with the switch (do this when enough Lab appointments for the respective LabType are created).

**Create Labs**

* As Admin or Tutor go to the tab where you want to create a new Lab appointment (Photo project, Video project or Audio project)
* Below the calendar you can set date and time, duration, location and tutor of the appointment.
* Hit the "Create" button. If the creation was successfully there will be a success message below the formular and the new appointment will be shown on the respective date in the calendar.
* Click on the day in the calendar to see details of the lab appointment on the right.
* Lab appointments that you are assigned as tutor are displayed below the formular. You can click on them to see details.

**Edit or delete Labs**

* As Admin or Tutor go to the tab where you want to edit or delete a lab appointment (Photo project, Video project or Audio project)
* Select the day in the calendar on which you want to edit or delete a lab appointment
* Edit:
   * Right of the calendar, click on the pen icon of the lab appointment you want to edit
   * After you made some changes click the "Save" Button
* Delete
   * Right of the calendar, click on the trash can icon of the lab appointment you want to delete
   * Confirm in the alert popup that you want to delete the appointment
   * Labs on which a group already saved a priority can not be deleted

**Save/Delete Priorities**

* A Student who is member in a group you can select 3 date priorities for each of the LabTypes.
* If the selection is opened by the admin go to the tab where you want to save priorities as a student (Photo project, Video project or Audio project).
* On top of the calendar you see if the selection is open, the time of the deadline and if you are in a group and can save priorities.
* Click on a calendar day where "Dates" are displayed in color.
* Right of the calendar you see each lab appointment that takes place on the clicked day.
* On the dropdown of each appointment you can select prioritiy 1, 2 or 3 and save it by hitting the "Save" button next to the dropdown.
* Already saved priorities for your group are displayed below the calendar.
* You can there delete priorities by clicking the trash can icon next to the saved priority.
* If you select and save a priority that already has been saved to another date, the priority date is updated.
* The algorithm only considers groups that have 3 saved priorities by the deadline time.
