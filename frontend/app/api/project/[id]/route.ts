import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { NextRequest, NextResponse } from "next/server";


export const GET = async(
    req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => {
    try {
        const session = await getServerSession(authOptions);

        if (!session || !session.user) {
          return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

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
                userId: session.user.id // Ensure the project belongs to the user
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