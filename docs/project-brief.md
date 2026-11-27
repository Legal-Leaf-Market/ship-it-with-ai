# Project brief and attachments

The homepage asks a visitor about their website, bookings, repeat work, reporting, or another problem. The next step adapts to their choice and asks for a recent example, the tools involved, where the work gets stuck, and how often it happens. The last set of questions covers the desired outcome, the people involved, constraints, and timing.

## What Jake receives

The visitor reviews a plain-text brief, then continues to the existing `booking` form. They can edit the message and enter their contact details before sending. Attachments and recordings are optional. The checkbox for updates adds a line to the inquiry for Jake to see. It does not enroll anyone in a mailing list.

Use the brief to answer in four parts. Restate the problem as you understand it, identify what you would look at first, suggest one small prototype, and ask about the detail that will change the scope most. In a later follow-up, tie the prototype back to the outcome they described.

## Uploads and screen recordings

- The existing Netlify form keeps its name and field names. It uses a native multipart submission with `project-file-1`, `project-file-2`, `project-file-3`, and `screen-recording` as optional file fields.
- The file pickers do not filter by extension or MIME type. The page checks a combined 7 MB limit to leave room under Netlify’s 8 MB request ceiling. Netlify supports one attachment per form field. People can include a link to a larger redacted example in the message.
- On browsers that support screen capture and recording, visitors choose a tab or window through the browser’s permission prompt. The clip records without audio and stops after 30 seconds or when the visitor stops sharing. The visitor previews it and chooses whether to attach it. Mobile and other unsupported browsers can attach an existing video.
- The brief, files, and clip are sent only through the existing inquiry when the visitor presses **Send inquiry**. Netlify puts file links in the submission and its notification. The form asks for sample or redacted materials and tells visitors to leave out passwords, customer details, and payment data.
- Jake reviews clips from the submission. Automated video analysis is not configured. An automated version would need a private processing service, an explicit visitor disclosure, a retention policy, and a way to link generated notes to the correct inquiry.

## Release check

After publishing, confirm the four new field names on the existing Netlify form. Submit a labeled test with a small synthetic file and verify that the thank-you page loads and the file appears on the corresponding test submission. Verify a supported desktop browser with a blank test tab for the recorder. On mobile, verify the video upload fallback. Keep prior form submissions intact.

[Netlify form uploads](https://docs.netlify.com/manage/forms/setup/#file-uploads)
