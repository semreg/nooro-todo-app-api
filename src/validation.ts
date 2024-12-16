import * as Yup from 'yup'
import { TaskRequest } from './types.js'

export const taskSchema: Yup.ObjectSchema<TaskRequest> = Yup.object({
  title: Yup.string().required(),
  color: Yup.string()
    .oneOf(
      [
        'RED',
        'ORANGE',
        'YELLOW',
        'GREEN',
        'BLUE',
        'VIOLET',
        'PURPLE',
        'MAROON',
        'BROWN',
      ],
      'Invalid color value'
    )
    .required(),
  isCompleted: Yup.boolean().required(),
})
