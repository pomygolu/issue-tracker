import { IssueSchema } from "@/app/createIssueSchema"
import prisma from "@/prisma/client"
import { NextRequest, NextResponse } from "next/server"

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const body = await request.json()
    const validation = IssueSchema.safeParse(body)
    if (!validation.success) {
        return NextResponse.json({ error: validation.error.message }, { status: 400 })
    }

    const { id } = await params
    const issue = await prisma.issue.findUnique({
        where: { id }
    })

    if (!issue) {
        return NextResponse.json({ error: 'Issue not found' }, { status: 404 })
    }

    const updatedIssue = await prisma.issue.update({
        where: { id },
        data: { title: validation.data.title, description: validation.data.description }
    })

    return NextResponse.json(updatedIssue)
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = (await params)
    const issue = await prisma.issue.findUnique({
        where: { id }
    })

    if (!issue) {
        return NextResponse.json({ error: 'Issue not found' }, { status: 404 })
    }

    const updatedIssue = await prisma.issue.delete({
        where: { id },
    })

    return NextResponse.json({})
}
