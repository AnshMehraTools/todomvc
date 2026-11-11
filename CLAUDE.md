# Project instructions

## Phone approval during video editing

During video editing, for any creative or irreversible decision (cut choices, deleting footage, overwriting files, exporting final, changing style), run ask-approval and wait for my keypad answer before continuing. Do not call for trivial choices. Keep each question under 20 seconds when spoken, and give at most 3 options.

### How ask-approval works

```bash
scripts/ask-approval "Delete the unused B-roll folder?" "Approve" "Reject" "More options"
```

- Options map to keys 1 to 3 in the order given.
- Output is one JSON line. On success: `{"answered": true, "digit": "1", "option": "Approve", ...}`.
- Exit code 0 means I pressed a valid key. Continue with that choice.
- Exit code 2 means no usable answer after one re-ask (or the call could not connect). Stop and ask me in the chat. Never guess.
- Exit code 1 means a setup or API error (details on stderr). Tell me in the chat.
- Credentials come from the environment or a gitignored `.env`: `BIRD_API_KEY`, `BIRD_API_URL`, `APPROVAL_PHONE`, `BIRD_CALLER_ID`. Never print the API key, never commit `.env`, never hardcode a phone number.
