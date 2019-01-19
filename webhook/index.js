module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');
    context.log(JSON.stringify(req.headers));

    // https://developer.github.com/webhooks/#events
    const event = req.headers['x-github-event'];

    context.res = {
        body: `Webhook ${event} success.`
    };
};