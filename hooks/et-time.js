#!/usr/bin/env node
// UserPromptSubmit hook, registered by install.js: adds "Current time: 11:52 AM ET"
// to Claude's context on each message. Always exits 0, so a broken clock never
// blocks a prompt.
// A Stop-hook "Finished" line was tried 2026-10-04 and dropped: the Claude app
// didn't display it.
try {
  const t = new Date().toLocaleTimeString('en-US', {
    timeZone: 'America/New_York', hour: 'numeric', minute: '2-digit',
  }) + ' ET';
  process.stdout.write(JSON.stringify({
    hookSpecificOutput: { hookEventName: 'UserPromptSubmit', additionalContext: `Current time: ${t}` },
  }));
} catch (e) {}
process.exit(0);
