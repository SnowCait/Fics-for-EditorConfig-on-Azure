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

    context.res = {
        body: `Webhook ${githubEvent} success.\nhead: ${headSha}\nbase: ${baseSha}`
    };
};