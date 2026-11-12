# Project instructions

## Phone approval during video editing

During video editing, for any creative or irreversible decision (cut choices, deleting footage, overwriting files, exporting final, changing style), run ask-approval and wait for my keypad answer before continuing. Do not call for trivial choices. Keep each question under 20 seconds when spoken, and give at most 3 options.

The approver ("my keypad answer" above) is the CEO. ask-approval phones the number in `APPROVAL_PHONE`.

### How to ask

```bash
scripts/ask-approval "Export the final cut as MP4?" "Export it" "Not yet" "Something else"
```

- **Option 1 is always the action you intend to take.** Options 2 and 3 are alternatives or a decline. Only pressing 1 unlocks the action in the approval gate.
- Keep the question short and self-contained: the approver cannot see the screen. Say what, and which file, in plain words. An intro ("Approval request from your video editing assistant.") is spoken first and counts toward the 20 seconds.
- One decision per call. Never batch several decisions into one call.
- Use `--attempts 1` if a re-dial would be unwelcome.

### What to do with the result

Output is one JSON line, for example `{"answered": true, "digit": "1", "option": "Export it", "approved": true, ...}`.

| Exit code | Meaning | What you do |
|---|---|---|
| 0, `"approved": true` | Approver pressed 1 | Carry out that action now |
| 0, `"approved": false` | Approver pressed 2 or 3 | Do not do the action. Take the alternative they chose, or if it was "something else" or "more options", continue in chat |
| 2 | No usable answer after one re-ask, or the call could not connect | Stop and ask in the chat. Never guess |
| 3 | Quiet hours for the approver (default 22:00 to 07:00 Dubai time), no call placed | Do not proceed. Ask in the chat, or wait and ask again after quiet hours |
| 4 | Hourly call budget used (default 6), no call placed | Do not proceed. Ask in the chat |
| 1 | Setup or API error (details on stderr) | Tell the user in the chat |

### The approval gate (enforced by a hook)

`.claude/settings.json` runs `scripts/approval-gate` before every Bash and Write call. It blocks risky actions unless the approver has just pressed 1:

- deleting media or project files, recursive deletes outside temp folders, `find -delete`
- overwriting an existing file with `cp`, `mv` or a redirect, `ffmpeg -y` or an existing output, exporting a file named final, master, export or render
- `git push --force`, `git reset --hard`, `git clean`, discarding working-tree changes
- overwriting an existing media or project file with the Write tool

One approval unlocks exactly one command and expires after 15 minutes. If a command is blocked, run ask-approval and retry. Do not try to get around the gate, and never write to `.approval-state/` (the gate blocks it). The gate is a safety net against accidents. It is not a substitute for asking before creative or irreversible decisions.

Tests (offline, place no calls): `python3 scripts/test-approval-gate`

### Configuration and secrets

Credentials come from the environment or a gitignored `.env`: `BIRD_API_KEY`, `BIRD_API_URL`, `APPROVAL_PHONE`, `BIRD_CALLER_ID`. Optional: `APPROVAL_INTRO`, `APPROVAL_TZ` (default Asia/Dubai), `APPROVAL_QUIET` (default 22-07, empty turns it off), `APPROVAL_MAX_PER_HOUR` (default 6), `APPROVAL_APPROVE_DIGITS` (default 1).

Never print the API key, never commit `.env`, never hardcode a phone number. The audit log of calls is `.approval-state/log.jsonl` (gitignored, contains no phone numbers).
