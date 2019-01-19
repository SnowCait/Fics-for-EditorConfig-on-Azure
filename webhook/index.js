const octokit = require('@octokit/rest')();

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    // https://developer.github.com/webhooks/#events
    const githubEvent = req.headers['x-github-event'];

    if (githubEvent !== 'check_suite') {
        context.res = {
            body: `Webhook ${githubEvent} success.`
        };
        return;
    }

    const headSha = req.body.check_suite.pull_requests.head.sha;
    const baseSha = req.body.check_suite.pull_requests.base.sha;

    context.res = {
        body: `Webhook ${githubEvent} success.\nhead: ${headSha}\nbase: ${baseSha}`
    };
};