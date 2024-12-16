import { Task } from '@prisma/client'

export type TaskRequest = Omit<Task, 'id' | 'createdAt' | 'updatedAt'>

export type TaskResponse = Task
