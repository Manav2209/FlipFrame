import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

// { name :"prompt" , description :"prompt ,userId "}
export const POST = async (req: NextRequest) => {

    try{
    const USERId ="123"

    const body = await req.json();

    const { prompt} = body;
    if (!prompt) {
        return NextResponse.json(
            { error: "Prompt is Required" },
            { status: 400 }
            );
    }
    // Check if a project with the same name already exists for the user
    const existingProject = await prisma.project.findFirst({
        where: {
            name: prompt,
            userId: USERId,
        },
    });
    if (existingProject) {
        return NextResponse.json(
            { error: "Project with this name already exists" },
            { status: 409 }
            );
    }

    const newProject = await prisma.project.create({
        data: {
            name: prompt,
            description: prompt,
            userId: USERId,
            createdAt: new Date(),
            updatedAt: new Date()
        },
    });
    return NextResponse.json(
        {
            project: newProject,
            message: "Project created successfully",
        },
        { status: 201 }
        );
    }
    catch(error){
        

        return NextResponse.json(
        {
            error: "Failed to create project",
            details: error instanceof Error ? error.message : "Unknown error",
        },
        { status: 500 }
        );
    }
    
}

export const GET = async () => {
    try {
        
        const USERId ="123"
        
        const projects = await prisma.project.findMany({
            where: {
            userId: USERId,
            },
            orderBy: {
            createdAt: "desc",
            },
        });
    
        return NextResponse.json({ projects });
        } catch (error) {
        console.error("Error fetching projects:", error);
        return NextResponse.json(
            {
            error: "Failed to fetch projects",
            details: error instanceof Error ? error.message : "Unknown error",
            },
            { status: 500 }
        );
        }
    };