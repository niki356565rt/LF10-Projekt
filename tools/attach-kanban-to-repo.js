/**
 * Legt das Kanban-Board UNTER DEM REPO-OWNER an und verknuepft es mit
 * niki356565rt/LF10-Projekt. Muss als niki356565rt ausgefuehrt werden:
 *   gh auth login -h github.com -s repo -s project -s read:org -w
 *   node tools/attach-kanban-to-repo.js
 */
const { execFileSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const gh = "C:\\Program Files\\GitHub CLI\\gh.exe";
const repo = "niki356565rt/LF10-Projekt";
const repoId = "R_kgDOT8VGHg";
const expectedLogin = "niki356565rt";

function ghRun(args, opts = {}) {
  return execFileSync(gh, args, { encoding: "utf8", ...opts }).trim();
}
function ghJson(args) {
  const out = ghRun(args);
  return out ? JSON.parse(out) : null;
}
function graphql(query, variables) {
  const payload = JSON.stringify({ query, variables });
  const tmp = path.join(process.env.TEMP || ".", "gh-gql.json");
  fs.writeFileSync(tmp, payload);
  return JSON.parse(ghRun(["api", "graphql", "--input", tmp]));
}

const login = ghRun(["api", "user", "--jq", ".login"]);
if (login !== expectedLogin) {
  console.error(`Angemeldet als ${login}. Bitte als ${expectedLogin} einloggen.`);
  process.exit(1);
}

const ownerId = ghRun(["api", "user", "--jq", ".node_id"]);
const created = graphql(
  `mutation($ownerId:ID!,$repoId:ID!,$title:String!){
    createProjectV2(input:{ownerId:$ownerId,title:$title,repositoryId:$repoId}){
      projectV2 { id number url }
    }
  }`,
  { ownerId, repoId, title: "Smart Restaurant – Kanban" }
);
if (created.errors) {
  console.error(JSON.stringify(created.errors, null, 2));
  process.exit(1);
}
const project = created.data.createProjectV2.projectV2;
const number = String(project.number);
const projectId = project.id;
console.log("created", project.url);

ghRun(["project", "edit", number, "--owner", "@me", "--visibility", "PUBLIC",
  "--description", "Kanban Smart Restaurant: Backlog, ToDo, In Progress, Review/Test, Done."]);

const fields = ghJson(["project", "field-list", number, "--owner", "@me", "--format", "json"]);
const statusField = fields.fields.find((f) => f.name === "Status");

const statusUpdated = graphql(
  `mutation($fieldId:ID!){
    updateProjectV2Field(input:{
      fieldId:$fieldId
      singleSelectOptions:[
        {name:"Backlog",color:GRAY,description:"Noch nicht im Sprint"}
        {name:"ToDo",color:BLUE,description:"Bereit"}
        {name:"In Progress",color:YELLOW,description:"In Arbeit"}
        {name:"Review/Test",color:ORANGE,description:"Pruefen"}
        {name:"Done",color:GREEN,description:"Fertig"}
      ]
    }){
      projectV2Field { ... on ProjectV2SingleSelectField { id options { id name } } }
    }
  }`,
  { fieldId: statusField.id }
);
const statusOptions = {};
for (const o of statusUpdated.data.updateProjectV2Field.projectV2Field.options) {
  statusOptions[o.name] = o.id;
}

function ensureSelect(name, options) {
  const existing = fields.fields.find((f) => f.name === name);
  if (existing) return existing;
  const args = ["project", "field-create", number, "--owner", "@me", "--name", name, "--data-type", "SINGLE_SELECT"];
  for (const o of options) args.push("--single-select-options", o);
  return JSON.parse(ghRun(args.concat(["--format", "json"])));
}
ensureSelect("Sprint", ["Sprint 1", "Sprint 2", "Sprint 3", "Sprint 4"]);
ensureSelect("Priorität", ["Muss", "Soll", "Kann"]);

const fields2 = ghJson(["project", "field-list", number, "--owner", "@me", "--format", "json"]);
function optionMap(fieldName) {
  const f = fields2.fields.find((x) => x.name === fieldName);
  const map = { id: f.id, options: {} };
  for (const o of f.options) map.options[o.name] = o.id;
  return map;
}
const sprintF = optionMap("Sprint");
const prioF = optionMap("Priorität");

const statusByIssue = {
  1: { status: "Done", sprint: "Sprint 1", prio: "Muss" },
  2: { status: "Done", sprint: "Sprint 1", prio: "Muss" },
  3: { status: "Done", sprint: "Sprint 1", prio: "Muss" },
  4: { status: "ToDo", sprint: "Sprint 1", prio: "Muss" },
  5: { status: "ToDo", sprint: "Sprint 1", prio: "Muss" },
  6: { status: "ToDo", sprint: "Sprint 2", prio: "Muss" },
  7: { status: "ToDo", sprint: "Sprint 2", prio: "Muss" },
  8: { status: "ToDo", sprint: "Sprint 2", prio: "Muss" },
  9: { status: "ToDo", sprint: "Sprint 3", prio: "Muss" },
  10: { status: "Backlog", sprint: "Sprint 3", prio: "Soll" },
  11: { status: "Backlog", sprint: "Sprint 3", prio: "Soll" },
  12: { status: "ToDo", sprint: "Sprint 3", prio: "Muss" },
  13: { status: "ToDo", sprint: "Sprint 2", prio: "Muss" },
  14: { status: "Backlog", sprint: "Sprint 4", prio: "Muss" },
  15: { status: "Backlog", sprint: "Sprint 4", prio: "Muss" },
  16: { status: "Backlog", sprint: "Sprint 4", prio: "Soll" },
};

function setField(itemId, fieldId, optionId) {
  ghRun([
    "project", "item-edit",
    "--id", itemId,
    "--project-id", projectId,
    "--field-id", fieldId,
    "--single-select-option-id", optionId,
  ]);
}

for (let n = 1; n <= 16; n++) {
  const url = `https://github.com/${repo}/issues/${n}`;
  const added = ghJson(["project", "item-add", number, "--owner", "@me", "--url", url, "--format", "json"]);
  const itemId = added.id;
  const meta = statusByIssue[n];
  setField(itemId, statusField.id, statusOptions[meta.status]);
  setField(itemId, sprintF.id, sprintF.options[meta.sprint]);
  setField(itemId, prioF.id, prioF.options[meta.prio]);
  console.log("#" + n, meta.status, itemId);
}

console.log("REPO_BOARD=" + project.url);
