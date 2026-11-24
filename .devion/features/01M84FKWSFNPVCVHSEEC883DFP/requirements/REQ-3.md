---
id: "01M84FKWSFVP25P49J374TWWMF"
kind: requirement
parent: 01M84FKWSFNPVCVHSEEC883DFP
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · Run blocks at the approval gate before publishing unless auto-publish is on

Context: store.StatusAwaitingApproval and Config.AutoPublish exist. Desired behavior: on agent success, if AutoPublish is false Run saves status AWAITING_APPROVAL, keeps the worktree and does not call Publisher.Publish; if true it calls Publish and saves COMPLETED. Expected result: supervised publishing by default. Why: human approval of first releases.

## Acceptance criteria
- Given AutoPublish false and a successful agent, when Run is called, then the returned execution status is AWAITING_APPROVAL, the stored status matches, Publish is never called and Worktrees.Remove is not called
- Given AutoPublish true and a successful agent, when Run is called, then Publish is called once with the worktree directory and status is COMPLETED
- Given AutoPublish true and Publish returns an error, when Run is called, then the status is FAILED and the error is returned


## Scope
- In scope: gate logic in Run's finish step
- Out of scope: Approve call that publishes later
- Preserve: R1 and R2 behavior


## Dependencies
- R1


## Definition of done
- Gate behaves per criteria


## Clarifying questions
- None
