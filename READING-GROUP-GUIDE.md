# Updating the philosophy reading hub

The existing portal now includes the Maudlin introduction, Lewis's Quantum Ontology, and Godfrey-Smith's Theory and Reality. These are book-level starting points, not a finalized weekly schedule. The three companion notebooks supplied by Prof. Leon are linked to their corresponding books. Individual videos, slides, notes, and quizzes have not been exported into the website; the notebook contents and student access have not been verified. The discussion prompts are new editorial suggestions, not quotations or chapter summaries.

## Add your first resource

In Google AI Studio, open `src/data/readingGroup.json` in the Code view. All reading-hub content lives in this one file. You can also ask AI Studio to edit this file using your supplied links without changing the site layout.

Each session has a `resources` list. Replace its empty `[]` with entries like this, substituting your actual shared URL:

```json
[
  {
    "title": "Chapter 1 video overview",
    "kind": "video",
    "url": "PASTE_YOUR_SHARED_HTTPS_LINK_HERE"
  }
]
```

The example URL above is deliberately not a working URL and will not appear as a student resource. Supported kinds: `video`, `audio`, `slides`, `notes`, `briefing`, `quiz`. Use a comma between entries. The site only displays valid HTTP(S) links or root-relative file paths.

Use `readingUrl` for an authorized reading or library access link, and `notebookUrl` for the actual shared companion notebook. Empty values produce explanatory text instead of broken buttons. Set the meeting note and, if available, meeting URL at the top of the file. Confirm the edition of Theory and Reality before adding page numbers. Add later chapter sessions by copying a session entry and giving it a unique `id`.

## Move NotebookLM materials to the site

1. Send Prof. Leon's actual notebook share link, or export the resources available in NotebookLM. Different resource types may offer different export and sharing options.
2. For videos, audio, slide decks, notes, and briefing documents, use an accessible shared file URL or an exported file. If keeping files with the website, put them in `public/resources/` and use a URL such as `/resources/maudlin-notes.pdf`. Prefer an existing media host for large videos.
3. Add each resource to the appropriate session's list above. The current implementation opens resources in a new tab; it does not embed every external platform or automatically synchronize notebooks.
4. For interactive quizzes, link to the shared quiz when available. A PDF export will remain a document, not an interactive quiz. Exported question text can be converted into a website practice quiz in a later update.
5. Test each shared link as a student, using an account without your editing privileges. Website access does not automatically grant access to Drive files or notebooks.

## What is ready and what is pending

Ready: reading sequence, book navigation, expandable discussion prompts, resource cards, missing-resource messages, mobile layout correction, keyboard focus styles, and transparent AI companion labels. Existing course catalog and quiz features remain.

Pending: exported materials or individual resource links, weekly assignments, meeting details, Theory and Reality edition, and verification of student notebook access. The GitHub project is https://github.com/exapologist/teaching-website. Existing course notebook fields all point to the generic NotebookLM homepage; replace them in `src/data/courses.ts` when course-specific share links are ready.

## Cost and publishing

The new reading hub only displays text and resource links; it makes no Gemini API requests. The existing AI companion and quiz generator still call Gemini on the server when used. Hosting, media storage, and API billing depend on your accounts and usage; this update makes no billing or hosting changes.

This ZIP is an edited source package, not a live-site update. To keep your current setup, apply the changes to the existing GitHub project, sync into Google AI Studio, and redeploy that project. Do not create a replacement project merely to apply these changes. The GitHub connection is now installed. The original AI Studio export is preserved on main, with the reading-hub update prepared in a separate pull request. Review and merge that update, then sync it into the existing AI Studio project and redeploy when ready.

## Developer handoff

Use Node.js and `npm ci` to install the locked dependencies. `npm run build` produces the frontend and Node server. Run the built app with `NODE_ENV=production npm start`; it respects the host's `PORT` variable, defaulting to 3000. The AI features require `GEMINI_API_KEY` in the server environment; reading-hub content does not. Preserve the existing Node/Express deployment for these AI features; GitHub Pages alone cannot execute their server routes.

The original `.env.example` is a template, not a credential. Never commit a real API key. Review changes before deploying. Local validation does not verify your live hosting settings, paid AI requests, or access permissions on resources that have not been supplied.
