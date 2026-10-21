#!/usr/bin/env node
// UserPromptSubmit hook, registered by install.js: adds "Current time: 11:52 AM ET"
// and "Today (ET): Tuesday, October 20, 2026" to Claude's context on each
// message. Always exits 0, so a broken clock never blocks a prompt.
// A Stop-hook "Finished" line was tried 2026-10-04 and dropped: the Claude app
// didn't display it.
try {
  const now = new Date();
  const t = now.toLocaleTimeString('en-US', {
    timeZone: 'America/New_York', hour: 'numeric', minute: '2-digit',
  }) + ' ET';
  // The date too: cloud sessions report "today" in UTC, a day ahead in the evening.
  const d = now.toLocaleDateString('en-US', {
    timeZone: 'America/New_York', weekday: 'long', month: 'long', day: 'numeric', year: 'numeric',
  });
  process.stdout.write(JSON.stringify({
    hookSpecificOutput: { hookEventName: 'UserPromptSubmit', additionalContext: `Current time: ${t}\nToday (ET): ${d}` },
  }));
} catch (e) {}
process.exit(0);
