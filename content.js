browser.runtime.onMessage.addListener(async (msg) => {
    console.log("message received", msg);
    if (msg.action === "START") {
        for (let i = 0; i < msg.rows.length; i++) {
            const data = msg.rows[i];

            await sendEmail(msg.subject, msg.template, data[0], data);
            await delay(msg.delay); // avoid Gmail blocking
        }
    }
});

// TODO:
// custom selectors
// test email
// custom delay

async function sendEmail(subject, template, email, data) {

    // Click Compose
    const composeBtn = await waitFor(() =>
        document.querySelector("[gh=cm]")//".T-I.T-I-KE.L3") // Compose button
    );
    composeBtn.click();

    // Wait for compose window
    const toField = await waitFor(() =>
        document.querySelector('[name="to"] input')
    );

    toField.value = email;
    toField.dispatchEvent(new Event("input", { bubbles: true }));

    // Subject
    const subjectInput = document.querySelector('input[name="subjectbox"]');
    subjectInput.value = subject;
    subjectInput.dispatchEvent(new Event("input", { bubbles: true }));

    // Body (template)
    let body = template;
    for (let i = 0; i < 10; ++i) {
        if (data[i] && template.includes(`COL_${i}`))
            body = body.replace(`COL_${i}`, data[i]);
    }
    const bodyDiv = document.querySelector('[role=textbox]');
    bodyDiv.innerHTML = body;

    // Send button
    const sendBtn = await waitFor(() =>
        document.querySelector(".dC .T-I-atl")
    );

    sendBtn.click();
}

function delay(ms) {
    return new Promise(res => setTimeout(res, ms));
}

function waitFor(selectorFn, timeout = 10000) {
    return new Promise((resolve, reject) => {
        const interval = 100;
        let elapsed = 0;

        const timer = setInterval(() => {
            const el = selectorFn();
            if (el) {
                clearInterval(timer);
                resolve(el);
            }

            elapsed += interval;
            if (elapsed >= timeout) {
                clearInterval(timer);
                reject("Element not found");
            }
        }, interval);
    });
}