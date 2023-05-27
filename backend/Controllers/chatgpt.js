const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);


exports.GenerateSummaryForBlog = async (blogContent) => {

    try {
        openai.createCompletion({
            engine: 'text-davinci-003',
            prompt: `Generate a summary of the blog content: 
                    ${blogContent}`,
            max_tokens: 40,
            temperature: 0.3,
            n: 3,
            stop: '\n',
        }).then(response => {
            const summary = response.choices.map(choice => choice.text.trim());
            console.log('Summary:', summary);
            return summary
        }).catch(error => {
            console.error('Error:', error.message);
            return [false];
        });
    } catch (error) {
        console.error(error);
        return false;
    }
};