const electronInstaller = require('electron-winstaller');

const start = async () => {
  // NB: Use this syntax within an async function, Node does not have support for
  //     top-level await as of Node 12.
  try {
    await electronInstaller.createWindowsInstaller({
      appDirectory: 'D:/Dev/vlues-image-generator/valuesgenbuild',
      outputDirectory: 'D:/Dev/build/valuesgenerator',
      authors: 'Eddy Brown',
      exe: 'valuesgenerator.exe',
      name: 'valuesgenerator',
      version: '0.0.1'
    });
    console.log('It worked!');
  } catch (e) {
    console.log(`No dice: ${e.message}`);
  }
};

start();