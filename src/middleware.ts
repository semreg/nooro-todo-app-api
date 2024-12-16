import { NextFunction, Request, Response } from 'express'
import { taskSchema } from './validation.js'
import * as Yup from 'yup'

import prisma from './prisma.js'

export const validateTask = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await taskSchema.validate(req.body)

    next()
  } catch (error) {
    res.status(400).json({ error: (error as Yup.ValidationError).message })
  }
}

export const checkIfTaskExists = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const taskId = Number.parseInt(req.params.id, 10)

    if (Number.isNaN(taskId)) {
      res
        .status(400)
        .json({ error: 'Invalid task ID format. Must be an integer.' })
      return
    }

    const task = await prisma.task.findUnique({ where: { id: taskId } })

    if (!task) {
      res.status(404).json({ error: 'Task not found.' })

      return
    }

    next()
  } catch (error) {
    console.error('Error checking task existence:', error)

    res.status(500)
  }
}
