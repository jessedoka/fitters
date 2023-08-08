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
                "role": "user",
                "content": `what can I wear with a ${prompt}`
            },
        ],
        temperature: 0.9, // temperature is how crazy the AI's responses can be
        max_tokens: 1068,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
    });

    
    return res.status(200).json({ text: response.data.choices[0].message?.content});
    
    


    
    
}
