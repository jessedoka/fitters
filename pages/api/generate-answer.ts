import { NextApiRequest, NextApiResponse } from "next";
import { Configuration, OpenAIApi, ChatCompletionResponseMessage } from "openai";

type ResponseData = {
    text: ChatCompletionResponseMessage | string | undefined;
};

interface GenerateNextApiRequest extends NextApiRequest {
    body: {
        prompt: string;
    };
}

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export default async function handler(
    req: GenerateNextApiRequest,
    res: NextApiResponse<ResponseData>
) {
    const { prompt } = req.body;

    if (!prompt || prompt === "") {
        return res.status(400).json({ text: "No prompt provided" });
    }

    const response = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
            {
                "role": "system",
                "content": "Answer in a consistent manner. \n\nWhen I ask for help to write something, you will reply with a document that contains the following: \nSmart:\n\nCasual:\n\nInclude links on where to get those items\nAsk the user for a colour if not provided"
            },
            {
                "role": "user",
                "content": `${prompt}`
            },
        ],
        temperature: 1,
        max_tokens: 668,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
    });

    
    return res.status(200).json({ text: response.data.choices[0].message?.content});
    
    


    
    
}
