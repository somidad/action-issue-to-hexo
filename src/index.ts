import core from '@actions/core';
import { Octokit } from 'octokit';

const issueUrl = core.getInput('issue_url');
const index = issueUrl.indexOf('/repos');
const endpoint = issueUrl.substring(index);
const token = core.getInput('token');

const gh = new Octokit({ auth: token });

console.log(endpoint);
gh.request(`GET ${endpoint}`).then((response) => {
    const { title, updated_at, labels, milestone, body } = response.data;
    console.log({ title, updated_at, labels, milestone, body });
}).catch((reason) => {
    core.setFailed(reason);
});
