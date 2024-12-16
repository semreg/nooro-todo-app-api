import dotenv from 'dotenv'

import app from './app.js'
import prisma from './prisma.js'

dotenv.config()

const port = process.env.PORT

async function main() {
  app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`)
  })
}

try {
  await main()
} catch (error) {
  console.error('An error occurred:', error)

  throw error
} finally {
  await prisma.$disconnect()
}
