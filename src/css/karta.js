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

        console.table(sortedCourses)
        console.table(sortedPrograms)
        createPie(sortedCourses, sortedPrograms);
        createBar(sortedCourses, sortedPrograms)
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
    let sortedCourses = onlyCourses.slice(0,7)
    let sortedPrograms = onlyPrograms.slice(0,7)

    return { sortedCourses, sortedPrograms };
}


const canvas = document.getElementById("inkomst")

/**
 * Skapar stapeldiagram för sorterade program. 
 * @param {Array} sortedPrograms - Array med sorterade program
 */
async function createBar(sortedPrograms) {
new Chart(canvas,
    {
        type: "bar",


        data: {
            labels: sortedPrograms.map(program => program.name).reverse(),
            datasets: [
                {
                    label: "Total mängd ansökande",
                    data: sortedPrograms.map(program => program.applicantsTotal)
                }
            ]
        },
        options: {
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

const kursDiagram = document.getElementById("kurser")

/**
 * Skapar cirkeldiagram med sorterade kurser.
 * @param {Array} sortedCourses - Array med sorterade kurser
 */
async function createPie(sortedCourses) {
    const kurser = new Chart(kursDiagram,
        {
        type: "pie",
        data: {
        labels: sortedCourses.map(course => course.name),
        datasets: [{
            label:"Totalt antal sökande",
            data: sortedCourses.map(course => course.applicantsTotal),
            backgroundColor: [
                "#00FF84",
                "#0500FF",
                "#FF007B",
                "#FAFF00",
                "#E000FF",
                "#02005D",

            ]
        }]
    }
        })
    
        
    
}
