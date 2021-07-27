import core from '@actions/core';
import { Octokit } from 'octokit';
import Hexo from 'hexo';

const MILESTONE_PUBLISH = 'publish';

try {
    const issueUrl = core.getInput('issue_url');
    const index = issueUrl.indexOf('/repos');
    const endpoint = issueUrl.substring(index);
    const token = core.getInput('token');

    const gh = new Octokit({ auth: token });

    const hexo = new Hexo(process.cwd(), {});
    hexo.init().then(() => {
        gh.request(`GET ${endpoint}`).then((response) => {
            const { title, updated_at: date, labels, milestone, body: content } = response.data;
            if (milestone.title !== MILESTONE_PUBLISH) {
                console.log(`Issue ${endpoint} does not have milestone ${MILESTONE_PUBLISH}`);
            } else {
                const tags = labels.map((label: any) => label.name);
                hexo.post.create({
                    title,
                    date,
                    tags,
                    content,
                } as any);
            }
        }).catch((reason) => {
            core.setFailed(reason);
        });
    }).catch((reason) => {
        core.setFailed(reason);
    });
} catch (e) {
    core.setFailed(e);
}
