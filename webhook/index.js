module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    const event = req.headers['X-GitHub-Event'];

    context.res = {
        body: `Webhook ${event} success.`
    };
};