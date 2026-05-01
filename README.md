# gmail-auto-mailer

# What is this?

This is a firefox extension (can probably work with chromium without too much effort) that lets you send lots of emails through the GMail web interface.

You need to be on the GMail tab when you start it, and you can't touch the computer while it does its stuff.
It simply simulates the clicks and typing through the GMail interface, it doesn't use an API or direct SMTP calls. It is as if you sent emails through the interface.

If you have a few dozen or hundred emails to send and don't want to use mail merge tools such as MailChimp, maybe you're in the right place.

<img width="538" height="607" alt="image" src="https://github.com/user-attachments/assets/0d6bd87a-d0ad-47f8-b0fa-ebf0c2d2a17d" />


# How to use?

- Download the files
- Open `about:debugging#/runtime/this-firefox` and load this extension (just select any file from the folder)
- go to your GMail tab
- Click on the extension icon
- Fill in the CSV data with your recipients and any data you might want to use inside the template
- Fill in the subject
- Fill in the HTML template. if you insert `COL_1` inside the template, it will be replaced by the column at index 1 of the CSV. Works for `COL_0` up to `COL_9`
- First try and send a test email to yourself to check everything works and you're happy with the email content
- Set the delay between emails (2000 is fine - it seems GMail can block it if it's too fast, but I haven't experienced it)
- Click and confirm when you're ready to send emails
- LEAVE the browser open on the correct tab until it completes. Also make sure it's not going to go to sleep or something.


# Disclaimer

It's just something I made for my own use, I've used AI and it's not extensively tested.
Use at your own risk, I'm not responsible for any mail bombing you do or account ban you may suffer.
