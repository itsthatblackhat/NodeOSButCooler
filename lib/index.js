/**
 * NodeOS
 *
 * @copyright 2013-2017 Jacob Groundwater, Jesús Leganés-Combarro 'piranna'
 *  and other contributors
 *
 * @license MIT
 */

const fs        = require('fs');
const join      = require('path').join;
const spawnSync = require('child_process').spawnSync;
const wow64     = require('../wow64/wow64.js');
const csrss     = require('../subsys/csrss.js');
const pnp       = require('../pnp/pnp.js');
const shell     = require('../shell/shell.js');
const loader    = require('../loader/loader.js');
const processArguments = require('nodeos-barebones/scripts/processArguments');

function checkKvm(qemuBin) {
  let contents = ""

  try {
    contents = fs.readFileSync('/proc/cpuinfo')
  } catch(e) {
    if(e.code !== 'ENOENT') throw(e)

    return false
  }

  if(! /(vmx|svm|0xc0f)/.test(contents)) return false

  // We have support for KVM, let's see if QEmu has permissions to use it
  try {
    spawnSync(qemuBin, ['-nographic'], {timeout: 1000})
  } catch(e) {
    return true
  }
}

function prepareCommandLine(argv, output) {
  const args = processArguments(argv)
  const link = fs.readlinkSync('out/latest').split('/') || []

  const cpu_family = args.cpu_family || link[link.length-3]
  const machine    = args.machine    || link[link.length-2]
  const platform   = args.platform   || link[link.length-1]

  const cpu = args.cpu

  let command = 'qemu-system-'+cpu_family

  argv = [
    '-machine', machine,
    '-m', '256M',
    '-vga', 'std',
    '-net', 'nic',
    '-net', 'user,id=eth0,hostfwd=tcp::50080-:80',
    '-net', 'user,id=eth1,hostfwd=tcp::50443-:443'
  ]

  switch(output) {
    case 'curses'   : argv.push('-curses')   ; break
    case 'nographic': argv.push('-nographic'); break
  }

  // check if kvm is supported
  let timeout_rate = 1

  function qemuKvm() {
    if(checkKvm(command)) {
      argv.push('-enable-kvm')
      timeout_rate = 0.1
    }
  }

  // CWD
  const cwd = join('out', cpu_family, machine, platform)

  switch(platform) {
    case 'disk':
      qemuKvm()
      argv.push('-hda', 'disk.img')
      break

    case 'docker':
      command = 'docker'
      argv = [
        'run', '-it',
        '--cap-add', 'SYS_ADMIN',
        '--security-opt=apparmor:unconfined',
        '--device', '/dev/fuse',
        'nodeos/nodeos',
        // '-v', 'usersfs:/tmp'
      ]
      break

    case 'img':
      qemuKvm()
      argv.push('-hda', 'bootfs.img',
          '-hdb', 'usersfs.img')
      break

    case 'iso':
      qemuKvm()
      argv.push('-cdrom', 'bootfs.iso',
          '-hda'  , 'usersfs.img')
      break

    case 'qemu':
      qemuKvm()
      const append = [
        'root=/dev/sda',
        'ip=dhcp'
      ]

      switch(output) {
        case 'nographic':
          append.push('console=ttyS0')  // redirect to terminal
          break
        case 'curses':
          append.push('vga=extended')  // 80x50
          break
        default:
          append.push('vga=0x344')  // 1024x768x32
      }

      argv.push('--kernel', 'kernel',
          '--initrd', 'initramfs.cpio.gz',
          '-drive',   `file=usersfs.img,format=raw,index=0`,
          '-append', append.join(' '))
      break

    case 'tar':
    case 'vagga':
      break

    default:
      throw 'Unknown platform "'+platform+'"'
  }

  return {command, argv, cwd, platform, timeout_rate}
}

// NodeOS initialization function
function NodeOS_Init() {
  // Initialize WOW64
  const wow64Info = wow64.initializeWow64Info();
  let context = {}; // Example context object
  wow64.initializeWow64Loader(context);

  // Initialize subsystems
  csrss.initializeCsrss();
  pnp.initializePnp();
  shell.initializeShell();

  // Load and run an example executable
  loader.loadExecutable("path/to/executable.exe");

  console.log("NodeOS initialization complete");
}

// Export the initialization function
module.exports = prepareCommandLine;

// Initialize NodeOS
NodeOS_Init();
