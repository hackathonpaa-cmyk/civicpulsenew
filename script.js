const menus = document.querySelectorAll(".menu");

const askPage = document.getElementById("askPage");
const summaryPage = document.getElementById("summaryPage");
const resultPage = document.getElementById("resultPage");

const input = document.getElementById("userInput");
const send = document.getElementById("send");
const chat = document.getElementById("chat");

const suggestions = document.querySelectorAll(".suggestions button");

const lightBtn = document.getElementById("lightBtn");
const darkBtn = document.getElementById("darkBtn");

const notes = document.getElementById("notes");
const count = document.getElementById("count");
const summarize = document.getElementById("summarize");
const result = document.getElementById("result");

const options = document.querySelectorAll(".option");

const attach = document.getElementById("attach");
const file = document.getElementById("file");

const copy = document.getElementById("copy");


// ==========================================
// PAGE NAVIGATION
// ==========================================

menus.forEach(function (menu) {

    menu.addEventListener("click", function () {

        menus.forEach(function (item) {
            item.classList.remove("active");
        });

        menu.classList.add("active");

        askPage.style.display = "none";
        summaryPage.style.display = "none";
        resultPage.style.display = "none";

        if (menu.dataset.page === "ask") {
            askPage.style.display = "flex";
        }

        if (menu.dataset.page === "summary") {
            summaryPage.style.display = "block";
        }

        if (menu.dataset.page === "result") {
            resultPage.style.display = "block";
        }

    });

});


// ==========================================
// AI SUGGESTIONS
// ==========================================

suggestions.forEach(function (button) {

    button.addEventListener("click", function () {

        input.value = button.dataset.text;

        sendMessage();

    });

});


// ==========================================
// SEND MESSAGE
// ==========================================

if (send) {
    send.addEventListener("click", sendMessage);
}


if (input) {

    input.addEventListener("keydown", function (event) {

        if (event.key === "Enter" && !event.shiftKey) {

            event.preventDefault();

            sendMessage();

        }

    });

}


// ==========================================
// AI CHAT
// ==========================================

async function sendMessage() {

    const text = input.value.trim();

    if (text === "") {
        return;
    }


    const welcome = document.getElementById("welcome");

    if (welcome) {
        welcome.remove();
    }


    const user = document.createElement("div");

    user.className = "message user";

    const userContent = document.createElement("div");

    userContent.className = "message-content";

    userContent.textContent = text;

    user.appendChild(userContent);

    chat.appendChild(user);


    input.value = "";


    const ai = document.createElement("div");

    ai.className = "message ai";

    ai.innerHTML = `
        <div class="message-avatar">
            🧠
        </div>

        <div class="message-content">
            Thinking...
        </div>
    `;

    chat.appendChild(ai);

    chat.scrollTop = chat.scrollHeight;


    try {

        const response = await fetch("/ask", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                message: text
            })

        });


        const data = await response.json();


        if (!response.ok) {

            throw new Error(
                data.answer || "AI request failed."
            );

        }


        ai.querySelector(".message-content").textContent =
            data.answer;


    } catch (error) {

        console.error("AI ERROR:", error);

        ai.querySelector(".message-content").textContent =
            "Sorry, I couldn't connect to the AI.";

    }


    chat.scrollTop = chat.scrollHeight;

}


// ==========================================
// WORD COUNTER
// ==========================================

if (notes) {

    notes.addEventListener("input", function () {

        const text = notes.value.trim();

        if (text === "") {

            count.textContent = "0 words";

            return;

        }

        const words = text.split(/\s+/).length;

        count.textContent = words + " words";

    });

}


// ==========================================
// SUMMARY OPTIONS
// ==========================================

options.forEach(function (option) {

    option.addEventListener("click", function () {

        options.forEach(function (item) {
            item.classList.remove("active");
        });

        option.classList.add("active");

    });

});


// ==========================================
// AI SUMMARY
// ==========================================

if (summarize) {

    summarize.addEventListener("click", async function () {

        const text = notes.value.trim();

        if (text === "") {

            alert("Write or paste your notes first.");

            return;

        }


        const activeOption =
            document.querySelector(".option.active");

        const summaryType =
            activeOption
                ? activeOption.textContent.trim()
                : "Short";


        result.innerHTML = `
            <div class="empty">
                <div>🧠</div>
                <h3>Generating summary...</h3>
                <p>Please wait.</p>
            </div>
        `;


        try {

            const response = await fetch("/ask", {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({

                    message: `
Summarize these student notes.

Summary type: ${summaryType}

Use simple language.

Include:
- Main idea
- Key points
- Important definitions
- Exam points

Notes:

${text}
                    `

                })

            });


            const data = await response.json();


            if (!response.ok) {

                throw new Error(
                    data.answer || "Summary failed."
                );

            }


            result.innerHTML = `

                <div class="summary-part">

                    <h3>📝 AI Summary</h3>

                    <p>
                        ${formatAIText(data.answer)}
                    </p>

                </div>

            `;


        } catch (error) {

            console.error("SUMMARY ERROR:", error);

            result.innerHTML = `

                <div class="summary-part">

                    <h3>⚠️ Error</h3>

                    <p>
                        Could not generate the summary.
                    </p>

                </div>

            `;

        }

    });

}


// ==========================================
// FORMAT AI TEXT
// ==========================================

function formatAIText(text) {

    if (!text) {
        return "";
    }

    return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/\n/g, "<br>");

}


// ==========================================
// COPY
// ==========================================

if (copy) {

    copy.addEventListener("click", function () {

        navigator.clipboard.writeText(
            result.innerText
        );

        copy.textContent = "Copied";

        setTimeout(function () {

            copy.textContent = "Copy";

        }, 1500);

    });

}


// ==========================================
// FILE
// ==========================================

if (attach && file) {

    attach.addEventListener("click", function () {

        file.click();

    });


    file.addEventListener("change", function () {

        if (file.files.length > 0) {

            input.value =
                "I uploaded " + file.files[0].name;

        }

    });

}


// ==========================================
// LIGHT MODE
// ==========================================

if (lightBtn) {

    lightBtn.addEventListener("click", function () {

        document.body.classList.add("light");

        lightBtn.classList.add("active");

        darkBtn.classList.remove("active");

    });

}


// ==========================================
// DARK MODE
// ==========================================

if (darkBtn) {

    darkBtn.addEventListener("click", function () {

        document.body.classList.remove("light");

        darkBtn.classList.add("active");

        lightBtn.classList.remove("active");

    });

}


// ==========================================
// NEB RESULT ANALYZER
// ==========================================

const gradePoints = {

    "A+": 4.0,
    "A": 3.6,
    "B+": 3.2,
    "B": 2.8,
    "C+": 2.4,
    "C": 2.0,
    "D+": 1.6,
    "D": 1.2,
    "E": 0.8,
    "NG": 0.0

};


const gradeInputs =
    document.querySelectorAll(".grade");

const calculateButton =
    document.getElementById("calculate");


if (calculateButton) {

    calculateButton.addEventListener(
        "click",
        calculateGPA
    );

}


// ==========================================
// GPA CALCULATION
// ==========================================

function calculateGPA() {

    let totalPoints = 0;

    let totalSubjects = 0;

    let subjects = [];

    let hasNG = false;


    for (let i = 0; i < gradeInputs.length; i++) {

        const gradeInput = gradeInputs[i];

        let grade =
            gradeInput.value
                .trim()
                .toUpperCase()
                .replace(/\s+/g, "");


        // Empty fields are ignored

        if (grade === "") {
            continue;
        }


        // Validate grade

        if (!Object.prototype.hasOwnProperty.call(
            gradePoints,
            grade
        )) {

            const subject =
                gradeInput
                    .closest(".subject");

            let subjectName = "Subject";


            if (subject) {

                const label =
                    subject.querySelector("label");

                if (label) {

                    subjectName =
                        label.textContent.trim();

                }

            }


            alert(
                "Invalid grade for " +
                subjectName +
                ".\n\n" +
                "Use: A+, A, B+, B, C+, C, D+, D, E or NG."
            );

            gradeInput.focus();

            return;

        }


        const points =
            gradePoints[grade];


        if (grade === "NG") {
            hasNG = true;
        }


        totalPoints += points;

        totalSubjects++;


        const subject =
            gradeInput.closest(".subject");


        let subjectName = "Subject";


        if (subject) {

            const label =
                subject.querySelector("label");

            if (label) {

                subjectName =
                    label.textContent.trim();

            }

        }


        subjects.push({

            name: subjectName,

            grade: grade,

            points: points

        });

    }


    if (totalSubjects === 0) {

        alert(
            "Please enter at least one grade."
        );

        return;

    }


    const gpa =
        totalPoints / totalSubjects;


    const finalGPA =
        gpa.toFixed(2);


    // DISPLAY GPA

    const gpaElement =
        document.getElementById("gpa");


    if (gpaElement) {

        gpaElement.textContent =
            finalGPA;

    }


    // ======================================
    // PERFORMANCE
    // ======================================

    const performance =
        document.getElementById("performance");


    if (performance) {

        performance.innerHTML = "";


        subjects.forEach(function (subject) {

            const item =
                document.createElement("div");

            item.className =
                "performance-item";


            const name =
                document.createElement("span");

            name.textContent =
                subject.name;


            const grade =
                document.createElement("span");

            grade.textContent =
                subject.grade +
                " (" +
                subject.points.toFixed(1) +
                ")";


            item.appendChild(name);

            item.appendChild(grade);

            performance.appendChild(item);

        });

    }


    // ======================================
    // STRONGEST / WEAKEST
    // ======================================

    let strongest =
        subjects[0];

    let weakest =
        subjects[0];


    subjects.forEach(function (subject) {

        if (subject.points >
            strongest.points) {

            strongest =
                subject;

        }


        if (subject.points <
            weakest.points) {

            weakest =
                subject;

        }

    });


    // ======================================
    // IMPROVEMENT
    // ======================================

    const improvement =
        document.getElementById("improvement");


    if (improvement) {

        let report = "";


        if (gpa >= 3.6) {

            report += `
                <span class="improvement-good">
                    Excellent overall performance.
                </span>
                <br><br>
            `;

        } else if (gpa >= 3.0) {

            report += `
                <span class="improvement-good">
                    Good overall performance.
                </span>
                <br><br>
            `;

        } else {

            report += `
                <span class="improvement-warning">
                    Focus more on your weaker subjects.
                </span>
                <br><br>
            `;

        }


        report +=
            "<b>Strongest subject:</b> " +
            strongest.name +
            " (" +
            strongest.grade +
            ")";


        report += "<br>";


        report +=
            "<b>Weakest subject:</b> " +
            weakest.name +
            " (" +
            weakest.grade +
            ")";


        report += "<br><br>";


        if (hasNG) {

            report += `
                <span class="improvement-warning">
                    You have an NG result.
                    Prioritize that subject.
                </span>
            `;

        } else if (weakest.points <= 2.0) {

            report += `
                <span class="improvement-warning">
                    Spend more revision time on
                    ${weakest.name}.
                </span>
            `;

        } else {

            report += `
                <span class="improvement-good">
                    Keep practicing consistently
                    to maintain your performance.
                </span>
            `;

        }


        improvement.innerHTML =
            report;

    }

}


// ==========================================
// GRADE INPUT CLEANING
// ==========================================

gradeInputs.forEach(function (gradeInput) {

    gradeInput.addEventListener(
        "input",
        function () {

            gradeInput.value =
                gradeInput.value
                    .toUpperCase()
                    .replace(/\s+/g, "");

        }
    );

});