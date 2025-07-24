import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";


export const GET = async (
    req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => {

    try{
        const session = await getServerSession(authOptions);

        if (!session || !session.user) {
          return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { id: projectId } = await params;

        if (!projectId) {
            return new Response(
                JSON.stringify({ error: "Project ID is required" }),
                { status: 400, headers: { "Content-Type": "application/json" } }
            );
        }
        const prompts = await prisma.prompt.findMany({
            where: {
                projectId: projectId,
                },
            });
        
        if (!prompts) {
            return NextResponse.json({ error: "Project not found" }, { status: 404 });
        }
    
        return NextResponse.json(prompts);
        } catch (error) {
        console.error("Error fetching project:", error);
        return NextResponse.json(
            {
            error: "Failed to fetch project",
            details: error instanceof Error ? error.message : "Unknown error",
            },
            { status: 500 }
        );
    }

}