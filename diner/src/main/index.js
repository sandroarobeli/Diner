/* eslint-disable no-unused-vars */
import { app, shell, BrowserWindow, ipcMain } from 'electron'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import { join } from 'path'
import fs from 'fs'
import icon from '../../resources/icon.png?asset'

const readFile = async (filePath) => {
  try {
    const data = await fs.promises.readFile(filePath)
    return data
  } catch (error) {
    console.error(`Got an error trying to read the file: ${error.message}`)
  }
}

// readFile('src/main/data/members.json')

// ipcMain.handle('list:members', async () => {
//   try {
//     // const members = await readFile('data/members.json')
//     const members = await readFile('data/members.json')
//     console.log('from main: ', members.toString())
//     return members.toString()
//   } catch (error) {
//     console.error(error)
//     return error
//   }
// })
// console.log('process.cwd(): ', process.cwd())
// console.log('join-dirname: ', join(__dirname, './data/members.json'))

// ipcMain.on('save:data', async (event, { id, name, age }) => {
//   fs.readFile('members.json', (error, data) => {
//     if (error) throw new Error(`Error from read: ${error}`)
//     // Buffer.from(JSON.stringify(members))
//     const members = JSON.parse(data)
//     members.push({ id, name, age })
//     fs.writeFile(
//       join(__dirname, './data/members.json'),
//       Buffer.from(JSON.stringify(members)),
//       (error) => {
//         if (error) throw new Error(`Error from write: ${error}`)
//         console.log('File written successfully')
//       }
//     )
//   })
// })

function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1065,
    height: 800,
    minWidth: 900,
    minHeight: 670,
    title: 'Diner',
    icon: join(__dirname, '../../resources/icon32.png'),
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  // Opens devtools in the window in development environment
  // if (is.dev) {
  //   mainWindow.webContents.openDevTools()
  // }
  // CHANGE TO CONDITIONAL DEPLOYMENT ABOVE
  mainWindow.webContents.openDevTools()

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
