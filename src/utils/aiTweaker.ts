import { SUPPORTED_COMMANDS } from "../constants";

// The built in AI model does not like it when you instruct it on how to return data.
// So... insead of it JUST returning a command from the array it returns a bunch of markdown text as well.
// So.. here's a helper function to extract the command from the markdown
export const extractCommandFromText = (text: string) => {
    // Loop through each command in the order they appear in SUPPORTED_COMMANDS
    for (const command of SUPPORTED_COMMANDS) {
        // Create a case-insensitive regular expression for each command
        const commandRegex = new RegExp(`\\b${command}\\b`, 'i');
        
        // Check if the command is found in the text
        if (commandRegex.test(text)) {
            return command;  // Return the first command found
        }
    }
    
    // Return null if no command is found
    return null;
}

// Again, instead of getting what i ask for i get more markdown.
// Extract out the fully qualified URL from the markdown.
export const extractURLFromText = (text: string) => {

    // Google AI loves markdown stars, so we need to remove them.
    const cleanedText = text.replace(/\*/g, '').replace(/`/g, '');
    const urlPattern = /https?:\/\/[^\s/$.?#].[^\s]*/i;

    // Match the URL in the text
    const match = cleanedText.match(urlPattern);

    // Return the first matched URL, or null if no match is found
    return match ? match[0] : null;
}

// this is getting painful... 
// Extract the target content from the text **target content**
export const findMatchingLink = (text: string, clickableLinks: {text:string, url: string}[]) => {
    // Loop through each clickable link
    for (const link of clickableLinks) {
        // Create a case-insensitive regular expression for the link text
        const linkTextRegex = new RegExp(`\\b${link.text}\\b`, 'i');
        
        // Check if the link text is found in the text
        if (linkTextRegex.test(text)) {
            return link;  // Return the first link found
        }
    }
    
    // Return null if no link is found
    return null;
}