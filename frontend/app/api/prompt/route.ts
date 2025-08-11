
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { generateText, streamText } from "ai";
import { google } from "@ai-sdk/google";
import { SystemPrompt } from "@/lib/prompt";
import { extractPythonCode } from "@/lib/parse";
import axios from "axios";

export const POST = async ( req : NextRequest) => {
    try{
    const body = await req.json();
    const { projectId, prompt } = body;   

    const userPrompt = await prisma.prompt.create({
        data:{
            value: prompt,
            projectId: projectId,
            type: "USER",
            createdAt: new Date(),
            updatedAt: new Date(),
            
        }
    })
    const allPrompts = await prisma.prompt.findMany({
        where: {
            projectId: projectId,
            },
        orderBy: {
            createdAt: 'asc',
        }
    })
    if(!prompt){
            return new NextResponse(JSON.stringify({ error: "Prompt is required" }), { status: 400 });
    }
    
    let responsefromLLm;
    const { text } = await generateText({
        model: google("models/gemini-2.5-pro"),
        prompt: prompt,
        system:SystemPrompt
        });
        responsefromLLm = text;
        console.log("responseText-----");
        console.log(responsefromLLm);

        const extractCode = extractPythonCode(responsefromLLm)

        console.log("Extracted Code:");
        console.log(extractCode);

        const sceneNameMatch = extractCode!.match(/class\s+(\w+)\s*\(\s*Scene\s*\):/);
    const sceneName = sceneNameMatch ? sceneNameMatch[1] : null;
        // trying to get resposne from worker part
        const responsefromWorker =await axios.post(`${process.env.WORKER_URL}/run-manim`, {
            code: extractCode,
            scene_name: sceneName // or the actual scene name
        });

        const url = responsefromWorker.data.videoUrl;
        await prisma.prompt.update({
            where: {
            id: userPrompt.id,
            },
            data: {
            videoUrl: url,
            },
        });
        await prisma.prompt.create({
            data: {
            value: responsefromLLm!,
            projectId: projectId,
            type: "SYSTEM",
            videoUrl: url,
            },
        });
    
        return NextResponse.json({
            reply:responsefromLLm,
            url,
            extractCode,
            llmResponse: responsefromLLm,
        });
    } catch (error) {
        console.error("Error in chat API:", error);
            return NextResponse.json(
            { error: "Failed to process chat request" },
            { status: 500 }
            );
    }

}
