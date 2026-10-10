# GitHub and portable source history

The supplied account link is https://github.com/keerthana911-netizen.
This is a profile, not a RoadWatch repository URL. A repository destination and authenticated GitHub access are still required before this project can be pushed. No GitHub publication is claimed by this document.

The source ZIP includes these additional files under `history/`:

- `roadwatch.bundle`: full root-project commit history through the handoff commit, without local credentials or Git configuration.
- `COMMITS.txt`: readable commit hashes, timestamps and subjects.
- `README.md`: restore instructions.

To restore the versioned root project after extracting the ZIP:

```powershell
git clone .\RoadWatch\history\roadwatch.bundle .\RoadWatch-with-history
git -C .\RoadWatch-with-history log --oneline
```

The hosting adapter is supplied separately in the ZIP's `RoadWatch/sites/roadwatch/` directory. It is intentionally excluded from the root Git repository to prevent dependency and build conflicts. The Site service separately preserves its pushed source versions.

After confirming the repository URL and signing in to GitHub, the restored project can be connected and pushed. Use the actual repository URL provided by the team; do not publish a guessed link or treat this account profile as proof that the code is hosted there.

Commit times and authors record source changes. They do not establish the hackathon's start/finish times, human ownership or whether a change happened at the event.
