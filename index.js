const moment = require('moment');
const chartjs = require('chart.js');
const datepicker = require('js-datepicker');
const activityChart = document.getElementById('myChart1');
const skillsChart = document.getElementById('myChart2');
const progressChart = document.getElementById('myChart3');


document.addEventListener("DOMContentLoaded", function (event) {

    let data = `{
        "activities": [{
                "activity": "walks",
                "value": 6
            },
            {
                "activity": "JS",
                "value": 15
            },
            {
                "activity": "English",
                "value": 8
            },
            {
                "activity": "Sport",
                "value": 2
            },
            {
                "activity": "Reading",
                "value": 12
            }
        ],

        "skills": {
            "HTML, CSS": 300,
            "Python": 50,
            "JavaScript": 100
        },

        "progress": {
            "months": ["May", "June", "July","August", "September", "October", "November"],
            "values": [10, 22, 37, 39, 56, 58, 79]
        }
    }`

    let myActivities;

    try {
        myActivities = JSON.parse(data);
    } catch (error) {
        console.log("Ошибка в полученных данных JSON");
        console.log(error.name);
        console.log(error.message);
    }
    let activityNames = [];
    let activityValues = []

    for (let activity of myActivities.activities) {
        activityValues.push(activity.value);
        activityNames.push(activity.activity);
    }

    let skillsKeys = [];
    let skillsValues = [];

    for (let skill in myActivities.skills) {
        skillsKeys.push(skill);
        skillsValues.push(myActivities.skills[skill])
    }


    new Chart(activityChart, {
        type: 'bar',
        data: {
            labels: activityNames,
            datasets: [{
                label: 'Schedule of my weekly activity',
                data: activityValues,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });


    new Chart(skillsChart, {
        type: 'doughnut',
        data: {
            labels: skillsKeys,
            datasets: [{
                label: 'My Skills',
                data: skillsValues,
                radius: "60%",
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                ],
                hoverOffset: 4,
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                ],
                borderWidth: 1,
            }]
        }
    });


    new Chart(progressChart, {
        type: 'line',
        data: {
            labels: myActivities.progress.months,
            datasets: [{
                label: 'My Progress in Programming',
                data: myActivities.progress.values,
                fill: false,
                borderColor: 'rgba(255, 99, 132, 0.5)',
                tension: 0.1
            }]
        }
    });

    let now = moment();
    moment.locale('ru');
    document.getElementById("dashboard__date").innerHTML = (now.format('dddd, MMMM DD YYYY'));


    datepicker("#dashboard__calend", {
        events: [
            new Date(2021, 10, 29),
            new Date(2021, 11, 24),
            new Date(2021, 11, 31),
        ],
        customDays: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']
    })

});