import axios from "axios";
import type { INote } from "../src/models/interfaces.js";
import { tinymceToolbar } from "./functions/tinymce.js";

// Login
const userNav = document.querySelector(".login-user") as HTMLDivElement;
const userName = document.querySelector("#username-input") as HTMLInputElement;
const userPassword = document.querySelector("#user-password-input") as HTMLInputElement;
const loginBtn = document.querySelector("#login-user-btn") as HTMLButtonElement;
const loginUserText = document.querySelector(".logged-in-text") as HTMLParagraphElement;

// Notes
const notes = document.querySelector(".create-note") as HTMLElement;
const notesContainer = document.querySelector(".note-container") as HTMLElement;

declare const tinymce: any;

// Login user
loginBtn.addEventListener("click", async () => {
  const configLoginUser = {
    method: "POST",
    url: "http://localhost:3000/users/login",
    headers: {
      "Content-type": "application/json",
    },
    data: {
      name: userName.value,
      password: userPassword.value,
    },
  };

  try {
    const loginUser = await axios(configLoginUser);

    if (loginUser.status === 200) {
      loginUserText.innerHTML = userName.value;
      userNav.classList.add("hidden");
      createNotes();
      await printNotes();
    }
  } catch (error) {
    loginUserText.innerHTML = "Wrong username or password.";
  }
});

// Create notes
const createNotes = () => {
  const createNotesBtn = document.querySelector("#create-note-btn") as HTMLButtonElement;

  createNotesBtn.addEventListener("click", () => {
    notes.innerHTML = `
      <h3 class="create-note-title">Create Note</h3>
      <form id="form" method="post">
        <textarea id="create-note-title" type="text" placeholder="Title..."></textarea>
        <textarea id="textarea" type="text" placeholder="Write something..."></textarea>
        <button class="post-notes-btn" type="submit">Post note</button>
      </form>
    `;

    tinymceToolbar();

    const form = document.querySelector("#form") as HTMLFormElement;
    const createNotesTitle = document.querySelector("#create-note-title") as HTMLTextAreaElement;

    const handleForm = async (e: SubmitEvent) => {
      e.preventDefault();
      const createBodyText = tinymce.activeEditor.getContent(); // Get the users's text

      // Check if note is empty
      if (createNotesTitle && createBodyText) {
        const configCreateNote = {
          method: "POST",
          url: "http://localhost:3000/notes/add",
          headers: {
            "Content-type": "application/json",
          },
          data: {
            title: createNotesTitle.value,
            body: createBodyText,
            user: userName.value,
          },
        };

        await axios(configCreateNote);
        await printNotes();

        notes.innerHTML = `
        <button id="create-note-btn">Create note</button>
      `;
        createNotes();
      } else {
        alert("Please write something before posting a note.");
      }
    };

    form.addEventListener("submit", handleForm);
  });
};

// Print all notes
const printNotes = async () => {
  const configPrintNotes = {
    method: "GET",
    url: `http://localhost:3000/notes/${loginUserText.innerHTML}`,
    headers: {
      "Content-type": "application/json",
    },
  };

  const notes = await axios(configPrintNotes);

  // Clear notesContainer
  notesContainer.innerHTML = "";

  // Make a check to ONLY print notes that are not set as "deleted" in db
  notes.data.forEach((note: INote) => {
    if (note.deleted === 0) {
      notesContainer.innerHTML += `
        <article class="note">
          <h3 class="note-title">${note.title}</h3>
          <i><span class="note-id">${note.postID}</span></i>
          ${note.body}<br>
          <button id="edit-note-btn">Edit note</button>
        </article>
      `;
    }
  });

  // Edit note
  const editNoteBtns = document.querySelectorAll("#edit-note-btn") as NodeListOf<HTMLButtonElement>;

  editNoteBtns.forEach((btn: HTMLButtonElement) => {
    btn.addEventListener("click", async (e: MouseEvent) => {
      const createNotesBtn = document.querySelector("#create-note-btn") as HTMLButtonElement;
      createNotesBtn.disabled = true;

      // Disable all other btns when in edit mode
      editNoteBtns.forEach((btn: HTMLButtonElement) => {
        btn.disabled = true;
      });

      const parentElement = (e.target as HTMLElement).parentNode as HTMLElement;
      const pTags = parentElement.querySelectorAll("p") as NodeListOf<HTMLParagraphElement>;
      const postID = parentElement.querySelector(".note-id") as HTMLElement;
      const titleText = parentElement.querySelector(".note-title") as HTMLTextAreaElement;

      let bodyText = "";

      // To get all preview text with styling. Otherwise only the first line appears
      pTags.forEach((pTag) => {
        bodyText += pTag.outerHTML;
      });

      parentElement.innerHTML = `
        <h3 class="edit-note-title">Edit note</h3>
        <i class="edit-note-id"># <span>${postID.textContent}</span></i>
        <form id="update-form" method="post">
          <textarea id="edit-title">${titleText.textContent}</textarea>
          <textarea id="textarea">${bodyText}</textarea>
          <button id="save-note-btn" type="submit">Save note</button>
          <button id="delete-note-btn">Delete note</button>
        </form>
      `;

      tinymceToolbar();

      // Post edit notes
      const editForm = document.querySelector("#update-form") as HTMLFormElement;
      const editNoteTitle = document.querySelector("#edit-title") as HTMLTextAreaElement;

      editForm.addEventListener("submit", async (e: Event) => {
        e.preventDefault();
        const editNoteBodyText = tinymce.activeEditor.getContent(); // Get the users's content

        // Check if note is empty
        if (editNoteTitle && editNoteBodyText) {
          const configEditNote = {
            method: "POST",
            url: "http://localhost:3000/notes/edit",
            headers: {
              "Content-type": "application/json",
            },
            data: {
              postID: postID.textContent,
              title: editNoteTitle.value,
              body: editNoteBodyText,
            },
          };
          await axios(configEditNote);

          // Disable create note when in edit mode
          createNotesBtn.disabled = false;

          await printNotes();
        } else {
          alert("Can't leave any field empty.");
        }
      });

      // "Delete" note
      const deleteNoteBtn = document.querySelector("#delete-note-btn") as HTMLButtonElement;

      deleteNoteBtn.addEventListener("click", async () => {
        const configDeleteNote = {
          method: "POST",
          url: "http://localhost:3000/notes/delete",
          headers: {
            "Content-type": "application/json",
          },
          data: {
            postID: postID.textContent,
            deleted: 1,
          },
        };

        await axios(configDeleteNote);
        await printNotes();
      });
    });
  });

  // Return edit-note-btn to use in other functions
  return document.querySelectorAll("#edit-note-btn") as NodeListOf<HTMLButtonElement>;
};
