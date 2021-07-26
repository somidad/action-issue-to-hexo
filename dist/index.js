"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __importDefault(require("@actions/core"));
var octokit_1 = require("octokit");
var issueUrl = core_1.default.getInput('issue_url');
var index = issueUrl.indexOf('/repos');
var endpoint = issueUrl.substring(index);
var token = core_1.default.getInput('token');
var gh = new octokit_1.Octokit({ auth: token });
console.log(endpoint);
gh.request("GET " + endpoint).then(function (response) {
    var _a = response.data, title = _a.title, updated_at = _a.updated_at, labels = _a.labels, milestone = _a.milestone, body = _a.body;
    console.log({ title: title, updated_at: updated_at, labels: labels, milestone: milestone, body: body });
}).catch(function (reason) {
    core_1.default.setFailed(reason);
});
//# sourceMappingURL=index.js.map