var dcopy= require('deep-copy');
module.exports = {
    calculate: function (dates,groups) {

        // start the algo with data
        var groupAndDateDataToReturn = startAlgo(dates, groups);

        // return the given dates for the groups
        return groupAndDateDataToReturn;
    }
};


// assign as many groups to the dates as possible
function startAlgo(dataDateInformation, dataGroupInformation){

    // the length of the date
    var lengthDataDateInformation = dataDateInformation.length;

    // the length of the groups
    var lengthdataGroupInformation = dataGroupInformation.length;

    // get the information of all groups
    var groupsForDates = getGroupOfDates(dataGroupInformation);

    // get the information of all dates
    var datesToChoose = getDatesToChoose(dataDateInformation);

    // group data for reset data after one round of the algo
    var backupGroupData;

    // backup of dates from first round
    var backupDateData;

    // output of each round with better result
    var betterOutput;

    // output to return
    var outPutWithDateAndGroup;

    // Output after algo finished
    var finalOutput;

    // dates from all the groups
    var datesFromGroupBefore;

    // first round check if a group is alone on a date
    var firstRoundCheck = 1;

    // if first round than copy the group
    var firstRoundToCopy = 1;

    // the counter of the length
    var lengthOfDate = 0;

    // counter when to stop
    var lengthOfAlgo = 0;

    // amounts of groups on a date to check
    var amountOfGroupsOnDateToCheck;

    // amount of groups on a date as number
    var howManyGroupsOnOneDate = 0;

    // go through every date once and check the groups for there choices
    for(lengthOfDate; lengthOfDate < lengthDataDateInformation; lengthOfDate++) {

        // only take dates in which are not assigned yet
        if(datesToChoose.dateInformation[lengthOfDate].dateAlreadyAssigned == 0) {
            amountOfGroupsOnDateToCheck = checkAmountOfGroupsOnDate(lengthOfDate, datesToChoose, lengthdataGroupInformation, groupsForDates);
            howManyGroupsOnOneDate = amountOfGroupsOnDateToCheck.groupSpecialDateInformation.length;

            // if only one group on a date assign it or set save flag
            if(howManyGroupsOnOneDate == 1 && firstRoundCheck == 1) {

                checkPriorityAndAssign(amountOfGroupsOnDateToCheck, lengthOfDate, datesToChoose, groupsForDates, lengthdataGroupInformation);

                // after first round start to check all dates.
            }else if(howManyGroupsOnOneDate != 0 && firstRoundCheck != 1) {

                // if there is a group alone on a date with prio one or two assign it to the group. If prio three assign save Date.
                if(howManyGroupsOnOneDate == 1){
                    checkIfMoreThanTwoDatesAndThanAssignDate(amountOfGroupsOnDateToCheck, lengthOfDate, datesToChoose, groupsForDates, lengthdataGroupInformation);
                }else{

                    // check if there is a group with only one open date left. If yes assign the date to that group.
                    var groupOnlyOneDate = checkGroupsIfOnlyOneDateLeft(amountOfGroupsOnDateToCheck, howManyGroupsOnOneDate);
                    var amountOfGroupsWithOneDate = groupOnlyOneDate.groupOnlyOneDateInformation.length;

                    // if the group amount with only one date left is bigger than choose one group randomly and assign it to dates
                    if(amountOfGroupsWithOneDate != 0){
                        assignGroupWithOnlyOneDateLeftToDate(groupOnlyOneDate, lengthOfDate, datesToChoose, groupsForDates, lengthdataGroupInformation);
                        assignDatesOfAllGroupsNotAssignedToTaken(amountOfGroupsOnDateToCheck, lengthOfDate, datesToChoose, groupsForDates, lengthdataGroupInformation);
                    }else {

                        // check if there are groups with two dates left
                        var groupsWithTwoDatesLeft = checkGroupsIfOnlyTwoDatesLeft(amountOfGroupsOnDateToCheck, howManyGroupsOnOneDate);
                        var amountOfGroupsWithTwoDates = groupsWithTwoDatesLeft.groupOnlyTwoDatesInformation.length;

                        // if the group amount with only two dates left is bigger than choose one group randomly and assign it to dates
                        if(amountOfGroupsWithTwoDates != 0){
                            var groupAssigned = checkIfPrioIsOneAndThanAssignToDate(groupsWithTwoDatesLeft, lengthOfDate, datesToChoose, groupsForDates, lengthdataGroupInformation);
                            if(groupAssigned == 1) {
                                assignDatesOfAllGroupsNotAssignedToTaken(amountOfGroupsOnDateToCheck, lengthOfDate, datesToChoose, groupsForDates, lengthdataGroupInformation);

                                // check if there are only groups on the date with only two dates left. If yes check for highest prio and assign date or choose randomly.
                            }else if (groupsWithTwoDatesLeft.groupOnlyTwoDatesInformation.length == howManyGroupsOnOneDate) {
                                chooseOneOfThemAndAssignHighestPrioOrRandom(groupsWithTwoDatesLeft, lengthOfDate, datesToChoose, groupsForDates, lengthdataGroupInformation);
                                assignDatesOfAllGroupsNotAssignedToTaken(amountOfGroupsOnDateToCheck, lengthOfDate, datesToChoose, groupsForDates, lengthdataGroupInformation);
                            }else {

                                // check for prio one on groups with two dates if there is one assign date to it. If not choose randomly with groups who still have three dates.
                                var prioOneOnDate = findPrioOneDateOfGroup(amountOfGroupsOnDateToCheck, lengthOfDate, datesToChoose);
                                var twoDatePrioOneOrTwo = findPrioOneOrTwoOnTwoDate(groupsWithTwoDatesLeft);

                                if(prioOneOnDate.groupsWithPrioOneInformation.length != 0 && twoDatePrioOneOrTwo.groupsWithTwoDatesForRandomChooseInformation.length != 0) {
                                    choosePrioOneOrTwoDate(prioOneOnDate, twoDatePrioOneOrTwo, lengthOfDate, datesToChoose, groupsForDates, lengthdataGroupInformation);
                                    assignDatesOfAllGroupsNotAssignedToTaken(amountOfGroupsOnDateToCheck, lengthOfDate, datesToChoose, groupsForDates, lengthdataGroupInformation);
                                } else if(twoDatePrioOneOrTwo.groupsWithTwoDatesForRandomChooseInformation.length != 0) {
                                    chooseOneOfThemAndAssignHighestPrioOrRandom(groupsWithTwoDatesLeft, lengthOfDate, datesToChoose, groupsForDates, lengthdataGroupInformation);
                                    assignDatesOfAllGroupsNotAssignedToTaken(amountOfGroupsOnDateToCheck, lengthOfDate, datesToChoose, groupsForDates, lengthdataGroupInformation);
                                } else if(prioOneOnDate.groupsWithPrioOneInformation.length != 0){
                                    // check for highest prio and assign date to that group.
                                    threeDatesHighestPrioWins(amountOfGroupsOnDateToCheck, lengthOfDate, datesToChoose, groupsForDates, lengthdataGroupInformation);
                                    assignDatesOfAllGroupsNotAssignedToTaken(amountOfGroupsOnDateToCheck, lengthOfDate, datesToChoose, groupsForDates, lengthdataGroupInformation);
                                }else {
                                    chooseOneOfThemAndAssignHighestPrioOrRandom(groupsWithTwoDatesLeft, lengthOfDate, datesToChoose, groupsForDates, lengthdataGroupInformation);
                                    assignDatesOfAllGroupsNotAssignedToTaken(amountOfGroupsOnDateToCheck, lengthOfDate, datesToChoose, groupsForDates, lengthdataGroupInformation);
                                }
                            }
                        }else {
                            // check for highest prio and assign date to that group.
                            threeDatesHighestPrioWins(amountOfGroupsOnDateToCheck, lengthOfDate, datesToChoose, groupsForDates, lengthdataGroupInformation);
                            assignDatesOfAllGroupsNotAssignedToTaken(amountOfGroupsOnDateToCheck, lengthOfDate, datesToChoose, groupsForDates, lengthdataGroupInformation);
                        }
                    }
                }
            }
        }

        // ---------- This is to examine the algorithm as many times as there are dates. -------------

        // reset data after first round
        if(firstRoundCheck == 1 && lengthOfDate + 1 == lengthDataDateInformation){
            lengthOfDate = -1;
            firstRoundCheck = 0;

            // backup the group data and the date data of the first round so for the following round the data of the first round is saved and can be used again
            backupGroupData = dcopy(groupsForDates);
            backupDateData = dcopy(datesToChoose); // save all dates which are already assigned
        }else {
            // reset date data to start over or at the end, stop the algo and write data out
            if (lengthOfDate + 1 == lengthDataDateInformation) {
                if (lengthOfAlgo + 1 == lengthDataDateInformation) {

                    // assign the best output to the output to return
                    finalOutput = dcopy(betterOutput);

                    // convert the groups object to the most important data ( group name and the give date )
                    outPutWithDateAndGroup = convertDateAndAddGroup(finalOutput);

                } else {

                    var outputIfBetter = checkForBetterOutput(groupsForDates, lengthDataDateInformation, firstRoundToCopy, betterOutput, datesToChoose, datesFromGroupBefore);

                    // copy the output to compre in next round
                    betterOutput = dcopy(outputIfBetter);

                    // assign backup data to data for next round.
                    groupsForDates = dcopy(backupGroupData);

                    // all dates from the groups before
                    datesFromGroupBefore = dcopy(datesToChoose);

                    // minus one the amount of dates to check the first date again.
                    lengthOfDate = -1;

                    // change to zero so after first round data is compard and only the better one will be returned.
                    firstRoundToCopy = 0;

                    // count the rounds to know when to return the data
                    lengthOfAlgo++;

                    // change the dates so that every date can be the first one time.
                    datesToChoose = changeFirstDateToLast(datesToChoose, lengthDataDateInformation, backupDateData);
                }
            }
        }
    }

    // return best value and leave algorithm
    return outPutWithDateAndGroup;
}

//convert the date string and add the group to it
function convertDateAndAddGroup(finalOutput){
    // length of the final output
    var lengthOfFinalOutput = finalOutput.groupInformation.length;
    var groupAndDate = {
        groupAndDateInformation: []
    };
    // initialize an object of the groups with date data
    for(var groupAndDateData = 0; groupAndDateData < lengthOfFinalOutput; groupAndDateData++){
        // change the date format
        var dateForGroup = new Date(finalOutput.groupInformation[groupAndDateData].assignedDate);
        groupAndDate.groupAndDateInformation.push({
            "groupName" : finalOutput.groupInformation[groupAndDateData].groupName,
            "givenDate" : dateForGroup
        });
    }
    return groupAndDate;
}

// collect all the group data locally
function getGroupOfDates(dataGroupInformation) {
    var groupsForDates = {
        groupInformation: []
    };
    // initialize an object of the groups with additional data
    for(var groupData in dataGroupInformation) {
        var itemOfGroup = dataGroupInformation[groupData];
        groupsForDates.groupInformation.push({
            "groupName" : itemOfGroup.groupName,
            "choosenDate" : itemOfGroup.choosenDate,
            "assignedFlag" : 0,
            "assignedDate" : "",
            "saveFlag" : 0,
            "saveDate" : "",
            "activeFlagPrioOne" : 1,
            "activeFlagPrioTwo" : 1,
            "activeFlagPrioThree" : 1
        });
    }
    return groupsForDates;
}

// collect all the date data locally
function getDatesToChoose(dataDateInformation) {
    var datesToChoose = {
        dateInformation: []
    };
    // initialize an object of the groups with additional data
    for(var dateInfo in dataDateInformation) {
        var dateAvailable = dataDateInformation[dateInfo];
        datesToChoose.dateInformation.push({
            "dateAvail" : dateAvailable.dateToCheck,
            "dateAlreadyAssigned" : 0
        });
    }
    return datesToChoose;
}

// change every date forwards. So every date can be at first once.
function changeFirstDateToLast(datesToChoose, lengthDataDateInformation, backupDateData) {
    var tmpFileOfDateNumberOne = datesToChoose.dateInformation[0];

    for (var loopLength = 0; loopLength < lengthDataDateInformation; loopLength++ ) {
        datesToChoose.dateInformation[loopLength] = datesToChoose.dateInformation[loopLength+1];
    }
    datesToChoose.dateInformation[lengthDataDateInformation-1] = tmpFileOfDateNumberOne;

    // delete all the assigned data on the dates expect the ones with one group on it.
    var refreshedDates = assignEveryAlreadyAssignedDateToZero(datesToChoose, lengthDataDateInformation, backupDateData);

    return refreshedDates;
}

// After one round of the algo reset all date data "dateAlreadyAssigned" back to zero.
function assignEveryAlreadyAssignedDateToZero(datesToChoose, lengthDataDateInformation, backupDateData) {
    for (var loopLengthToRefresh = 0; loopLengthToRefresh < lengthDataDateInformation; loopLengthToRefresh++ ) {  // go through all groups
        for (var loopLengthToRefreshCheckGroup = 0; loopLengthToRefreshCheckGroup < lengthDataDateInformation; loopLengthToRefreshCheckGroup++ ) {  // go through all the dates
            if(backupDateData.dateInformation[loopLengthToRefreshCheckGroup].dateAvail ==  datesToChoose.dateInformation[loopLengthToRefresh].dateAvail){ //check for equal data in data and assign to zero
                if(backupDateData.dateInformation[loopLengthToRefreshCheckGroup].dateAlreadyAssigned == 1){  // if group is assigned do nothing

                }else{
                    datesToChoose.dateInformation[loopLengthToRefresh].dateAlreadyAssigned = 0;  // reset date
                }
            }
        }
    }
    return datesToChoose;
}

// get the groups which assigned a priority on this special date
function checkAmountOfGroupsOnDate(lengthOfDate, datesToChoose, lengthdataGroupInformation, groupsForDates) {

    // init object
    var groupSpecialDate = {
        groupSpecialDateInformation: []
    };

    for(var groupInDateLength = 0; groupInDateLength < lengthdataGroupInformation; groupInDateLength++) {  // go through all the groups
        for(var threeDatesInEveryGroup = 0; threeDatesInEveryGroup < 3; threeDatesInEveryGroup++) {  // go through the three dates
            if(datesToChoose.dateInformation[lengthOfDate].dateAvail == groupsForDates.groupInformation[groupInDateLength].choosenDate[threeDatesInEveryGroup].dateTime && groupsForDates.groupInformation[groupInDateLength].assignedFlag == 0) {  // check if the date right now with the date of the group and if the group is not assigned to a date yet
                if(groupsForDates.groupInformation[groupInDateLength].activeFlagPrioOne != 0 || groupsForDates.groupInformation[groupInDateLength].activeFlagPrioTwo != 0 || groupsForDates.groupInformation[groupInDateLength].activeFlagPrioThree != 0 ) {
                    groupSpecialDate.groupSpecialDateInformation.push(groupsForDates.groupInformation[groupInDateLength]);  // add the group to object with all the groups on that date.
                }
            }
        }
    }
    return groupSpecialDate;
}

// check for the priority of the date and assign if priority is one or two. If the priority is three save the date for later decisions.
function checkPriorityAndAssign(amountOfGroupsOnDateToCheck, lengthOfDate, datesToChoose, groupsForDates, lengthdataGroupInformation) {

    // search for the group in the whole data for further use.
    var dateOfGroupOnDate = findGroupInWholeData(amountOfGroupsOnDateToCheck, groupsForDates, lengthdataGroupInformation);

    for(var whichDate = 0; whichDate < 3; whichDate++){  // go through the three dates of the group
        if(amountOfGroupsOnDateToCheck.groupSpecialDateInformation[0].choosenDate[whichDate].dateTime == datesToChoose.dateInformation[lengthOfDate].dateAvail) {  // check if the date of the group is the same as the date which is used right now
            if(amountOfGroupsOnDateToCheck.groupSpecialDateInformation[0].choosenDate[whichDate].priority == 1 || amountOfGroupsOnDateToCheck.groupSpecialDateInformation[0].choosenDate[whichDate].priority == 2) {  // check for prio one or two
                groupsForDates.groupInformation[dateOfGroupOnDate].assignedFlag = 1;  // assign group so it doesnt need to be examined later
                groupsForDates.groupInformation[dateOfGroupOnDate].assignedDate = amountOfGroupsOnDateToCheck.groupSpecialDateInformation[0].choosenDate[whichDate].dateTime;  // save the assigned date in the group data
                datesToChoose.dateInformation[lengthOfDate].dateAlreadyAssigned = 1;  // make date assigned so it doesnt need to be examined later
                if(amountOfGroupsOnDateToCheck.groupSpecialDateInformation[0].choosenDate[whichDate].priority == 1){
                    groupsForDates.groupInformation[dateOfGroupOnDate].activeFlagPrioOne = 0;  // if prio one than assign zero to the prio
                }else if(amountOfGroupsOnDateToCheck.groupSpecialDateInformation[0].choosenDate[whichDate].priority == 2){
                    groupsForDates.groupInformation[dateOfGroupOnDate].activeFlagPrioTwo = 0; // if prio two than assign zero to the prio
                }
            } else {  // if the prio is either one or two than assign save date to it
                groupsForDates.groupInformation[dateOfGroupOnDate].saveDate = amountOfGroupsOnDateToCheck.groupSpecialDateInformation[0].choosenDate[whichDate].dateTime;
                groupsForDates.groupInformation[dateOfGroupOnDate].saveFlag = 1;
            }
        }
    }
}

// find the group on the date in the whole group data
function findGroupInWholeData(amountOfGroupsOnDateToCheck, groupsForDates, lengthdataGroupInformation) {
    var dateOfGroupOnDate = 0;
    for(var findGroupInGeneralData = 0; findGroupInGeneralData < lengthdataGroupInformation; findGroupInGeneralData++) {
        if(groupsForDates.groupInformation[findGroupInGeneralData].groupName == amountOfGroupsOnDateToCheck.groupSpecialDateInformation[0].groupName) {
            dateOfGroupOnDate = findGroupInGeneralData;
        }
    }
    return dateOfGroupOnDate;
}

// check the last group left, on the date where potentially more groups have been, how many prios are left and than assign to date of save a date.
function checkIfMoreThanTwoDatesAndThanAssignDate(amountOfGroupsOnDateToCheck, lengthOfDate, datesToChoose, groupsForDates, lengthdataGroupInformation){
    var openDates = 0;
    var dateAvailable = 1;
    var placeOfGroupInObjectArray = findGroupInWholeData(amountOfGroupsOnDateToCheck, groupsForDates, lengthdataGroupInformation);

    // count how many prios are left. If two or more are left than assign if prio is higher than three or save date if it is three.
    if(groupsForDates.groupInformation[placeOfGroupInObjectArray].activeFlagPrioOne == dateAvailable){
        openDates++;
    }
    if(groupsForDates.groupInformation[placeOfGroupInObjectArray].activeFlagPrioTwo == dateAvailable){
        openDates++;
    }
    if(groupsForDates.groupInformation[placeOfGroupInObjectArray].activeFlagPrioThree == dateAvailable){
        openDates++;
    }
    if(openDates >= 2 ){
        // check if prio is higher than three. Check or save the date.
        checkPriorityAndAssign(amountOfGroupsOnDateToCheck, lengthOfDate, datesToChoose, groupsForDates, lengthdataGroupInformation);
    }else {
        // if there is only one date left than save the date to that group.
        assignGroupToDate(placeOfGroupInObjectArray, groupsForDates, lengthOfDate, datesToChoose);
    }
}

// assign the group with only one date left to date
function assignGroupToDate(placeOfGroupInObjectArray, groupsForDates, lengthOfDate, datesToChoose){
    for(var whichDate = 0; whichDate < 3; whichDate++) {  // go through the three choosen dates of the group
        if (groupsForDates.groupInformation[placeOfGroupInObjectArray].choosenDate[whichDate].dateTime == datesToChoose.dateInformation[lengthOfDate].dateAvail) {
            groupsForDates.groupInformation[placeOfGroupInObjectArray].assignedDate = datesToChoose.dateInformation[lengthOfDate].dateAvail;
            groupsForDates.groupInformation[placeOfGroupInObjectArray].assignedFlag = 1;
            datesToChoose.dateInformation[lengthOfDate].dateAlreadyAssigned = 1;
        }
    }
}

// check if there are groups with only one date left
function checkGroupsIfOnlyOneDateLeft(amountOfGroupsOnDateToCheck, howManyGroupsOnOneDate) {

    // init object
    var groupOnlyOneDate = {
        groupOnlyOneDateInformation: []
    };

    var dateActiveFlag = 1;
    var countOfActiveFlag = 0;

    // count the active dates to check how many dates are still left
    for(var findActiveFlag = 0; findActiveFlag < howManyGroupsOnOneDate; findActiveFlag++) {
        if(amountOfGroupsOnDateToCheck.groupSpecialDateInformation[findActiveFlag].activeFlagPrioOne == dateActiveFlag) {
            countOfActiveFlag++;
        }
        if(amountOfGroupsOnDateToCheck.groupSpecialDateInformation[findActiveFlag].activeFlagPrioTwo == dateActiveFlag) {
            countOfActiveFlag++;
        }
        if(amountOfGroupsOnDateToCheck.groupSpecialDateInformation[findActiveFlag].activeFlagPrioThree == dateActiveFlag) {
            countOfActiveFlag++;
        }
        if(countOfActiveFlag == 1) {
            groupOnlyOneDate.groupOnlyOneDateInformation.push(amountOfGroupsOnDateToCheck.groupSpecialDateInformation[findActiveFlag]);
        }
        countOfActiveFlag = 0;
    }
    return groupOnlyOneDate;
}

// find which date is left and assign group to it
function assignGroupWithOnlyOneDateLeftToDate(groupOnlyOneDate, lengthOfDate, datesToChoose, groupsForDates, lengthdataGroupInformation) {
    var whichDateLeft = 0;
    var dateLeftString = "";
    var amountOfGroupsWithOneDateLeft = groupOnlyOneDate.groupOnlyOneDateInformation.length;

    // if there is only one group with one date left
    if(amountOfGroupsWithOneDateLeft == 1){
        whichDateLeft = findWhichDateIsLeft(groupOnlyOneDate);
        dateLeftString = findDateLeftString(groupOnlyOneDate, whichDateLeft);
        assignLastDateToGroup(dateLeftString, groupOnlyOneDate, lengthOfDate, datesToChoose, groupsForDates, lengthdataGroupInformation);
    }else { // if there are more groups with one date left
        getHighestPrioAndAssignGroup(groupOnlyOneDate, amountOfGroupsWithOneDateLeft, lengthOfDate, datesToChoose, groupsForDates, lengthdataGroupInformation);
    }
}

// find which date is left of the three
function findWhichDateIsLeft(groupOnlyOneDate){
    var onlyOneGroup = 0;
    var dateActiveFlag = 1;
    var dateLeftForGroup = 0;

    // check wich date is left in the group
    if(groupOnlyOneDate.groupOnlyOneDateInformation[onlyOneGroup].activeFlagPrioOne == dateActiveFlag){
        dateLeftForGroup = 0;
    }
    if(groupOnlyOneDate.groupOnlyOneDateInformation[onlyOneGroup].activeFlagPrioTwo == dateActiveFlag){
        dateLeftForGroup = 1;
    }
    if(groupOnlyOneDate.groupOnlyOneDateInformation[onlyOneGroup].activeFlagPrioThree == dateActiveFlag){
        dateLeftForGroup = 2;
    }
    return dateLeftForGroup;
}

// find the date of the group and return the string of it
function findDateLeftString(groupOnlyOneDate, whichDateLeft){
    var onlyOneGroup = 0;
    var dateToReturn = groupOnlyOneDate.groupOnlyOneDateInformation[onlyOneGroup].choosenDate[whichDateLeft].dateTime;

    return dateToReturn;
}

// assign the group to the date.
function assignLastDateToGroup(whichDateLeft, groupOnlyOneDate, lengthOfDate, datesToChoose, groupsForDates, lengthdataGroupInformation) {

    var groupInDataPosition = searchForGroupInData(groupOnlyOneDate, groupsForDates, lengthdataGroupInformation);
    groupsForDates.groupInformation[groupInDataPosition].assignedFlag = 1;
    groupsForDates.groupInformation[groupInDataPosition].assignedDate = whichDateLeft;

    closeAssignedDate(whichDateLeft, lengthOfDate, datesToChoose);
}

// search in the data for the position of the group
function searchForGroupInData(groupOnlyOneDate, groupsForDates, lengthdataGroupInformation){
    var dateOfGroupOnDate = 0;
    for(var findGroupInGeneralData = 0; findGroupInGeneralData < lengthdataGroupInformation; findGroupInGeneralData++) {
        if(groupsForDates.groupInformation[findGroupInGeneralData].groupName == groupOnlyOneDate.groupOnlyOneDateInformation[0].groupName) {
            dateOfGroupOnDate = findGroupInGeneralData;
        }
    }
    return dateOfGroupOnDate;
}

// assign date to already taken
function closeAssignedDate(whichDateLeft,lengthOfDate, datesToChoose){

    // search for the date the group was assigned to and close it
    for(var lengthOfDatesToSearch = 0; lengthOfDatesToSearch < lengthOfDate; lengthOfDatesToSearch++) {
        if(datesToChoose.dateInformation[lengthOfDatesToSearch].dateAvail == whichDateLeft) {
            datesToChoose.dateInformation[lengthOfDatesToSearch].dateAlreadyAssigned = 1;
        }
    }
}

// search for the highest priority of a group on the date and randomly save date to one of these groups.
function getHighestPrioAndAssignGroup(groupOnlyOneDate, amountOfGroupsWithOneDateLeft, lengthOfDate, datesToChoose, groupsForDates, lengthdataGroupInformation){

    // init object
    var groupWithHighestPrioOne = {
        groupWithHighestPrioOneInformation: []
    };

    // init object
    var groupWithHighestPrioTwo = {
        groupWithHighestPrioTwoInformation: []
    };

    // init object
    var groupWithHighestPrioThree = {
        groupWithHighestPrioThreeInformation: []
    };

    for(var dateInGroup = 0; dateInGroup < amountOfGroupsWithOneDateLeft; dateInGroup++){  // go through the amount of the groups
        for(var whichDate = 0; whichDate < 3; whichDate++){  // go through the three choosen dates of the group
            if(groupOnlyOneDate.groupOnlyOneDateInformation[dateInGroup].choosenDate[whichDate].dateTime == datesToChoose.dateInformation[lengthOfDate].dateAvail){  // the date of the group is equal to the date used right now
                var prioForThatDate = groupOnlyOneDate.groupOnlyOneDateInformation[dateInGroup].choosenDate[whichDate].priority;  // check the prio on that date
                if(prioForThatDate == 1){
                    groupWithHighestPrioOne.groupWithHighestPrioOneInformation.push(groupOnlyOneDate.groupOnlyOneDateInformation[dateInGroup]);
                }
                if(prioForThatDate == 2){
                    groupWithHighestPrioTwo.groupWithHighestPrioTwoInformation.push(groupOnlyOneDate.groupOnlyOneDateInformation[dateInGroup]);
                }
                if(prioForThatDate == 3){
                    groupWithHighestPrioThree.groupWithHighestPrioThreeInformation.push(groupOnlyOneDate.groupOnlyOneDateInformation[dateInGroup]);
                }
            }
        }
    }

    // search for highest prio and assign group to date
    if(groupWithHighestPrioOne.groupWithHighestPrioOneInformation.length != 0){
        assignGroup(1, groupWithHighestPrioOne, lengthOfDate, datesToChoose, groupsForDates, lengthdataGroupInformation);
    }else if(groupWithHighestPrioTwo.groupWithHighestPrioTwoInformation.length != 0){
        assignGroup(2, groupWithHighestPrioTwo, lengthOfDate, datesToChoose, groupsForDates, lengthdataGroupInformation);
    }else if(groupWithHighestPrioThree.groupWithHighestPrioThreeInformation.length != 0){
        assignGroup(3, groupWithHighestPrioThree, lengthOfDate, datesToChoose, groupsForDates, lengthdataGroupInformation);
    }
}

// choose random group and assign date to them
function assignGroup(whichPrio, groupWithOneOfTheThreePrio, lengthOfDate, datesToChoose, groupsForDates, lengthdataGroupInformation){

    if(whichPrio == 1){

        // get the amount of groups in it and generate random number.
        var amountToChooseRandomGroupOne = groupWithOneOfTheThreePrio.groupWithHighestPrioOneInformation.length;
        var randomGroupChoosenOne = Math.floor((Math.random() * amountToChooseRandomGroupOne));

        for(var findGroupInGeneralDataOne = 0; findGroupInGeneralDataOne < lengthdataGroupInformation; findGroupInGeneralDataOne++) {  // go through the whole data of groups
            if(groupsForDates.groupInformation[findGroupInGeneralDataOne].groupName == groupWithOneOfTheThreePrio.groupWithHighestPrioOneInformation[randomGroupChoosenOne].groupName){  // check for equal name
                groupsForDates.groupInformation[findGroupInGeneralDataOne].assignedFlag = 1;
                groupsForDates.groupInformation[findGroupInGeneralDataOne].assignedDate = datesToChoose.dateInformation[lengthOfDate].dateAvail;  // assign the date to the group
                datesToChoose.dateInformation[lengthOfDate].dateAlreadyAssigned = 1;
            }
        }
    } else if(whichPrio == 2){

        // get the amount of groups in it and generate random number.
        var amountToChooseRandomGroupTwo = groupWithOneOfTheThreePrio.groupWithHighestPrioTwoInformation.length;
        var randomGroupChoosenTwo = Math.floor((Math.random() * amountToChooseRandomGroupTwo));

        for(var findGroupInGeneralDataTwo = 0; findGroupInGeneralDataTwo < lengthdataGroupInformation; findGroupInGeneralDataTwo++) {  // go through the whole data of groups
            if(groupsForDates.groupInformation[findGroupInGeneralDataTwo].groupName == groupWithOneOfTheThreePrio.groupWithHighestPrioTwoInformation[randomGroupChoosenTwo].groupName){  // check for equal name
                groupsForDates.groupInformation[findGroupInGeneralDataTwo].assignedFlag = 1;
                groupsForDates.groupInformation[findGroupInGeneralDataTwo].assignedDate = datesToChoose.dateInformation[lengthOfDate].dateAvail;  // assign the date to the group
                datesToChoose.dateInformation[lengthOfDate].dateAlreadyAssigned = 1;
            }
        }
    } else if(whichPrio == 3){

        // get the amount of groups in it and generate random number.
        var amountToChooseRandomGroupThree = groupWithOneOfTheThreePrio.groupWithHighestPrioThreeInformation.length;
        var randomGroupChoosenThree = Math.floor((Math.random() * amountToChooseRandomGroupThree));

        for(var findGroupInGeneralDataThree = 0; findGroupInGeneralDataThree < lengthdataGroupInformation; findGroupInGeneralDataThree++) {  // go through the whole data of groups
            if(groupsForDates.groupInformation[findGroupInGeneralDataThree].groupName == groupWithOneOfTheThreePrio.groupWithHighestPrioThreeInformation[randomGroupChoosenThree].groupName){  // check for equal name
                groupsForDates.groupInformation[findGroupInGeneralDataThree].assignedFlag = 1;
                groupsForDates.groupInformation[findGroupInGeneralDataThree].assignedDate = datesToChoose.dateInformation[lengthOfDate].dateAvail;  // assign the date to the group
                datesToChoose.dateInformation[lengthOfDate].dateAlreadyAssigned = 1;
            }
        }
    }
}

// after a group got assigned to a date, all other groups on that date get their date flag taken.
function assignDatesOfAllGroupsNotAssignedToTaken(amountOfGroupsOnDateToCheck, lengthOfDate, datesToChoose, groupsForDates, lengthdataGroupInformation){

    // assign the length of the groups
    var amountOfGroupsWithOneDateLeft = amountOfGroupsOnDateToCheck.groupSpecialDateInformation.length;

    for(var dateInGroup = 0; dateInGroup < amountOfGroupsWithOneDateLeft; dateInGroup++){  // go through the whole data of the groups
        for(var whichDate = 0; whichDate < 3; whichDate++) {  // go through the three choosen dates
            if(amountOfGroupsOnDateToCheck.groupSpecialDateInformation[dateInGroup].choosenDate[whichDate].dateTime == datesToChoose.dateInformation[lengthOfDate].dateAvail) {
                var prioForThatDate = amountOfGroupsOnDateToCheck.groupSpecialDateInformation[dateInGroup].choosenDate[whichDate].priority;
                if (prioForThatDate == 1) {
                    for(var findGroupInGeneralDataToAssignGroupOne = 0; findGroupInGeneralDataToAssignGroupOne < lengthdataGroupInformation; findGroupInGeneralDataToAssignGroupOne++) {
                        if (groupsForDates.groupInformation[findGroupInGeneralDataToAssignGroupOne].groupName == amountOfGroupsOnDateToCheck.groupSpecialDateInformation[dateInGroup].groupName) {
                            groupsForDates.groupInformation[findGroupInGeneralDataToAssignGroupOne].activeFlagPrioOne = 0;
                        }
                    }
                }else if (prioForThatDate == 2) {
                    for(var findGroupInGeneralDataToAssignGroupTwo = 0; findGroupInGeneralDataToAssignGroupTwo < lengthdataGroupInformation; findGroupInGeneralDataToAssignGroupTwo++) {
                        if (groupsForDates.groupInformation[findGroupInGeneralDataToAssignGroupTwo].groupName == amountOfGroupsOnDateToCheck.groupSpecialDateInformation[dateInGroup].groupName) {
                            groupsForDates.groupInformation[findGroupInGeneralDataToAssignGroupTwo].activeFlagPrioTwo = 0;
                        }
                    }
                }else if (prioForThatDate == 3) {
                    for(var findGroupInGeneralDataToAssignGroupThree = 0; findGroupInGeneralDataToAssignGroupThree < lengthdataGroupInformation; findGroupInGeneralDataToAssignGroupThree++) {
                        if (groupsForDates.groupInformation[findGroupInGeneralDataToAssignGroupThree].groupName == amountOfGroupsOnDateToCheck.groupSpecialDateInformation[dateInGroup].groupName) {
                            groupsForDates.groupInformation[findGroupInGeneralDataToAssignGroupThree].activeFlagPrioThree = 0;
                        }
                    }
                }
            }
        }
    }
}

// check if there are groups on the date which have only two dates left.
function checkGroupsIfOnlyTwoDatesLeft(amountOfGroupsOnDateToCheck, howManyGroupsOnOneDate){

    // init object
    var groupOnlyTwoDates = {
        groupOnlyTwoDatesInformation: []
    };

    var dateActiveFlag = 1;
    var countOfActiveFlag = 0;

    for(var findActiveFlag = 0; findActiveFlag < howManyGroupsOnOneDate; findActiveFlag++) {
        if(amountOfGroupsOnDateToCheck.groupSpecialDateInformation[findActiveFlag].activeFlagPrioOne == dateActiveFlag) {
            countOfActiveFlag++;
        }
        if(amountOfGroupsOnDateToCheck.groupSpecialDateInformation[findActiveFlag].activeFlagPrioTwo == dateActiveFlag) {
            countOfActiveFlag++;
        }
        if(amountOfGroupsOnDateToCheck.groupSpecialDateInformation[findActiveFlag].activeFlagPrioThree == dateActiveFlag) {
            countOfActiveFlag++;
        }
        if(countOfActiveFlag == 2) {
            groupOnlyTwoDates.groupOnlyTwoDatesInformation.push(amountOfGroupsOnDateToCheck.groupSpecialDateInformation[findActiveFlag]);
        }
        countOfActiveFlag = 0;
    }
    return groupOnlyTwoDates;
}

// check for prio one groups and than assign them
function checkIfPrioIsOneAndThanAssignToDate(groupsWithTwoDatesLeft, lengthOfDate, datesToChoose, groupsForDates, lengthdataGroupInformation){
    var dateAssigned = 0;
    var amountOfGroupsWithTwoDatesLeft = groupsWithTwoDatesLeft.groupOnlyTwoDatesInformation.length;

    // init object
    var groupWithHighestPrioOneWithTwoDates = {
        groupWithHighestPrioOneWithTwoDatesInformation: []
    };

    // init object
    var groupWithSaveDate = {
        groupWithSaveDateInformation: []
    };

    for(var dateInGroup = 0; dateInGroup < amountOfGroupsWithTwoDatesLeft; dateInGroup++){
        for(var whichDate = 0; whichDate < 3; whichDate++){
            if(groupsWithTwoDatesLeft.groupOnlyTwoDatesInformation[dateInGroup].choosenDate[whichDate].dateTime == datesToChoose.dateInformation[lengthOfDate].dateAvail){
                var prioForThatDate = groupsWithTwoDatesLeft.groupOnlyTwoDatesInformation[dateInGroup].choosenDate[whichDate].priority;
                var saveDateOnGroup = groupsWithTwoDatesLeft.groupOnlyTwoDatesInformation[dateInGroup].saveFlag;
                if(prioForThatDate == 1 && saveDateOnGroup == 1){
                    groupWithSaveDate.groupWithSaveDateInformation.push(groupsWithTwoDatesLeft.groupOnlyTwoDatesInformation[dateInGroup]);
                }else if(prioForThatDate == 1){
                    groupWithHighestPrioOneWithTwoDates.groupWithHighestPrioOneWithTwoDatesInformation.push(groupsWithTwoDatesLeft.groupOnlyTwoDatesInformation[dateInGroup]);
                }
            }
        }
    }

    // search for highest prio and assign group to date
    if(groupWithHighestPrioOneWithTwoDates.groupWithHighestPrioOneWithTwoDatesInformation.length != 0){
        assignGroupTwoDates(groupWithHighestPrioOneWithTwoDates, lengthOfDate, datesToChoose, groupsForDates, lengthdataGroupInformation);
        assignGroupWithSaveDatesToSaveDates(groupWithSaveDate, datesToChoose, groupsForDates, lengthdataGroupInformation);
        dateAssigned = 1;
    }
    return dateAssigned;
}

// assign the groups with a save date, but not choosen for the actual date, to their save date
function assignGroupWithSaveDatesToSaveDates(groupWithSaveDate, datesToChoose, groupsForDates, lengthdataGroupInformation){

    for(var groupsLeftToAssign = 0; groupsLeftToAssign < groupWithSaveDate.groupWithSaveDateInformation.length; groupsLeftToAssign++) {
        for (var findGroupInGeneralData = 0; findGroupInGeneralData < lengthdataGroupInformation; findGroupInGeneralData++) {
            if (groupsForDates.groupInformation[findGroupInGeneralData].groupName == groupWithSaveDate.groupWithSaveDateInformation[groupsLeftToAssign].groupName) {
                if (groupsForDates.groupInformation[findGroupInGeneralData].assignedFlag != 1) {
                    groupsForDates.groupInformation[findGroupInGeneralData].assignedFlag = 1;
                    groupsForDates.groupInformation[findGroupInGeneralData].assignedDate = groupsForDates.groupInformation[findGroupInGeneralData].saveDate;
                    groupsForDates.groupInformation[findGroupInGeneralData].activeFlagPrioThree = 0;

                    for(var findDateOfSaveDate = 0; findDateOfSaveDate < datesToChoose.dateInformation.length; findDateOfSaveDate++) {
                        if(datesToChoose.dateInformation[findDateOfSaveDate].dateAvail == groupsForDates.groupInformation[findGroupInGeneralData].saveDate)
                            datesToChoose.dateInformation[findDateOfSaveDate].dateAlreadyAssigned = 1;
                    }
                }
            }
        }
    }
}

// choose a random group out of the groups with two dates and prio one left and assign them to date
function assignGroupTwoDates(groupWithHighestPrioOneWithTwoDates, lengthOfDate, datesToChoose, groupsForDates, lengthdataGroupInformation){
    var amountToChooseRandomGroup = groupWithHighestPrioOneWithTwoDates.groupWithHighestPrioOneWithTwoDatesInformation.length;
    var randomGroupChoosen = Math.floor((Math.random() * amountToChooseRandomGroup));

    for(var findGroupInGeneralData = 0; findGroupInGeneralData < lengthdataGroupInformation; findGroupInGeneralData++) {
        if(groupsForDates.groupInformation[findGroupInGeneralData].groupName == groupWithHighestPrioOneWithTwoDates.groupWithHighestPrioOneWithTwoDatesInformation[randomGroupChoosen].groupName){
            groupsForDates.groupInformation[findGroupInGeneralData].assignedFlag = 1;
            groupsForDates.groupInformation[findGroupInGeneralData].assignedDate = datesToChoose.dateInformation[lengthOfDate].dateAvail;
            datesToChoose.dateInformation[lengthOfDate].dateAlreadyAssigned = 1;
        }
    }
}

// find group with highest prio and assign date or choose randomly if there are two or more groups with same prio.
function chooseOneOfThemAndAssignHighestPrioOrRandom(groupsWithTwoDatesLeft, lengthOfDate, datesToChoose, groupsForDates, lengthdataGroupInformation){
    var lengthOfGroupsWithTwoPrioLeft = groupsWithTwoDatesLeft.groupOnlyTwoDatesInformation.length;

    // init object
    var groupWithHighestPrioOneOnTwoDatesLeft = {
        groupWithHighestPrioOneOnTwoDatesLeftInformation: []
    };

    // init object
    var groupWithHighestPrioOneOnTwoDatesLeftSaveDate = {
        groupWithHighestPrioOneOnTwoDatesLeftSaveDateInformation: []
    };

    // init object
    var groupWithHighestPrioTwoOnTwoDatesLeft = {
        groupWithHighestPrioTwoOnTwoDatesLeftInformation: []
    };

    // init object
    var groupWithHighestPrioTwoOnTwoDatesLeftSaveDate = {
        groupWithHighestPrioTwoOnTwoDatesLeftSaveDateInformation: []
    };

    // init object
    var groupWithHighestPrioThreeOnTwoDatesLeft = {
        groupWithHighestPrioThreeOnTwoDatesLeftInformation: []
    };

    for(var dateInGroup = 0; dateInGroup < lengthOfGroupsWithTwoPrioLeft; dateInGroup++){
        for(var whichDate = 0; whichDate < 3; whichDate++){
            if(groupsWithTwoDatesLeft.groupOnlyTwoDatesInformation[dateInGroup].choosenDate[whichDate].dateTime == datesToChoose.dateInformation[lengthOfDate].dateAvail){
                var prioForThatDate = groupsWithTwoDatesLeft.groupOnlyTwoDatesInformation[dateInGroup].choosenDate[whichDate].priority;
                var saveDateOneOneGroup = groupsWithTwoDatesLeft.groupOnlyTwoDatesInformation[dateInGroup].saveFlag;

                if(prioForThatDate == 1 && saveDateOneOneGroup == 1) {
                    groupWithHighestPrioOneOnTwoDatesLeftSaveDate.groupWithHighestPrioOneOnTwoDatesLeftSaveDateInformation.push(groupsWithTwoDatesLeft.groupOnlyTwoDatesInformation[dateInGroup]);
                }else if(prioForThatDate == 1){
                    groupWithHighestPrioOneOnTwoDatesLeft.groupWithHighestPrioOneOnTwoDatesLeftInformation.push(groupsWithTwoDatesLeft.groupOnlyTwoDatesInformation[dateInGroup]);
                }else if(prioForThatDate == 2 && saveDateOneOneGroup == 1) {
                    groupWithHighestPrioTwoOnTwoDatesLeftSaveDate.groupWithHighestPrioTwoOnTwoDatesLeftSaveDateInformation.push(groupsWithTwoDatesLeft.groupOnlyTwoDatesInformation[dateInGroup]);
                }else if(prioForThatDate == 2 ){
                    groupWithHighestPrioTwoOnTwoDatesLeft.groupWithHighestPrioTwoOnTwoDatesLeftInformation.push(groupsWithTwoDatesLeft.groupOnlyTwoDatesInformation[dateInGroup]);
                }else if(prioForThatDate == 3){
                    groupWithHighestPrioThreeOnTwoDatesLeft.groupWithHighestPrioThreeOnTwoDatesLeftInformation.push(groupsWithTwoDatesLeft.groupOnlyTwoDatesInformation[dateInGroup]);
                }
            }
        }
    }

    if(groupWithHighestPrioOneOnTwoDatesLeft.groupWithHighestPrioOneOnTwoDatesLeftInformation.length == 0 && groupWithHighestPrioTwoOnTwoDatesLeft.groupWithHighestPrioTwoOnTwoDatesLeftInformation.length == 0 && groupWithHighestPrioThreeOnTwoDatesLeft.groupWithHighestPrioThreeOnTwoDatesLeftInformation.length == 0){
        if(groupWithHighestPrioOneOnTwoDatesLeftSaveDate.length != 0){
            assignGroupWithSaveDateToActualDate(groupWithHighestPrioOneOnTwoDatesLeftSaveDate, lengthOfDate, datesToChoose, groupsForDates, lengthdataGroupInformation);

            if(groupWithHighestPrioTwoOnTwoDatesLeftSaveDate.length !=0){
                assignGroupWithSaveDatePrioTwoToSaveDate(groupWithHighestPrioTwoOnTwoDatesLeftSaveDate, lengthOfDate, datesToChoose, groupsForDates, lengthdataGroupInformation);
            }
        }else if(groupWithHighestPrioTwoOnTwoDatesLeftSaveDate.length !=0){
            assignGroupWithSaveDatePrioTwoToActualDate(groupWithHighestPrioTwoOnTwoDatesLeftSaveDate, lengthOfDate, datesToChoose, groupsForDates, lengthdataGroupInformation);
        }
    }

    // search for highest prio and assign group to date
    if(groupWithHighestPrioOneOnTwoDatesLeft.groupWithHighestPrioOneOnTwoDatesLeftInformation.length != 0){
        assignGroupTwoDatesLeft(1, groupWithHighestPrioOneOnTwoDatesLeft, lengthOfDate, datesToChoose, groupsForDates, lengthdataGroupInformation);
        assignOtherGroupToSaveDate(groupWithHighestPrioOneOnTwoDatesLeftSaveDate, lengthOfDate, datesToChoose, groupsForDates, lengthdataGroupInformation);
    }else if(groupWithHighestPrioTwoOnTwoDatesLeft.groupWithHighestPrioTwoOnTwoDatesLeftInformation.length != 0){
        assignGroupTwoDatesLeft(2, groupWithHighestPrioTwoOnTwoDatesLeft, lengthOfDate, datesToChoose, groupsForDates, lengthdataGroupInformation);
        assignGroupWithSaveDatePrioTwoToSaveDate(groupWithHighestPrioTwoOnTwoDatesLeftSaveDate, datesToChoose, groupsForDates, lengthdataGroupInformation);
    }else if(groupWithHighestPrioThreeOnTwoDatesLeft.groupWithHighestPrioThreeOnTwoDatesLeftInformation.length != 0){
        assignGroupTwoDatesLeft(3, groupWithHighestPrioThreeOnTwoDatesLeft, lengthOfDate, datesToChoose, groupsForDates, lengthdataGroupInformation);
    }
}

// choose a group randomly and assign to actual date
function assignGroupWithSaveDateToActualDate(groupWithHighestPrioOneOnTwoDatesLeftSaveDate, lengthOfDate, datesToChoose, groupsForDates, lengthdataGroupInformation){
    var amountToChooseRandomGroup = groupWithHighestPrioOneOnTwoDatesLeftSaveDate.groupWithHighestPrioOneOnTwoDatesLeftSaveDateInformation.length;
    var randomGroupChoosen = Math.floor((Math.random() * amountToChooseRandomGroup));

    for(var findGroupInGeneralData = 0; findGroupInGeneralData < lengthdataGroupInformation; findGroupInGeneralData++) {
        if(groupsForDates.groupInformation[findGroupInGeneralData].groupName == groupWithHighestPrioOneOnTwoDatesLeftSaveDate.groupWithHighestPrioOneOnTwoDatesLeftSaveDateInformation[randomGroupChoosen].groupName){
            groupsForDates.groupInformation[findGroupInGeneralData].assignedFlag = 1;
            groupsForDates.groupInformation[findGroupInGeneralData].assignedDate = datesToChoose.dateInformation[lengthOfDate].dateAvail;
            datesToChoose.dateInformation[lengthOfDate].dateAlreadyAssigned = 1;
        }
    }

    if(amountToChooseRandomGroup > 1){
        assignOtherGroupToSaveDate(groupWithHighestPrioOneOnTwoDatesLeftSaveDate, datesToChoose, groupsForDates, lengthdataGroupInformation);
    }
}

// assign the groups with a save date, but not choosen for the actual date, to their save date
function assignOtherGroupToSaveDate(groupWithHighestPrioOneOnTwoDatesLeftSaveDate, datesToChoose, groupsForDates, lengthdataGroupInformation){
    for(var groupsLeftToAssign = 0; groupsLeftToAssign < groupWithHighestPrioOneOnTwoDatesLeftSaveDate.groupWithHighestPrioOneOnTwoDatesLeftSaveDateInformation.length; groupsLeftToAssign++) {
        for (var findGroupInGeneralData = 0; findGroupInGeneralData < lengthdataGroupInformation; findGroupInGeneralData++) {
            if (groupsForDates.groupInformation[findGroupInGeneralData].groupName == groupWithHighestPrioOneOnTwoDatesLeftSaveDate.groupWithHighestPrioOneOnTwoDatesLeftSaveDateInformation[groupsLeftToAssign].groupName) {
                if (groupsForDates.groupInformation[findGroupInGeneralData].assignedFlag != 1) {
                    groupsForDates.groupInformation[findGroupInGeneralData].assignedFlag = 1;
                    groupsForDates.groupInformation[findGroupInGeneralData].assignedDate = groupsForDates.groupInformation[findGroupInGeneralData].saveDate;

                    for(var findDateOfSaveDate = 0; findDateOfSaveDate < datesToChoose.dateInformation.length; findDateOfSaveDate++) {
                        if(datesToChoose.dateInformation[findDateOfSaveDate].dateAvail == groupsForDates.groupInformation[findGroupInGeneralData].saveDate)
                            datesToChoose.dateInformation[findDateOfSaveDate].dateAlreadyAssigned = 1;
                    }
                }
            }
        }
    }
}

// assign groups with prio two who didnt get the date to their save date
function assignGroupWithSaveDatePrioTwoToSaveDate(groupWithHighestPrioTwoOnTwoDatesLeftSaveDate, datesToChoose, groupsForDates, lengthdataGroupInformation){
    for(var groupsLeftToAssign = 0; groupsLeftToAssign < groupWithHighestPrioTwoOnTwoDatesLeftSaveDate.groupWithHighestPrioTwoOnTwoDatesLeftSaveDateInformation.length; groupsLeftToAssign++) {
        for (var findGroupInGeneralData = 0; findGroupInGeneralData < lengthdataGroupInformation; findGroupInGeneralData++) {
            if (groupsForDates.groupInformation[findGroupInGeneralData].groupName == groupWithHighestPrioTwoOnTwoDatesLeftSaveDate.groupWithHighestPrioTwoOnTwoDatesLeftSaveDateInformation[groupsLeftToAssign].groupName) {
                if (groupsForDates.groupInformation[findGroupInGeneralData].assignedFlag != 1) {
                    groupsForDates.groupInformation[findGroupInGeneralData].assignedFlag = 1;
                    groupsForDates.groupInformation[findGroupInGeneralData].assignedDate = groupsForDates.groupInformation[findGroupInGeneralData].saveDate;

                    for(var findDateOfSaveDate = 0; findDateOfSaveDate < datesToChoose.dateInformation.length; datesToChoose++) {
                        if(datesToChoose.dateInformation[findDateOfSaveDate].dateAvail == groupsForDates.groupInformation[findGroupInGeneralData].saveDate)
                            datesToChoose.dateInformation[findDateOfSaveDate].dateAlreadyAssigned = 1;
                    }
                }
            }
        }
    }
}

// assign prio two groups to actual date
function assignGroupWithSaveDatePrioTwoToActualDate(groupWithHighestPrioTwoOnTwoDatesLeftSaveDate, lengthOfDate, datesToChoose, groupsForDates, lengthdataGroupInformation){

    // get the amount of groups in it and generate random number.
    var amountToChooseRandomGroup = groupWithHighestPrioTwoOnTwoDatesLeftSaveDate.groupWithHighestPrioTwoOnTwoDatesLeftSaveDateInformation.length;
    var randomGroupChoosen = Math.floor((Math.random() * amountToChooseRandomGroup));

    for(var findGroupInGeneralData = 0; findGroupInGeneralData < lengthdataGroupInformation; findGroupInGeneralData++) {
        if(groupsForDates.groupInformation[findGroupInGeneralData].groupName == groupWithHighestPrioTwoOnTwoDatesLeftSaveDate.groupWithHighestPrioTwoOnTwoDatesLeftSaveDateInformation[randomGroupChoosen].groupName){
            groupsForDates.groupInformation[findGroupInGeneralData].assignedFlag = 1;
            groupsForDates.groupInformation[findGroupInGeneralData].assignedDate = datesToChoose.dateInformation[lengthOfDate].dateAvail;
            datesToChoose.dateInformation[lengthOfDate].dateAlreadyAssigned = 1;
        }
    }

    if(amountToChooseRandomGroup > 1){
        assignGroupWithSaveDatePrioTwoToSaveDate(groupWithHighestPrioTwoOnTwoDatesLeftSaveDate, datesToChoose, groupsForDates, lengthdataGroupInformation);
    }
}

// assign group to date
function assignGroupTwoDatesLeft(whichPrioChoosen, groupWithHighestPrioOneOnTwoDatesLeft, lengthOfDate, datesToChoose, groupsForDates, lengthdataGroupInformation){

    if(whichPrioChoosen == 1){

        // get the amount of groups in it and generate random number.
        var amountToChooseRandomGroupOne = groupWithHighestPrioOneOnTwoDatesLeft.groupWithHighestPrioOneOnTwoDatesLeftInformation.length;
        var randomGroupChoosenOne = Math.floor((Math.random() * amountToChooseRandomGroupOne));

        for(var findGroupInGeneralDataOne = 0; findGroupInGeneralDataOne < lengthdataGroupInformation; findGroupInGeneralDataOne++) {
            if(groupsForDates.groupInformation[findGroupInGeneralDataOne].groupName == groupWithHighestPrioOneOnTwoDatesLeft.groupWithHighestPrioOneOnTwoDatesLeftInformation[randomGroupChoosenOne].groupName){
                groupsForDates.groupInformation[findGroupInGeneralDataOne].assignedFlag = 1;
                groupsForDates.groupInformation[findGroupInGeneralDataOne].assignedDate = datesToChoose.dateInformation[lengthOfDate].dateAvail;
                datesToChoose.dateInformation[lengthOfDate].dateAlreadyAssigned = 1;
            }
        }
    } else if(whichPrioChoosen == 2){

        // get the amount of groups in it and generate random number.
        var amountToChooseRandomGroupTwo = groupWithHighestPrioOneOnTwoDatesLeft.groupWithHighestPrioTwoOnTwoDatesLeftInformation.length;
        var randomGroupChoosenTwo = Math.floor((Math.random() * amountToChooseRandomGroupTwo));

        for(var findGroupInGeneralDataTwo = 0; findGroupInGeneralDataTwo < lengthdataGroupInformation; findGroupInGeneralDataTwo++) {
            if(groupsForDates.groupInformation[findGroupInGeneralDataTwo].groupName == groupWithHighestPrioOneOnTwoDatesLeft.groupWithHighestPrioTwoOnTwoDatesLeftInformation[randomGroupChoosenTwo].groupName){
                groupsForDates.groupInformation[findGroupInGeneralDataTwo].assignedFlag = 1;
                groupsForDates.groupInformation[findGroupInGeneralDataTwo].assignedDate = datesToChoose.dateInformation[lengthOfDate].dateAvail;
                datesToChoose.dateInformation[lengthOfDate].dateAlreadyAssigned = 1;
            }
        }
    } else if(whichPrioChoosen == 3){

        // get the amount of groups in it and generate random number.
        var amountToChooseRandomGroupThree = groupWithHighestPrioOneOnTwoDatesLeft.groupWithHighestPrioThreeOnTwoDatesLeftInformation.length;
        var randomGroupChoosenThree = Math.floor((Math.random() * amountToChooseRandomGroupThree));

        for(var findGroupInGeneralDataThree = 0; findGroupInGeneralDataThree < lengthdataGroupInformation; findGroupInGeneralDataThree++) {
            if(groupsForDates.groupInformation[findGroupInGeneralDataThree].groupName == groupWithHighestPrioOneOnTwoDatesLeft.groupWithHighestPrioThreeOnTwoDatesLeftInformation[randomGroupChoosenThree].groupName){
                groupsForDates.groupInformation[findGroupInGeneralDataThree].assignedFlag = 1;
                groupsForDates.groupInformation[findGroupInGeneralDataThree].assignedDate = datesToChoose.dateInformation[lengthOfDate].dateAvail;
                datesToChoose.dateInformation[lengthOfDate].dateAlreadyAssigned = 1;
            }
        }
    }
}

// find groups with prio one on actual date
function findPrioOneDateOfGroup(amountOfGroupsOnDateToCheck, lengthOfDate, datesToChoose){
    var amountOfGroups = amountOfGroupsOnDateToCheck.groupSpecialDateInformation.length;

    // init object
    var groupsWithPrioOne = {
        groupsWithPrioOneInformation: []
    };

    for(var groupsWithOneToCheck = 0; groupsWithOneToCheck < amountOfGroups; groupsWithOneToCheck++){
        for(var threeDates = 0; threeDates < 3; threeDates++){
            if(amountOfGroupsOnDateToCheck.groupSpecialDateInformation[groupsWithOneToCheck].choosenDate[threeDates].dateTime == datesToChoose.dateInformation[lengthOfDate].dateAvail) {
                if(amountOfGroupsOnDateToCheck.groupSpecialDateInformation[groupsWithOneToCheck].choosenDate[threeDates].priority == 1){
                    groupsWithPrioOne.groupsWithPrioOneInformation.push(amountOfGroupsOnDateToCheck.groupSpecialDateInformation[groupsWithOneToCheck]);
                }
            }
        }
    }
    return groupsWithPrioOne;
}

// choose a group out of the two date or the groups who still have three dates left and assign them to date
function choosePrioOneOrTwoDate(prioOneOnDate, twoDatePrioOneOrTwo, lengthOfDate, datesToChoose, groupsForDates, lengthdataGroupInformation){

    //  generate random number to choose if groups with two dates or groups with three dates are choosen.
    var whichGroupToChoose = Math.floor((Math.random() * 2));

    if(whichGroupToChoose == 1){
        var amountOfGroupWithPrioOneDate = prioOneOnDate.groupsWithPrioOneInformation.length;
        var amoutOfPrioOneGroupSize = Math.floor((Math.random() * amountOfGroupWithPrioOneDate));

        for (var whichDateToChoosePrio = 0; whichDateToChoosePrio < 3; whichDateToChoosePrio++) {
            if (prioOneOnDate.groupsWithPrioOneInformation[amoutOfPrioOneGroupSize].choosenDate[whichDateToChoosePrio].dateTime == datesToChoose.dateInformation[lengthOfDate].dateAvail){
                for(var findGroupInGeneralDataToChoose = 0; findGroupInGeneralDataToChoose < lengthdataGroupInformation; findGroupInGeneralDataToChoose++) {
                    if(groupsForDates.groupInformation[findGroupInGeneralDataToChoose].groupName == prioOneOnDate.groupsWithPrioOneInformation[amoutOfPrioOneGroupSize].groupName){
                        groupsForDates.groupInformation[findGroupInGeneralDataToChoose].assignedFlag = 1;
                        groupsForDates.groupInformation[findGroupInGeneralDataToChoose].assignedDate = datesToChoose.dateInformation[lengthOfDate].dateAvail;
                        datesToChoose.dateInformation[lengthOfDate].dateAlreadyAssigned = 1;
                    }
                }
            }
        }
    } else if(whichGroupToChoose == 0){
        var amountOfGroupsWithTwoDatesLeft = twoDatePrioOneOrTwo.groupsWithTwoDatesForRandomChooseInformation.length;
        var amoutOfTwoDatesGroupSize = Math.floor((Math.random() * amountOfGroupsWithTwoDatesLeft));

        for (var whichDateToChoose = 0; whichDateToChoose < 3; whichDateToChoose++) {
            if (twoDatePrioOneOrTwo.groupsWithTwoDatesForRandomChooseInformation[amoutOfTwoDatesGroupSize].choosenDate[whichDateToChoose].dateTime == datesToChoose.dateInformation[lengthOfDate].dateAvail){
                for(var findGroupInGeneralDataToChooseSaveDate = 0; findGroupInGeneralDataToChooseSaveDate < lengthdataGroupInformation; findGroupInGeneralDataToChooseSaveDate++) {
                    if(groupsForDates.groupInformation[findGroupInGeneralDataToChooseSaveDate].groupName == twoDatePrioOneOrTwo.groupsWithTwoDatesForRandomChooseInformation[amoutOfTwoDatesGroupSize].groupName){
                        groupsForDates.groupInformation[findGroupInGeneralDataToChooseSaveDate].assignedFlag = 1;
                        groupsForDates.groupInformation[findGroupInGeneralDataToChooseSaveDate].assignedDate = datesToChoose.dateInformation[lengthOfDate].dateAvail;
                        datesToChoose.dateInformation[lengthOfDate].dateAlreadyAssigned = 1;
                    }
                }
            }
        }
    }

    for(var dateInGroup = 0; dateInGroup < amountOfGroupsWithTwoDatesLeft; dateInGroup++) {
        for (var whichDate = 0; whichDate < 3; whichDate++) {
            if (twoDatePrioOneOrTwo.groupsWithTwoDatesForRandomChooseInformation[dateInGroup].choosenDate[whichDate].dateTime == datesToChoose.dateInformation[lengthOfDate].dateAvail && twoDatePrioOneOrTwo.groupsWithTwoDatesForRandomChooseInformation[dateInGroup].assignedFlag != 1) {
                var saveDateToCheck = twoDatePrioOneOrTwo.groupsWithTwoDatesForRandomChooseInformation[dateInGroup].saveFlag;
                if(saveDateToCheck == 1){
                    for(var findGroupInGeneralData = 0; findGroupInGeneralData < lengthdataGroupInformation; findGroupInGeneralData++) {
                        if(groupsForDates.groupInformation[findGroupInGeneralData].groupName == twoDatePrioOneOrTwo.groupsWithTwoDatesForRandomChooseInformation[dateInGroup].groupName){
                            groupsForDates.groupInformation[findGroupInGeneralData].assignedFlag = 1;
                            groupsForDates.groupInformation[findGroupInGeneralData].assignedDate = datesToChoose.dateInformation[lengthOfDate].dateAvail;
                            datesToChoose.dateInformation[lengthOfDate].dateAlreadyAssigned = 1;
                        }
                    }
                }
            }
        }
    }
}

// check if there is a prio one or two on the date if yes then assign group
function findPrioOneOrTwoOnTwoDate(groupsWithTwoDatesLeft){

    var amountOfDatesToCount = groupsWithTwoDatesLeft.groupOnlyTwoDatesInformation.length;

    // init object
    var groupsWithTwoDatesForRandomChoose = {
        groupsWithTwoDatesForRandomChooseInformation: []
    };

    var dateActiveFlag = 1;
    var countOfActiveFlag = 0;

    for(var findActiveFlag = 0; findActiveFlag < amountOfDatesToCount; findActiveFlag++) {
        if (groupsWithTwoDatesLeft.groupOnlyTwoDatesInformation[findActiveFlag].activeFlagPrioOne == dateActiveFlag) {
            countOfActiveFlag++;
        }
        if (groupsWithTwoDatesLeft.groupOnlyTwoDatesInformation[findActiveFlag].activeFlagPrioTwo == dateActiveFlag) {
            countOfActiveFlag++;
        }
        if (countOfActiveFlag == 2) {
            groupsWithTwoDatesForRandomChoose.groupsWithTwoDatesForRandomChooseInformation.push(groupsWithTwoDatesLeft.groupOnlyTwoDatesInformation[findActiveFlag]);
        }
        countOfActiveFlag = 0;
    }
    return groupsWithTwoDatesForRandomChoose;
}

// check for the highest prio. Highest prio of a group wins.
function threeDatesHighestPrioWins(amountOfGroupsOnDateToCheck, lengthOfDate, datesToChoose, groupsForDates, lengthdataGroupInformation){

    var amountOfGroupsToCheckForPrios = amountOfGroupsOnDateToCheck.groupSpecialDateInformation.length;

    // init object
    var groupWithPrioOne = {
        groupWithPrioOneInformation: []
    };

    // init object
    var groupWithPrioTwo = {
        groupWithPrioTwoInformation: []
    };

    // init object
    var groupWithPrioThree = {
        groupWithPrioThreeInformation: []
    };

    for(var dateInGroup = 0; dateInGroup < amountOfGroupsToCheckForPrios; dateInGroup++) {
        for (var whichDate = 0; whichDate < 3; whichDate++) {
            if (amountOfGroupsOnDateToCheck.groupSpecialDateInformation[dateInGroup].choosenDate[whichDate].dateTime == datesToChoose.dateInformation[lengthOfDate].dateAvail) {
                var prioForThatDate = amountOfGroupsOnDateToCheck.groupSpecialDateInformation[dateInGroup].choosenDate[whichDate].priority;

                if (prioForThatDate == 1) {
                    groupWithPrioOne.groupWithPrioOneInformation.push(amountOfGroupsOnDateToCheck.groupSpecialDateInformation[dateInGroup]);
                }
                if (prioForThatDate == 2) {
                    groupWithPrioTwo.groupWithPrioTwoInformation.push(amountOfGroupsOnDateToCheck.groupSpecialDateInformation[dateInGroup]);
                }
                if (prioForThatDate == 3) {
                    groupWithPrioThree.groupWithPrioThreeInformation.push(amountOfGroupsOnDateToCheck.groupSpecialDateInformation[dateInGroup]);
                }
            }
        }
    }
    if(groupWithPrioOne.groupWithPrioOneInformation.length != 0){
        assignGroupThreePriosDates(1, groupWithPrioOne, lengthOfDate, datesToChoose, groupsForDates, lengthdataGroupInformation);
    } else if(groupWithPrioTwo.groupWithPrioTwoInformation.length != 0){
        assignGroupThreePriosDates(2, groupWithPrioTwo, lengthOfDate, datesToChoose, groupsForDates, lengthdataGroupInformation);
    }else if(groupWithPrioThree.groupWithPrioThreeInformation.length != 0){
        assignGroupThreePriosDates(3, groupWithPrioThree, lengthOfDate, datesToChoose, groupsForDates, lengthdataGroupInformation);
    }
}

// assign group to date
function assignGroupThreePriosDates(whichPrioChoosen, groupWithHighestPrioOneOnThree, lengthOfDate, datesToChoose, groupsForDates, lengthdataGroupInformation) {

    if (whichPrioChoosen == 1) {

        // get the amount of groups in it and generate random number.
        var amountToChooseRandomGroupOne = groupWithHighestPrioOneOnThree.groupWithPrioOneInformation.length;
        var randomGroupChoosenOne = Math.floor((Math.random() * amountToChooseRandomGroupOne));

        for (var findGroupInGeneralDataOne = 0; findGroupInGeneralDataOne < lengthdataGroupInformation; findGroupInGeneralDataOne++) {
            if (groupsForDates.groupInformation[findGroupInGeneralDataOne].groupName == groupWithHighestPrioOneOnThree.groupWithPrioOneInformation[randomGroupChoosenOne].groupName) {
                groupsForDates.groupInformation[findGroupInGeneralDataOne].assignedFlag = 1;
                groupsForDates.groupInformation[findGroupInGeneralDataOne].assignedDate = datesToChoose.dateInformation[lengthOfDate].dateAvail;
                datesToChoose.dateInformation[lengthOfDate].dateAlreadyAssigned = 1;
            }
        }
    }else if (whichPrioChoosen == 2) {

        // get the amount of groups in it and generate random number.
        var amountToChooseRandomGroupTwo = groupWithHighestPrioOneOnThree.groupWithPrioTwoInformation.length;
        var randomGroupChoosenTwo = Math.floor((Math.random() * amountToChooseRandomGroupTwo));

        for (var findGroupInGeneralDataTwo = 0; findGroupInGeneralDataTwo < lengthdataGroupInformation; findGroupInGeneralDataTwo++) {
            if (groupsForDates.groupInformation[findGroupInGeneralDataTwo].groupName == groupWithHighestPrioOneOnThree.groupWithPrioTwoInformation[randomGroupChoosenTwo].groupName) {
                groupsForDates.groupInformation[findGroupInGeneralDataTwo].assignedFlag = 1;
                groupsForDates.groupInformation[findGroupInGeneralDataTwo].assignedDate = datesToChoose.dateInformation[lengthOfDate].dateAvail;
                datesToChoose.dateInformation[lengthOfDate].dateAlreadyAssigned = 1;
            }
        }
    }else if (whichPrioChoosen == 3) {

        // get the amount of groups in it and generate random number.
        var amountToChooseRandomGroupThree = groupWithHighestPrioOneOnThree.groupWithPrioThreeInformation.length;
        var randomGroupChoosenThree = Math.floor((Math.random() * amountToChooseRandomGroupThree));

        for (var findGroupInGeneralDataThree = 0; findGroupInGeneralDataThree < lengthdataGroupInformation; findGroupInGeneralDataThree++) {
            if (groupsForDates.groupInformation[findGroupInGeneralDataThree].groupName == groupWithHighestPrioOneOnThree.groupWithPrioThreeInformation[randomGroupChoosenThree].groupName) {
                groupsForDates.groupInformation[findGroupInGeneralDataThree].assignedFlag = 1;
                groupsForDates.groupInformation[findGroupInGeneralDataThree].assignedDate = datesToChoose.dateInformation[lengthOfDate].dateAvail;
                datesToChoose.dateInformation[lengthOfDate].dateAlreadyAssigned = 1;
            }
        }
    }
}

// check for the least groups without dates.
function checkForBetterOutput(groupsForDates, lengthDataDateInformation, firstRoundToCopy, betterOutput, datesToChoose, datesFromGroupBefore){

    var groupsWithDatesThisRound = 0;
    var groupsWithDatesBefore = 0;

    var dataToReturn;

    // if it is the first round take the data from that round
    if(firstRoundToCopy == 1) {
        dataToReturn = dcopy(groupsForDates);
    }else{ // start to compare if data from before is better than the data from now

        for (var checkForGroupWithoutDate = 0; checkForGroupWithoutDate < lengthDataDateInformation; checkForGroupWithoutDate++) {
            if (datesToChoose.dateInformation[checkForGroupWithoutDate].dateAvail  == 1) {
                groupsWithDatesThisRound++;
            }
        }

        for (var checkForGroupWithoutDateBefore = 0; checkForGroupWithoutDateBefore < lengthDataDateInformation; checkForGroupWithoutDateBefore++) {
            if (datesFromGroupBefore.dateInformation[checkForGroupWithoutDateBefore].dateAvail == 1) {
                groupsWithDatesBefore++;
            }
        }

        // check which object has the least groups without a date. Assign the most to return value.
        if(groupsWithDatesThisRound > groupsWithDatesBefore){
            dataToReturn = dcopy(groupsForDates);
        }else if(groupsWithDatesThisRound < groupsWithDatesBefore){
            dataToReturn = dcopy(betterOutput);
        }else if(groupsWithDatesThisRound == groupsWithDatesBefore){
            dataToReturn = dcopy(groupsForDates);
        }
    }

    return dataToReturn;
}