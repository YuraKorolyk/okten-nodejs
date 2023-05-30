const fs = require('fs/promises');
const path = require('path');

(async () => {
    try {
        await fs.mkdir(path.join(__dirname, 'folder_main'))
        for (let i = 0; i < 5; i++) {
           await fs.mkdir(path.join(__dirname, 'folder_main', `folder${i+1}`))
           await fs.writeFile(path.join(__dirname, 'folder_main', `file${i+1}.txt`), `file number ${i+1}`)
        }
        await readDir()
    }
    catch (err) {
        throw new Error(err.message)
    }
})();
const readDir = async () =>  {
    try {
        const data = await fs.readdir(path.join(__dirname, 'folder_main'), { withFileTypes: true });
        data.forEach(item => {
            if (item.isDirectory()) {
                console.log(`FOLDER: ${item.name}`);
            } else {
                console.log(`FILE: ${item.name}`);
            }
        });

    } catch (err) {
        throw new Error(err.message);
    }
};


