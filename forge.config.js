module.exports = {
  packagerConfig: { icon: 'favicon' },
  rebuildConfig: {},
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      config: {
        name: 'persona_app',
        setupExe: 'Persona App Setup.exe',
        setupIcon: 'favicon.ico',
        authors: 'Abhay Tiwari',
        description: 'Persona Desktop App with client, photographer, and editor platform'
      }
    },
    { name: '@electron-forge/maker-zip' }
  ]
};
