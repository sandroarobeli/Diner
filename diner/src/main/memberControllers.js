import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import fs from 'fs'

const filePath = 'data/members.json'

export const listMembers = async () => {
  try {
    const data = await fs.promises.readFile(filePath)
    return data
  } catch (error) {
    console.error(`Error trying to read members file: ${error.message}`)
  }
}

export const login = async (id, password, key) => {
  try {
    const data = await fs.promises.readFile(filePath)
    const members = JSON.parse(data)
    const existingMember = members.find((member) => member.id === id)
    if (!existingMember) {
      throw new Error('Team member not found')
    }

    let isValidPassword = false
    try {
      isValidPassword = await bcrypt.compare(password, existingMember.password)
    } catch (error) {
      throw new Error('Login failed. Password comparison error')
    }

    if (!isValidPassword) {
      throw new Error('Login failed. Invalid password')
    }

    let token
    try {
      token = jwt.sign({ memberId: existingMember.id }, key)
    } catch (error) {
      throw new Error('Login failed. Token generation error')
    }

    return {
      id: existingMember.id,
      name: existingMember.name,
      isAdmin: existingMember.isAdmin,
      token: token
    }
  } catch (error) {
    console.error(error)
  }
}

export const logout = async (id, password) => {
  try {
    // TEST BEGIN
    const data = await fs.promises.readFile(filePath)
    const members = JSON.parse(data)
    const loggedInMember = members.find((member) => member.id === id)
    // TEST END
    //
    // const loggedInMember = await client.member.findUnique({
    //   where: { id: id }
    // })
    //
    if (!loggedInMember) {
      throw new Error('Team member not found.')
    }

    let isValidPassword = false
    try {
      isValidPassword = await bcrypt.compare(password, loggedInMember.password)
    } catch (error) {
      throw new Error('Logout failed. Password comparison error')
    }

    if (!isValidPassword) {
      throw new Error('Logout failed. Invalid password')
    }

    return loggedInMember.name
  } catch (error) {
    console.error(error)
  }
}
