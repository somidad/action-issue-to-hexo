"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var core = __importStar(require("@actions/core"));
var octokit_1 = require("octokit");
var hexo_1 = __importDefault(require("hexo"));
var MILESTONE_PUBLISH = 'publish';
try {
    var issueUrl = core.getInput('issue_url');
    var index = issueUrl.indexOf('/repos');
    var endpoint_1 = issueUrl.substring(index);
    var token = core.getInput('token');
    var gh_1 = new octokit_1.Octokit({ auth: token });
    var hexo_2 = new hexo_1.default(process.cwd(), {});
    hexo_2.init().then(function () {
        gh_1.request("GET " + endpoint_1).then(function (response) {
            var _a = response.data, title = _a.title, date = _a.updated_at, labels = _a.labels, milestone = _a.milestone, content = _a.body;
            if (milestone.title !== MILESTONE_PUBLISH) {
                console.log("Issue " + endpoint_1 + " does not have milestone " + MILESTONE_PUBLISH);
            }
            else {
                var tags = labels.map(function (label) { return label.name; });
                hexo_2.post.create({
                    title: title,
                    date: date,
                    tags: tags,
                    content: content,
                });
            }
        }).catch(function (reason) {
            core.setFailed(reason);
        });
    }).catch(function (reason) {
        core.setFailed(reason);
    });
}
catch (e) {
    core.setFailed(e);
}
//# sourceMappingURL=index.js.map