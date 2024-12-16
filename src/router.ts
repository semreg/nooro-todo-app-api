import express, { Request, Response } from 'express'
import prisma from './prisma.js'
import { checkIfTaskExists, validateTask } from './middleware.js'
import { TaskRequest } from './types.js'

const router = express.Router()

router.get('/', async (_, res) => {
  const tasks = await prisma.task.findMany()

  res.json(tasks)
})

router.get('/:id', checkIfTaskExists, async (req, res) => {
  const task = await prisma.task.findUnique({
    where: { id: Number.parseInt(req.params.id, 10) },
  })

  res.json(task)
})

router.post('/', validateTask, async (req: Request, res: Response) => {
  const newTask: TaskRequest = req.body

  const task = await prisma.task.create({ data: newTask })

  res.json(task)
})

router.put(
  '/:id',
  checkIfTaskExists,
  validateTask,
  async (req: Request, res: Response) => {
    try {
      const taskId = Number.parseInt(req.params.id, 10)
      const { title, color, isCompleted } = req.body

      const updatedTask = await prisma.task.update({
        where: { id: taskId },
        data: { title, color, isCompleted },
      })

      res.json(updatedTask)
    } catch (error) {
      console.error('Error updating task:', error)
      res
        .status(500)
        .json({ error: 'An error occurred while updating the task.' })
    }
  }
)

router.delete(
  '/:id',
  checkIfTaskExists,
  async (req: Request, res: Response) => {
    const taskId = Number.parseInt(req.params.id, 10)

    // Perform deletion
    await prisma.task.delete({ where: { id: taskId } })

    res.status(200).json({ message: 'Task deleted successfully.' })
  }
)

export default router
