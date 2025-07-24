import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";


export const GET = async(
    req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => {
    try {

        const USERId = "123"; // Replace with actual user ID retrieval logic
        const { id : projectId} = await params;

        if (!projectId) {
            return new Response(
                JSON.stringify({ error: "Project ID is required" }),
                { status: 400, headers: { "Content-Type": "application/json" } }
            );
        }

        const project = await prisma.project.findUnique({
            where: {
                id: projectId,
                userId: USERId, // Ensure the project belongs to the user
            },
        });
        if(!project) {
            return new Response(
                JSON.stringify({ error: "Project not found" }),
                { status: 404, headers: { "Content-Type": "application/json" } }
            );
        }
        return NextResponse.json({ project });
    }
    catch (error) {
        return NextResponse.json(
            {
                error: "Failed to retrieve project",
                details: error instanceof Error ? error.message : "Unknown error",
            },
            { status: 500 }
        );
    }

}