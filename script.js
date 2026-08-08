const menus = document.querySelectorAll(".menu");

const askPage = document.getElementById("askPage");
const summaryPage = document.getElementById("summaryPage");

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


menus.forEach(function(menu) {

    menu.addEventListener("click", function() {

        menus.forEach(function(item) {
            item.classList.remove("active");
        });

        menu.classList.add("active");


        if (menu.dataset.page === "summary") {

            askPage.style.display = "none";
            summaryPage.style.display = "block";

        } else {

            summaryPage.style.display = "none";
            askPage.style.display = "flex";

        }

    });

});


suggestions.forEach(function(button) {

    button.addEventListener("click", function() {

        input.value = button.dataset.text;

        sendMessage();

    });

});


send.addEventListener("click", sendMessage);


input.addEventListener("keydown", function(event) {

    if (event.key === "Enter" && !event.shiftKey) {

        event.preventDefault();

        sendMessage();

    }

});


async function sendMessage() {

    let text = input.value.trim();

    if (text === "") {
        return;
    }


    let welcome = document.getElementById("welcome");

    if (welcome) {
        welcome.remove();
    }


    let user = document.createElement("div");

    user.className = "message user";

    user.innerHTML = `
        <div class="message-content">
            ${text}
        </div>
    `;

    chat.appendChild(user);


    input.value = "";


    let ai = document.createElement("div");

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

        let response = await fetch("/ask", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                message: text
            })

        });


        let data = await response.json();


        if (!response.ok) {
            throw new Error(data.answer);
        }


        ai.querySelector(".message-content").textContent =
            data.answer;


    } catch (error) {

        console.log(error);

        ai.querySelector(".message-content").textContent =
            "Sorry, I couldn't connect to the AI.";

    }


    chat.scrollTop = chat.scrollHeight;

}


notes.addEventListener("input", function() {

    let text = notes.value.trim();

    if (text === "") {

        count.textContent = "0 words";

        return;

    }


    let words = text.split(/\s+/).length;

    count.textContent = words + " words";

});


summarize.addEventListener("click", async function() {

    let text = notes.value.trim();

    if (text === "") {

        alert("Write or paste your notes first.");

        return;

    }

    let selected = document.querySelector(".option.active");

    let type = selected.textContent;

    result.innerHTML = `
        <div class="empty">
            <div>🧠</div>
            <h3>AI is summarizing...</h3>
            <p>Please wait.</p>
        </div>
    `;

    try {

        let response = await fetch("/summarize", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                notes: text,
                type: type
            })

        });


        let data = await response.json();


        if (!response.ok) {

            throw new Error(data.answer);

        }


        result.innerHTML = `
            <div class="summary-part">

                <h3>📝 Summary</h3>

                <p>
                    ${data.answer.replace(/\n/g, "<br>")}
                </p>

            </div>
        `;


    } catch (error) {

        console.log(error);

        result.innerHTML = `
            <div class="summary-part">

                <h3>⚠️ Error</h3>

                <p>
                    ${error.message}
                </p>

            </div>
        `;

    }

});


function getSummaryType() {

    let active = document.querySelector(".option.active");

    return active.dataset.type;

}


function formatAnswer(text) {

    return text
        .replace(/\n/g, "<br>");

}


copy.addEventListener("click", function() {

    navigator.clipboard.writeText(result.innerText);

    copy.textContent = "Copied";

    setTimeout(function() {

        copy.textContent = "Copy";

    }, 1500);

});


options.forEach(function(option) {

    option.addEventListener("click", function() {

        options.forEach(function(item) {
            item.classList.remove("active");
        });

        option.classList.add("active");

    });

});


attach.addEventListener("click", function() {

    file.click();

});


file.addEventListener("change", function() {

    if (file.files.length > 0) {

        input.value =
            "I uploaded " + file.files[0].name;

    }

});


lightBtn.addEventListener("click", function() {

    document.body.classList.add("light");

    lightBtn.classList.add("active");

    darkBtn.classList.remove("active");

});


darkBtn.addEventListener("click", function() {

    document.body.classList.remove("light");

    darkBtn.classList.add("active");

    lightBtn.classList.remove("active");

});