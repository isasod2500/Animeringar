"use strict";

import Chart from "chart.js/auto"

/**
 * Eventlyssnare för DOMContent.
 * Kör funktioner och skapar charts efter att APIn har hämtats.
 */
document.addEventListener("DOMContentLoaded", async () => {

    try {
        const courses = await getCourses();

        let {sortedCourses, sortedPrograms} = sortCourses(courses)
        createPie(sortedPrograms);
        createBar(sortedCourses);
    } catch(error) {
        console.log(`Error! ${error}`)
    }

    
});

async function getCourses() {
    return (await fetch("https://mallarmiun.github.io/Frontend-baserad-webbutveckling/Moment%205%20-%20Dynamiska%20webbplatser/statistik_sokande_ht25.json")).json();
}

/**
 * Sorterar kurser.
 * @param {Array} courses - Array med kurser/program
 * @returns Vardera array för kurser och programmer, sorterade efter antalet sökande.
 */
function sortCourses(courses) {
    let onlyPrograms = courses.filter((course) => course.type === "Program")
    let onlyCourses = courses.filter((course) => course.type === "Kurs")

    onlyPrograms.sort((a, b) =>  b.applicantsTotal - a.applicantsTotal)
    onlyCourses.sort((a, b) => b.applicantsTotal - a.applicantsTotal)
    let sortedCourses = onlyCourses.slice(0,6)
    let sortedPrograms = onlyPrograms.slice(0,5)

    return { sortedCourses, sortedPrograms };
}


const canvas = document.getElementById("barChart")

/**
 * Skapar stapeldiagram för sorterade kurser. 
 * @param {Array} sortedCourses - Array med sorterade kurser
 */
async function createBar(sortedCourses) {
new Chart(canvas,
    {
        type: "bar",


        data: {
            labels: sortedCourses.map(course => course.name).reverse(),
            datasets: [
                {
                    label: "Total mängd ansökande",
                    data: sortedCourses.map(course => course.applicantsTotal)
                }
            ]
        },
        options: {
            reponsive: true,
            resizeDelay: 1,
            maintainAspectRatio: false,
            scales: {
                x: {
                     reverse: true,
                     title: {
                        padding: 5,
                     }
                },
                y: {
                    suggestedMax: 2500,
                }
               
            }
        }
    }
)
}

const kursDiagram = document.getElementById("pieChart")

/**
 * Skapar cirkeldiagram med sorterade program.
 * @param {Array} sortedPrograms - Array med sorterade program
 */
async function createPie(sortedPrograms) {
    const pieChart = new Chart(kursDiagram,
        {
        type: "pie",
        data: {
        labels: sortedPrograms.map(program => program.name),
        datasets: [{
            label:"Totalt antal sökande",
            data: sortedPrograms.map(program => program.applicantsTotal),
            backgroundColor: [
                "#00FF84",
                "#0500FF",
                "#FF007B",
                "#FAFF00",
                "#E000FF",
            ]
        }]
    }
        })
    
        
    
}
