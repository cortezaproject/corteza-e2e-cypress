import * as fs from 'fs'
import { Client } from 'pg'

const DIR_PROVISION = 'cypress/provision'

export const seedDb = async ({ list, dbDsn }) => {
  const client = new Client(dbDsn)
  
  return new Promise(async (resolve, reject) => {
    await client.connect()

    try {
      for (const l of list) {
        await client.query(fs.readFileSync(findProvisioning(l), 'utf8'))
      }

      client.end()
      return resolve('finish')
    } catch (e) {
      client.end()
      return reject(e)
    }
  })
}

const findProvisioning = (file) => {
  if (!fs.existsSync(`${DIR_PROVISION}/${file}.sql`)) {
    return null
  }

  return `${DIR_PROVISION}/${file}.sql`
}
