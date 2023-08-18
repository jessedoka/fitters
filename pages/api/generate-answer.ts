import { NextApiRequest, NextApiResponse } from "next";
import { Configuration, OpenAIApi, ChatCompletionResponseMessage } from "openai";

type ResponseData = {
    text: ChatCompletionResponseMessage | string | undefined;
};


interface GenerateNextApiRequest extends NextApiRequest {
    body: {
        prompt: string;
        isMale: boolean;
        style: string;
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
    const { style } = req.body;
    const { isMale } = req.body;


    if (!prompt || prompt === "") {
        return res.status(400).json({ text: "No prompt provided" });
    }

    if (prompt.length > 200) {
        return res.status(400).json({ text: "Prompt is too long" });
    }


    const response = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
            {
                "role": "system",
                "content": "Be concise.\nDisplay in the form of a list of different options.\nUse correct grammar.\nUse correct spelling.\nUse correct punctuation.\nUse complete sentences.\nUse a variety of sentence types.\nUse the active voice.\nUse the present tense.\nUse the third person."
            },
            {
                "role": "user",
                "content": `what can a ${isMale ? "Male" : "Female"} wear with an ${prompt}? for a ${style} event`
            },
        ],
        temperature: 0.75,
        max_tokens: 680,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
    });


    return res.status(200).json({ text: response.data.choices[0].message?.content});






}
