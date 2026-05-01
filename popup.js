const txt_csv = document.getElementById("csv");
const txt_subj = document.getElementById("subj");
const txt_templ = document.getElementById("templ");
const txt_test = document.getElementById("test-email");
const txt_delay = document.getElementById("delay");

const STOR = browser.storage.local;

document.getElementById("run").addEventListener("click", async () => {
    if (confirm("Let's go?")) {
        const rows = txt_csv.value.trim().split("\n").map(line =>
            line.split(",").map(c => c.trim())
        );
        await execute(rows);
    }
});

document.getElementById("run-test").addEventListener("click", async () => {
    const rows = txt_csv.value.trim().split("\n").slice(0, 1).map(line =>
        line.split(",").map(c => c.trim())
    );
    rows[0][0] = txt_test.value.trim();
    await execute(rows);
});

async function execute(rows) {
    const [tab] = await browser.tabs.query({ active: true, currentWindow: true });

    const template = txt_templ.value;
    const subject = txt_subj.value;
    let delay = 2000;
    if (!isNaN(parseInt(txt_delay.value.trim())))
        delay = parseInt(txt_delay.value.trim());

    browser.tabs.sendMessage(tab.id, {
        action: "START",
        rows,
        subject,
        template,
        delay
    });
}

// Load saved content when popup opens
document.addEventListener("DOMContentLoaded", async () => {
    const data = await STOR.get("popupData");
    if (data.popupData) {
        if (data.popupData.txt_csv)
            txt_csv.value = data.popupData.txt_csv;
        if (data.popupData.txt_subj)
            txt_subj.value = data.popupData.txt_subj;
        if (data.popupData.txt_templ)
            txt_templ.value = data.popupData.txt_templ;
        if (data.popupData.txt_test)
            txt_test.value = data.popupData.txt_test;
    }
});


function saveOnType(input, name) {
    input.addEventListener("input", async () => {
        let data = await STOR.get("popupData");
        if (!data.popupData)
            data = {};
        else
            data = data.popupData;

        data[name] = input.value;
        await STOR.set({
            popupData: data
        });
    });
}

// Save content whenever user types
saveOnType(txt_csv, "txt_csv");
saveOnType(txt_subj, "txt_subj");
saveOnType(txt_templ, "txt_templ");
saveOnType(txt_test, "txt_test");
