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


function sendMessage() {

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
            I'm still a demo for now. Soon this message
            will come from your AI API.
        </div>
    `;

    setTimeout(function() {

        chat.appendChild(ai);

        chat.scrollTop = chat.scrollHeight;

    }, 600);

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


summarize.addEventListener("click", function() {

    let text = notes.value.trim();

    if (text === "") {

        alert("Write or paste your notes first.");

        return;

    }

    result.innerHTML = `
        <div class="summary-part">

            <h3>📌 Main idea</h3>

            <p>
                Your AI-generated explanation will appear
                here once the AI API is connected.
            </p>

        </div>

        <div class="summary-part">

            <h3>🔑 Key points</h3>

            <ul>
                <li>Important concept</li>
                <li>Important definition</li>
                <li>Important explanation</li>
                <li>Important exam point</li>
            </ul>

        </div>

        <div class="summary-part">

            <h3>🎯 Exam focus</h3>

            <p>
                The AI will identify the parts that are
                most useful for your exam.
            </p>

        </div>
    `;

});


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