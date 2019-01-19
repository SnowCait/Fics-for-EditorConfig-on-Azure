const octokit = require('@octokit/rest')();

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    // https://developer.github.com/webhooks/#events
    const githubEvent = req.headers['x-github-event'];
    const githubAction = req.body.action;

    if (githubEvent !== 'pull_request' || ['opened', 'synchronize'].indexOf(githubAction) < 0) {
        context.res = {
            body: `Webhook ${githubEvent}.${githubAction} success.`
        };
        return;
    }

    const headSha = req.body.pull_request.head.sha;
    const baseSha = req.body.pull_request.base.sha;
    const mergeSha = req.body.pull_request.merge_commit_sha;
    const owner = req.body.pull_request.head.repo.owner.login;
    const repo = req.body.pull_request.head.repo.name;
    const number = req.body.number;

    // Authenticate
    octokit.authenticate({
        type: 'oauth',
        key: process.env['ClientId'],
        secret: process.env['ClientSecret']
    });

    // const result = await octokit.issues.createComment({
    //     owner: req.body.pull_request.head.repo.owner.login,
    //     repo: req.body.pull_request.head.repo.name,
    //     number: req.body.number,
    //     body: `merge: ${mergeSha}\nhead: ${headSha}\nbase: ${baseSha}`
    // });

    const result = await octokit.checks.create({
        owner: owner,
        repo: repo,
        name: 'sample',
        head_sha: headSha
    });

    context.res = {
        body: `Webhook ${githubEvent}.${githubAction} success.`
    };
};