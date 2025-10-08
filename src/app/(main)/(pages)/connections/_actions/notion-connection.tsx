'use server'

import { db } from '@/lib/db'
import { currentUser } from '@clerk/nextjs/server'
import { Client } from '@notionhq/client'

export const onNotionConnect = async (
accessToken: string, workspaceId: string, workspaceIcon: string, workspaceName: string, databaseId: string, id: string) => {
  if (!accessToken) return

  const notionConnected = await db.notion.findFirst({
    where: { accessToken },
    include: { connections: { select: { type: true } } },
  })

  if (!notionConnected) {
    const user = await currentUser()
    if (!user) return

    await db.notion.create({
      data: {
        userId: user.id,
        workspaceIcon,
        accessToken,
        workspaceId,
        workspaceName,
        databaseId,
        connections: {
          create: {
            userId: user.id,
            type: 'Notion',
          },
        },
      },
    })
  }
}

export const getNotionConnection = async () => {
  const user = await currentUser()
  if (!user) return

  const connection = await db.notion.findFirst({
    where: { userId: user.id },
  })
  return connection
}

export const getNotionDatabase = async (
  databaseId: string,
  accessToken: string
) => {
  const notion = new Client({ auth: accessToken })
  const response = await notion.databases.retrieve({ database_id: databaseId })
  return response
}

export const onCreateNewPageInDatabase = async (
  databaseId: string,
  accessToken: string,
  content: string
) => {
  const notion = new Client({ auth: accessToken })
  const response = await notion.pages.create({
    parent: { database_id: databaseId },
    properties: {
      Name: {
        title: [
          { text: { content } },
        ],
      },
    },
  })
  return response
}

export const onCreateWorkflow = async (name: string, description: string) => {
  const user = await currentUser()
  if (!user) return { message: 'User not found' }

  const workflow = await db.workflows.create({
    data: { userId: user.id, name, description },
  })

  return workflow ? { message: 'Workflow created' } : { message: 'Oops! Try again' }
}

export const onGetWorkflows = async () => {
  const user = await currentUser()
  if (!user) return []

  const workflows = await db.workflows.findMany({
    where: { userId: user.id },
  })
  return workflows
}

export const onFlowPublish = async (workflowId: string, state: boolean) => {
  const updated = await db.workflows.update({
    where: { id: workflowId },
    data: { publish: state },
  })
  return updated.publish ? 'Workflow published' : 'Workflow unpublished'
}
