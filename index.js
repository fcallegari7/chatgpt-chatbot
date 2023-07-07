import openai from './config/open-ai.js';
import readlineSync from 'readline-sync';
import colors from 'colors';

const main = async () => {
    console.log(colors.bold.green('Welcome to the Chatbot program!'));
    console.log(colors.bold.green('You can start chatting with the bot.'));

    const chatHistory = []; // Store conversation history

    // eslint-disable-next-line no-constant-condition
    while (true) {
        const userInput = readlineSync.question(colors.yellow('You: '));

        try {
            // Construct messages by iterating over the history
            const messages = chatHistory.map(([role, content]) => ({
                role,
                content,
            }));

            // Add latest user input
            messages.push({ role: 'user', content: userInput });

            // Call the API with the user input
            const chatCompletion = await openai.createChatCompletion({
                model: 'gpt-3.5-turbo',
                messages,
            });

            // Get completion text/content
            const completionText =
                chatCompletion.data.choices[0].message.content;

            console.log(colors.green('Bot: ') + completionText);

            if (userInput.toLowerCase() === 'exit') {
                return;
            }

            // Update history with user input and assistant response
            chatHistory.push(['user', userInput]);
            chatHistory.push(['assistant', completionText]);
        } catch (error) {
            console.error(colors.red(error));
        }
    }
};

main();
