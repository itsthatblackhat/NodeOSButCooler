const Shell = require('../shell/shell');
const EventManager = require('../events/event_manager');
const FileSystemManager = require('../filesys/filesystem_manager');

const eventManager = new EventManager();
const fileSystemManager = new FileSystemManager(eventManager);

const shell = new Shell(fileSystemManager);

shell.initialize();
