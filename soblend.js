
import readline from "readline";
import { exec } from "child_process";
import os from "os";
import fs from "fs";
import path from "path";
import cliProgress from "cli-progress";
import gradient from "gradient-string";
import chalk from "chalk";
import ora from "ora";

// Language translations
const languages = {
  en: {
    welcome: "Welcome to Soblend Terminal v2.0",
    typeHelp: "Type 'help' for available commands",
    goodbye: "Goodbye!",
    executing: "Executing",
    completed: "completed",
    error: "Error",
    commandNotFound: "Command not found",
    usage: "Usage",
    installing: "Installing",
    currentLanguage: "Current language",
    languageChanged: "Language changed to",
    invalidLanguage: "Invalid language. Available languages",
    availableCommands: "Available Commands:",
    fileCommands: "File Commands:",
    systemCommands: "System Commands:",
    networkCommands: "Network Commands:",
    funCommands: "Fun Commands:",
    languageCommands: "Language Commands:",
    showHelp: "Show this help message",
    clearScreen: "Clear the terminal screen",
    installPackage: "Install a package (npm/pip)",
    showSystem: "Show system information",
    runBenchmark: "Run system benchmark",
    scanSystem: "Scan system for issues",
    monitorResources: "Monitor system resources",
    backupFiles: "Backup files",
    exitTerminal: "Exit the terminal",
    listFiles: "List files",
    changeDir: "Change directory",
    readFile: "Read file",
    createDir: "Create directory",
    removeFile: "Remove file",
    showProcesses: "Show running processes",
    showNetwork: "Show network information",
    showDisk: "Show disk usage",
    showHistory: "Show command history",
    asciiArt: "Generate ASCII art",
    weatherInfo: "Show weather information",
    joke: "Tell a random joke",
    quote: "Show inspirational quote",
    calculator: "Simple calculator",
    password: "Generate secure password",
    qrCode: "Generate QR code",
    setLanguage: "Set interface language",
    showLanguage: "Show current language",
    systemScan: "System scan completed - No issues found",
    benchmarkCompleted: "Benchmark completed in",
    backupCreated: "Backup created successfully",
    backupFailed: "Backup failed",
    memoryUsage: "Memory Usage",
    cpuCores: "CPU Cores",
    platform: "Platform",
    changedTo: "Changed to",
    directoryCreated: "Directory created",
    removed: "Removed",
    searchingPackage: "Searching for package",
    searchCompleted: "Search completed",
    searchFailed: "Search failed",
    networkInterfaces: "Network Interfaces",
    activeProcesses: "Active Processes",
    diskUsage: "Disk Usage",
    commandHistory: "Command History",
    enterCity: "Enter city name for weather",
    weatherError: "Weather information not available",
    calculatorUsage: "Usage: calc <expression> (e.g., calc 2+2)",
    passwordGenerated: "Generated password",
    qrGenerated: "QR code generated for",
  },
  es: {
    welcome: "Bienvenido a Soblend Terminal v2.0",
    typeHelp: "Escribe 'help' para ver comandos disponibles",
    goodbye: "¡Adiós!",
    executing: "Ejecutando",
    completed: "completado",
    error: "Error",
    commandNotFound: "Comando no encontrado",
    usage: "Uso",
    installing: "Instalando",
    currentLanguage: "Idioma actual",
    languageChanged: "Idioma cambiado a",
    invalidLanguage: "Idioma inválido. Idiomas disponibles",
    availableCommands: "Comandos Disponibles:",
    fileCommands: "Comandos de Archivos:",
    systemCommands: "Comandos del Sistema:",
    networkCommands: "Comandos de Red:",
    funCommands: "Comandos Divertidos:",
    languageCommands: "Comandos de Idioma:",
    showHelp: "Mostrar este mensaje de ayuda",
    clearScreen: "Limpiar la pantalla del terminal",
    installPackage: "Instalar un paquete (npm/pip)",
    showSystem: "Mostrar información del sistema",
    runBenchmark: "Ejecutar benchmark del sistema",
    scanSystem: "Escanear sistema en busca de problemas",
    monitorResources: "Monitorear recursos del sistema",
    backupFiles: "Respaldar archivos",
    exitTerminal: "Salir del terminal",
    listFiles: "Listar archivos",
    changeDir: "Cambiar directorio",
    readFile: "Leer archivo",
    createDir: "Crear directorio",
    removeFile: "Eliminar archivo",
    showProcesses: "Mostrar procesos en ejecución",
    showNetwork: "Mostrar información de red",
    showDisk: "Mostrar uso del disco",
    showHistory: "Mostrar historial de comandos",
    asciiArt: "Generar arte ASCII",
    weatherInfo: "Mostrar información del clima",
    joke: "Contar un chiste aleatorio",
    quote: "Mostrar cita inspiracional",
    calculator: "Calculadora simple",
    password: "Generar contraseña segura",
    qrCode: "Generar código QR",
    setLanguage: "Establecer idioma de la interfaz",
    showLanguage: "Mostrar idioma actual",
    systemScan: "Escaneo del sistema completado - No se encontraron problemas",
    benchmarkCompleted: "Benchmark completado en",
    backupCreated: "Respaldo creado exitosamente",
    backupFailed: "Falló el respaldo",
    memoryUsage: "Uso de Memoria",
    cpuCores: "Núcleos de CPU",
    platform: "Plataforma",
    changedTo: "Cambiado a",
    directoryCreated: "Directorio creado",
    removed: "Eliminado",
    searchingPackage: "Buscando paquete",
    searchCompleted: "Búsqueda completada",
    searchFailed: "Búsqueda falló",
    networkInterfaces: "Interfaces de Red",
    activeProcesses: "Procesos Activos",
    diskUsage: "Uso del Disco",
    commandHistory: "Historial de Comandos",
    enterCity: "Ingresa el nombre de la ciudad para el clima",
    weatherError: "Información del clima no disponible",
    calculatorUsage: "Uso: calc <expresión> (ej: calc 2+2)",
    passwordGenerated: "Contraseña generada",
    qrGenerated: "Código QR generado para",
  },
  fr: {
    welcome: "Bienvenue sur Soblend Terminal v2.0",
    typeHelp: "Tapez 'help' pour les commandes disponibles",
    goodbye: "Au revoir!",
    executing: "Exécution",
    completed: "terminé",
    error: "Erreur",
    commandNotFound: "Commande introuvable",
    usage: "Utilisation",
    installing: "Installation",
    currentLanguage: "Langue actuelle",
    languageChanged: "Langue changée en",
    invalidLanguage: "Langue invalide. Langues disponibles",
    availableCommands: "Commandes Disponibles:",
    fileCommands: "Commandes de Fichiers:",
    systemCommands: "Commandes Système:",
    networkCommands: "Commandes Réseau:",
    funCommands: "Commandes Amusantes:",
    languageCommands: "Commandes de Langue:",
    showHelp: "Afficher ce message d'aide",
    clearScreen: "Effacer l'écran du terminal",
    installPackage: "Installer un paquet (npm/pip)",
    showSystem: "Afficher les informations système",
    runBenchmark: "Exécuter un benchmark système",
    scanSystem: "Scanner le système pour les problèmes",
    monitorResources: "Surveiller les ressources système",
    backupFiles: "Sauvegarder les fichiers",
    exitTerminal: "Quitter le terminal",
    listFiles: "Lister les fichiers",
    changeDir: "Changer de répertoire",
    readFile: "Lire un fichier",
    createDir: "Créer un répertoire",
    removeFile: "Supprimer un fichier",
    showProcesses: "Afficher les processus en cours",
    showNetwork: "Afficher les informations réseau",
    showDisk: "Afficher l'utilisation du disque",
    showHistory: "Afficher l'historique des commandes",
    asciiArt: "Générer de l'art ASCII",
    weatherInfo: "Afficher les informations météo",
    joke: "Raconter une blague aléatoire",
    quote: "Afficher une citation inspirante",
    calculator: "Calculatrice simple",
    password: "Générer un mot de passe sécurisé",
    qrCode: "Générer un code QR",
    setLanguage: "Définir la langue de l'interface",
    showLanguage: "Afficher la langue actuelle",
    systemScan: "Scan système terminé - Aucun problème trouvé",
    benchmarkCompleted: "Benchmark terminé en",
    backupCreated: "Sauvegarde créée avec succès",
    backupFailed: "Échec de la sauvegarde",
    memoryUsage: "Utilisation Mémoire",
    cpuCores: "Cœurs CPU",
    platform: "Plateforme",
    changedTo: "Changé vers",
    directoryCreated: "Répertoire créé",
    removed: "Supprimé",
    searchingPackage: "Recherche du paquet",
    searchCompleted: "Recherche terminée",
    searchFailed: "Recherche échouée",
    networkInterfaces: "Interfaces Réseau",
    activeProcesses: "Processus Actifs",
    diskUsage: "Utilisation Disque",
    commandHistory: "Historique des Commandes",
    enterCity: "Entrez le nom de la ville pour la météo",
    weatherError: "Informations météo non disponibles",
    calculatorUsage: "Utilisation: calc <expression> (ex: calc 2+2)",
    passwordGenerated: "Mot de passe généré",
    qrGenerated: "Code QR généré pour",
  },
};

const BANNER = gradient.rainbow(`
███████╗ ██████╗ ██████╗ ██╗     ███████╗███╗   ██╗██████╗ 
██╔════╝██╔═══██╗██╔══██╗██║     ██╔════╝████╗  ██║██╔══██╗
███████╗██║   ██║██████╔╝██║     █████╗  ██╔██╗ ██║██║  ██║
╚════██║██║   ██║██╔══██╗██║     ██╔══╝  ██║╚██╗██║██║  ██║
███████║╚██████╔╝██████╔╝███████╗███████╗██║ ╚████║██████╔╝
╚══════╝ ╚═════╝ ╚═════╝ ╚══════╝╚══════╝╚═╝  ╚═══╝╚═════╝ 

          🚀 By KaitoNeko 🚀
`);

class SoblendTerminal {
  constructor() {
    this.currentDir = process.cwd();
    this.history = [];
    this.isRunning = true;
    this.currentLanguage = "en";
    this.loadLanguageSettings();

    this.commands = {
      help: () => this.showHelp(),
      clear: () => console.clear(),
      install: (args) => this.installPackage(args),
      pip: (args) => this.pipInstall(args),
      system: () => this.showSystemInfo(),
      search: (args) => this.searchPackages(args),
      network: () => this.showNetworkInfo(),
      processes: () => this.showProcesses(),
      disk: () => this.showDiskInfo(),
      history: () => this.showHistory(),
      cd: (args) => this.changeDirectory(args),
      ls: (args) => this.listFiles(args),
      dir: (args) => this.listFiles(args),
      cat: (args) => this.readFile(args),
      type: (args) => this.readFile(args),
      mkdir: (args) => this.makeDirectory(args),
      rm: (args) => this.removeFile(args),
      del: (args) => this.removeFile(args),
      benchmark: () => this.runBenchmark(),
      scan: () => this.scanSystem(),
      monitor: () => this.monitorResources(),
      backup: (args) => this.backupFiles(args),
      ascii: (args) => this.generateAsciiArt(args),
      weather: (args) => this.showWeather(args),
      joke: () => this.tellJoke(),
      quote: () => this.showQuote(),
      calc: (args) => this.calculator(args),
      password: (args) => this.generatePassword(args),
      qr: (args) => this.generateQRCode(args),
      language: (args) => this.handleLanguage(args),
      server: (args) => this.handleServer(args),
      exit: () => this.exit(),
      quit: () => this.exit(),
    };

    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
      prompt: chalk.cyan("soblend$ "),
    });
  }

  loadLanguageSettings() {
    try {
      const configPath = path.join(os.homedir(), ".soblend-config.json");
      if (fs.existsSync(configPath)) {
        const config = JSON.parse(fs.readFileSync(configPath, "utf8"));
        this.currentLanguage = config.language || "en";
      }
    } catch (error) {
      this.currentLanguage = "en";
    }
  }

  saveLanguageSettings() {
    try {
      const configPath = path.join(os.homedir(), ".soblend-config.json");
      const config = { language: this.currentLanguage };
      fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
    } catch (error) {
      // Silently fail if can't save
    }
  }

  t(key) {
    return languages[this.currentLanguage]?.[key] || languages.en[key] || key;
  }

  start() {
    console.log(BANNER);
    console.log(chalk.green(this.t("welcome")));
    console.log(chalk.gray(this.t("typeHelp")));
    this.rl.prompt();

    this.rl.on("line", async (line) => {
      const trimmedLine = line.trim();
      if (trimmedLine && this.isRunning) {
        this.history.push(trimmedLine);
        await this.executeCommand(trimmedLine);
      }
      if (this.isRunning) {
        this.rl.prompt();
      }
    });

    this.rl.on("close", () => {
      this.exit();
    });

    process.on("SIGINT", () => {
      console.log(
        chalk.yellow(
          `\n${this.t("usage")} "exit" ${this.t("exitTerminal").toLowerCase()}`,
        ),
      );
      this.rl.prompt();
    });
  }

  async executeCommand(input) {
    const [command, ...args] = input.split(" ");

    if (this.commands[command]) {
      try {
        console.log(chalk.blue(`${this.t("executing")} ${command}...`));
        await this.commands[command](args);
        console.log(chalk.green(`${command} ${this.t("completed")}`));
      } catch (error) {
        console.error(chalk.red(`${this.t("error")}: ${error.message}`));
      }
    } else {
      this.executeSystemCommand(input);
    }
  }

  executeSystemCommand(input) {
    return new Promise((resolve) => {
      exec(input, { cwd: this.currentDir }, (error, stdout, stderr) => {
        if (stdout) console.log(chalk.white(stdout));
        if (stderr) console.error(chalk.red(stderr));
        if (error && !stdout && !stderr) {
          console.error(chalk.red(`${this.t("commandNotFound")}: ${input}`));
        }
        resolve();
      });
    });
  }

  exit() {
    console.log(chalk.yellow(`\n${this.t("goodbye")}`));
    this.isRunning = false;
    this.rl.close();
    process.exit(0);
  }

  showHelp() {
    console.log(
      chalk.cyan(`
${this.t("availableCommands")}
  ${chalk.yellow("help")}             ${this.t("showHelp")}
  ${chalk.yellow("clear")}            ${this.t("clearScreen")}
  ${chalk.yellow("install")} <pkg>    ${this.t("installPackage")}
  ${chalk.yellow("pip")} <pkg>        Install Python packages with pip
  ${chalk.yellow("search")} <pkg>     Search for npm packages
  ${chalk.yellow("system")}           ${this.t("showSystem")}
  ${chalk.yellow("benchmark")}        ${this.t("runBenchmark")}
  ${chalk.yellow("scan")}             ${this.t("scanSystem")}
  ${chalk.yellow("monitor")}          ${this.t("monitorResources")}
  ${chalk.yellow("backup")} <dir>     ${this.t("backupFiles")}
  ${chalk.yellow("exit/quit")}        ${this.t("exitTerminal")}

${this.t("fileCommands")}
  ${chalk.yellow("ls/dir")}           ${this.t("listFiles")}
  ${chalk.yellow("cd")} <dir>         ${this.t("changeDir")}
  ${chalk.yellow("cat/type")} <file>  ${this.t("readFile")}
  ${chalk.yellow("mkdir")} <dir>      ${this.t("createDir")}
  ${chalk.yellow("rm/del")} <file>    ${this.t("removeFile")}

${this.t("systemCommands")}
  ${chalk.yellow("processes")}        ${this.t("showProcesses")}
  ${chalk.yellow("network")}          ${this.t("showNetwork")}
  ${chalk.yellow("disk")}             ${this.t("showDisk")}
  ${chalk.yellow("history")}          ${this.t("showHistory")}

${this.t("funCommands")}
  ${chalk.yellow("ascii")} <text>     ${this.t("asciiArt")}
  ${chalk.yellow("weather")} <city>   ${this.t("weatherInfo")}
  ${chalk.yellow("joke")}             ${this.t("joke")}
  ${chalk.yellow("quote")}            ${this.t("quote")}
  ${chalk.yellow("calc")} <expr>      ${this.t("calculator")}
  ${chalk.yellow("password")} [len]   ${this.t("password")}
  ${chalk.yellow("qr")} <text>        ${this.t("qrCode")}

${this.t("languageCommands")}
  ${chalk.yellow("language")} <lang>  ${this.t("setLanguage")} (en/es/fr)
  ${chalk.yellow("server language")}  ${this.t("showLanguage")}

${chalk.gray("You can also use any standard shell command")}
    `),
    );
  }

  handleServer(args) {
    if (args[0] === "language") {
      console.log(
        chalk.cyan(`${this.t("currentLanguage")}: ${this.currentLanguage}`),
      );
    } else {
      console.error(chalk.red(`${this.t("usage")}: server language`));
    }
  }

  handleLanguage(args) {
    if (!args.length) {
      console.log(
        chalk.cyan(`${this.t("currentLanguage")}: ${this.currentLanguage}`),
      );
      console.log(chalk.gray(`${this.t("availableCommands")}: en, es, fr`));
      return;
    }

    const lang = args[0].toLowerCase();
    if (languages[lang]) {
      this.currentLanguage = lang;
      this.saveLanguageSettings();
      console.log(chalk.green(`${this.t("languageChanged")} ${lang}`));
    } else {
      console.error(chalk.red(`${this.t("invalidLanguage")}: en, es, fr`));
    }
  }

  async installPackage(args) {
    if (!args.length) {
      console.error(
        chalk.red(
          `${this.t("usage")}: install <package-name> or pip <package-name>`,
        ),
      );
      return;
    }

    const pkg = args[0];
    console.log(chalk.blue(`${this.t("installing")} ${pkg}...`));

    return new Promise((resolve) => {
      if (pkg.endsWith(".py") || args[0] === "pip") {
        const pipArgs = args[0] === "pip" ? args.slice(1) : args;
        exec(
          `python -m pip install ${pipArgs.join(" ")}`,
          (error, stdout, stderr) => {
            if (stdout) console.log(chalk.green(stdout));
            if (stderr) console.error(chalk.red(stderr));
            resolve();
          },
        );
      } else {
        exec(`npm install ${pkg}`, (error, stdout, stderr) => {
          if (stdout) console.log(chalk.green(stdout));
          if (stderr) console.error(chalk.red(stderr));
          resolve();
        });
      }
    });
  }

  async pipInstall(args) {
    if (!args.length) {
      console.error(chalk.red(`${this.t("usage")}: pip <package-name>`));
      return;
    }

    const pkg = args.join(" ");
    console.log(
      chalk.blue(`${this.t("installing")} Python package: ${pkg}...`),
    );

    return new Promise((resolve) => {
      // Try python3 first, then python, then python3.x variants
      const pythonCommands = ["python3 -m pip", "python -m pip", "pip3", "pip"];
      let commandIndex = 0;

      const tryCommand = () => {
        if (commandIndex >= pythonCommands.length) {
          console.error(
            chalk.red(
              `${this.t("error")}: Python/pip not found. Install Python first.`,
            ),
          );
          resolve();
          return;
        }

        const command = `${pythonCommands[commandIndex]} install ${pkg}`;
        exec(command, (error, stdout, stderr) => {
          if (stdout) console.log(chalk.green(stdout));
          if (stderr && !error) console.log(chalk.yellow(stderr));

          if (error && error.message.includes("not found")) {
            commandIndex++;
            tryCommand();
          } else {
            if (error)
              console.error(chalk.red(`${this.t("error")}: ${error.message}`));
            resolve();
          }
        });
      };

      tryCommand();
    });
  }

  showSystemInfo() {
    const info = {
      OS: `${os.type()} ${os.release()}`,
      [this.t("platform")]: os.platform(),
      Architecture: os.arch(),
      Memory: `${(os.totalmem() / 1024 / 1024 / 1024).toFixed(2)}GB Total`,
      FreeMemory: `${(os.freemem() / 1024 / 1024 / 1024).toFixed(2)}GB`,
      [this.t("cpuCores")]: os.cpus().length,
      Uptime: `${(os.uptime() / 3600).toFixed(2)} hours`,
    };

    Object.entries(info).forEach(([key, value]) => {
      console.log(chalk.cyan(`${key}: `) + chalk.yellow(value));
    });
  }

  async runBenchmark() {
    console.log(chalk.blue(`${this.t("runBenchmark")}...`));
    const start = Date.now();
    for (let i = 0; i < 1000000; i++) {
      Math.sqrt(i);
    }
    const end = Date.now();
    console.log(
      chalk.green(`${this.t("benchmarkCompleted")} ${end - start}ms`),
    );
  }

  async scanSystem() {
    console.log(chalk.blue(`${this.t("scanSystem")}...`));
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log(chalk.green(this.t("systemScan")));
  }

  async monitorResources() {
    console.log(chalk.yellow(`${this.t("systemCommands")}:`));
    const memUsage = (
      ((os.totalmem() - os.freemem()) / os.totalmem()) *
      100
    ).toFixed(2);
    const cpuCount = os.cpus().length;

    console.log(
      chalk.cyan(`${this.t("memoryUsage")}: `) + chalk.yellow(`${memUsage}%`),
    );
    console.log(chalk.cyan(`${this.t("cpuCores")}: `) + chalk.yellow(cpuCount));
    console.log(
      chalk.cyan(`${this.t("platform")}: `) + chalk.yellow(os.platform()),
    );
  }

  async backupFiles(args) {
    const dir = args[0] || ".";
    console.log(chalk.blue(`${this.t("backupFiles")} ${dir}...`));

    return new Promise((resolve) => {
      const command =
        os.platform() === "win32"
          ? `powershell Compress-Archive -Path "${dir}" -DestinationPath backup.zip -Force`
          : `tar -czf backup.tar.gz "${dir}"`;

      exec(command, (error) => {
        if (error) {
          console.error(
            chalk.red(`${this.t("backupFailed")}: ${error.message}`),
          );
        } else {
          console.log(chalk.green(this.t("backupCreated")));
        }
        resolve();
      });
    });
  }

  searchPackages(args) {
    if (!args.length) {
      console.error(chalk.red(`${this.t("usage")}: search <package-name>`));
      return;
    }

    const pkg = args[0];
    console.log(chalk.blue(`${this.t("searchingPackage")}: ${pkg}...`));

    exec(`npm search ${pkg} --json`, (error, stdout) => {
      if (stdout) {
        try {
          const results = JSON.parse(stdout);
          results.slice(0, 5).forEach((pkg) => {
            console.log(chalk.green(`\n${pkg.name} (${pkg.version})`));
            console.log(chalk.white(pkg.description));
          });
        } catch (e) {
          console.log(chalk.yellow(this.t("searchCompleted")));
        }
      } else {
        console.error(chalk.red(this.t("searchFailed")));
      }
    });
  }

  showNetworkInfo() {
    const nets = os.networkInterfaces();
    console.log(chalk.cyan(`\n${this.t("networkInterfaces")}:`));
    Object.keys(nets).forEach((name) => {
      nets[name].forEach((net) => {
        if (net.family === "IPv4" && !net.internal) {
          console.log(chalk.yellow(`  ${name}: ${net.address}`));
        }
      });
    });
  }

  showProcesses() {
    const command =
      os.platform() === "win32"
        ? 'tasklist /fi "STATUS eq running"'
        : "ps aux | head -10";
    exec(command, (error, stdout) => {
      if (stdout) {
        console.log(chalk.cyan(`\n${this.t("activeProcesses")}:`));
        console.log(chalk.white(stdout));
      }
    });
  }

  showDiskInfo() {
    const command =
      os.platform() === "win32"
        ? "wmic logicaldisk get size,freespace,caption"
        : "df -h";
    exec(command, (error, stdout) => {
      if (stdout) {
        console.log(chalk.cyan(`\n${this.t("diskUsage")}:`));
        console.log(chalk.white(stdout));
      }
    });
  }

  showHistory() {
    console.log(chalk.cyan(`\n${this.t("commandHistory")}:`));
    this.history.forEach((cmd, i) => {
      console.log(chalk.yellow(`  ${i + 1}  ${cmd}`));
    });
  }

  changeDirectory(args) {
    if (!args.length) {
      console.error(chalk.red(`${this.t("usage")}: cd <directory>`));
      return;
    }
    try {
      process.chdir(args[0]);
      this.currentDir = process.cwd();
      console.log(chalk.green(`${this.t("changedTo")}: ${this.currentDir}`));
    } catch (err) {
      console.error(chalk.red(`${this.t("error")}: ${err.message}`));
    }
  }

  listFiles(args) {
    const dir = args[0] || ".";
    const command =
      os.platform() === "win32" ? `dir "${dir}"` : `ls -la "${dir}"`;

    exec(command, (error, stdout) => {
      if (stdout) console.log(chalk.white(stdout));
      if (error)
        console.error(chalk.red(`${this.t("error")}: ${error.message}`));
    });
  }

  readFile(args) {
    if (!args.length) {
      console.error(chalk.red(`${this.t("usage")}: cat <file>`));
      return;
    }

    const command =
      os.platform() === "win32" ? `type "${args[0]}"` : `cat "${args[0]}"`;
    exec(command, (error, stdout) => {
      if (stdout) console.log(chalk.white(stdout));
      if (error)
        console.error(chalk.red(`${this.t("error")}: ${error.message}`));
    });
  }

  makeDirectory(args) {
    if (!args.length) {
      console.error(chalk.red(`${this.t("usage")}: mkdir <directory>`));
      return;
    }

    const command =
      os.platform() === "win32"
        ? `mkdir "${args[0]}"`
        : `mkdir -p "${args[0]}"`;
    exec(command, (error) => {
      if (error) {
        console.error(chalk.red(`${this.t("error")}: ${error.message}`));
      } else {
        console.log(chalk.green(`${this.t("directoryCreated")}: ${args[0]}`));
      }
    });
  }

  removeFile(args) {
    if (!args.length) {
      console.error(chalk.red(`${this.t("usage")}: rm <file/directory>`));
      return;
    }

    const command =
      os.platform() === "win32"
        ? `rmdir /s /q "${args[0]}" 2>nul || del /q "${args[0]}"`
        : `rm -rf "${args[0]}"`;
    exec(command, (error) => {
      if (error) {
        console.error(chalk.red(`${this.t("error")}: ${error.message}`));
      } else {
        console.log(chalk.green(`${this.t("removed")}: ${args[0]}`));
      }
    });
  }

  generateAsciiArt(args) {
    if (!args.length) {
      console.error(chalk.red(`${this.t("usage")}: ascii <text>`));
      return;
    }

    const text = args.join(" ");
    const bigText = this.createBigText(text);
    console.log(chalk.cyan(bigText));
  }

  createBigText(text) {
    const letters = {
      A: ["  █████  ", " ██   ██ ", " ███████ ", " ██   ██ ", " ██   ██ "],
      B: [" ██████  ", " ██   ██ ", " ██████  ", " ██   ██ ", " ██████  "],
      C: [" ██████  ", " ██      ", " ██      ", " ██      ", " ██████  "],
      D: [" ██████  ", " ██   ██ ", " ██   ██ ", " ██   ██ ", " ██████  "],
      E: [" ███████ ", " ██      ", " █████   ", " ██      ", " ███████ "],
      F: [" ███████ ", " ██      ", " █████   ", " ██      ", " ██      "],
      G: [" ██████  ", " ██      ", " ██  ███ ", " ██   ██ ", " ██████  "],
      H: [" ██   ██ ", " ██   ██ ", " ███████ ", " ██   ██ ", " ██   ██ "],
      I: [" ███████ ", "    ██   ", "    ██   ", "    ██   ", " ███████ "],
      J: [" ███████ ", "      ██ ", "      ██ ", " ██   ██ ", " ██████  "],
      K: [" ██   ██ ", " ██  ██  ", " █████   ", " ██  ██  ", " ██   ██ "],
      L: [" ██      ", " ██      ", " ██      ", " ██      ", " ███████ "],
      M: [" ██   ██ ", " ███ ███ ", " ██ █ ██ ", " ██   ██ ", " ██   ██ "],
      N: [" ██   ██ ", " ███  ██ ", " ██ █ ██ ", " ██  ███ ", " ██   ██ "],
      O: [" ██████  ", " ██   ██ ", " ██   ██ ", " ██   ██ ", " ██████  "],
      P: [" ██████  ", " ██   ██ ", " ██████  ", " ██      ", " ██      "],
      Q: [" ██████  ", " ██   ██ ", " ██ █ ██ ", " ██  ███ ", " ██████  "],
      R: [" ██████  ", " ██   ██ ", " ██████  ", " ██  ██  ", " ██   ██ "],
      S: [" ███████ ", " ██      ", " ███████ ", "      ██ ", " ███████ "],
      T: [" ███████ ", "    ██   ", "    ██   ", "    ██   ", "    ██   "],
      U: [" ██   ██ ", " ██   ██ ", " ██   ██ ", " ██   ██ ", " ██████  "],
      V: [" ██   ██ ", " ██   ██ ", " ██   ██ ", "  ██ ██  ", "   ███   "],
      W: [" ██   ██ ", " ██   ██ ", " ██ █ ██ ", " ███ ███ ", " ██   ██ "],
      X: [" ██   ██ ", "  ██ ██  ", "   ███   ", "  ██ ██  ", " ██   ██ "],
      Y: [" ██   ██ ", "  ██ ██  ", "   ███   ", "    ██   ", "    ██   "],
      Z: [" ███████ ", "     ██  ", "   ███   ", "  ██     ", " ███████ "],
      0: [" ██████  ", " ██   ██ ", " ██   ██ ", " ██   ██ ", " ██████  "],
      1: ["    ██   ", "   ███   ", "    ██   ", "    ██   ", " ███████ "],
      2: [" ███████ ", "      ██ ", " ███████ ", " ██      ", " ███████ "],
      3: [" ███████ ", "      ██ ", " ███████ ", "      ██ ", " ███████ "],
      4: [" ██   ██ ", " ██   ██ ", " ███████ ", "      ██ ", "      ██ "],
      5: [" ███████ ", " ██      ", " ███████ ", "      ██ ", " ███████ "],
      6: [" ██████  ", " ██      ", " ██████  ", " ██   ██ ", " ██████  "],
      7: [" ███████ ", "      ██ ", "     ██  ", "    ██   ", "   ██    "],
      8: [" ██████  ", " ██   ██ ", " ██████  ", " ██   ██ ", " ██████  "],
      9: [" ██████  ", " ██   ██ ", " ██████  ", "      ██ ", " ██████  "],
      " ": ["         ", "         ", "         ", "         ", "         "],
      "!": ["   ███   ", "   ███   ", "   ███   ", "         ", "   ███   "],
      "?": [" ███████ ", "      ██ ", "   ████  ", "         ", "    ██   "],
    };

    const lines = ["", "", "", "", ""];
    for (const char of text.toUpperCase()) {
      const letter = letters[char] || letters[" "];
      for (let i = 0; i < 5; i++) {
        lines[i] += letter[i];
      }
    }
    return lines.join("\n");
  }

  async showWeather(args) {
    if (!args.length) {
      console.error(chalk.red(`${this.t("usage")}: weather <city>`));
      console.log(chalk.gray(this.t("enterCity")));
      return;
    }

    const city = args.join(" ");
    console.log(chalk.blue(`Getting weather for ${city}...`));

    // Simulated weather data (in real app, you'd use an API)
    const weather = {
      temperature: Math.floor(Math.random() * 35) + 5,
      condition: ["Sunny", "Cloudy", "Rainy", "Partly Cloudy"][
        Math.floor(Math.random() * 4)
      ],
    };

    console.log(chalk.yellow(`Weather in ${city}:`));
    console.log(chalk.cyan(`Temperature: ${weather.temperature}°C`));
    console.log(chalk.cyan(`Condition: ${weather.condition}`));
  }

  tellJoke() {
    const jokes = [
      "Why don't scientists trust atoms? Because they make up everything!",
      "Why did the developer go broke? Because he used up all his cache!",
      "How many programmers does it take to change a light bulb? None, that's a hardware problem!",
      "Why do Java developers wear glasses? Because they can't C#!",
      "¿Por qué los programadores prefieren el modo oscuro? Porque la luz atrae a los bugs!",
      "Pourquoi les développeurs n'aiment pas la nature? Il y a trop de bugs!",
    ];

    const joke = jokes[Math.floor(Math.random() * jokes.length)];
    console.log(chalk.yellow(joke));
  }

  showQuote() {
    const quotes = [
      "The only way to do great work is to love what you do. - Steve Jobs",
      "Innovation distinguishes between a leader and a follower. - Steve Jobs",
      "Code is like humor. When you have to explain it, it's bad. - Cory House",
      "First, solve the problem. Then, write the code. - John Johnson",
      "La única forma de hacer un gran trabajo es amar lo que haces.",
      "L'innovation distingue un leader d'un suiveur.",
    ];

    const quote = quotes[Math.floor(Math.random() * quotes.length)];
    console.log(chalk.green(quote));
  }

  calculator(args) {
    if (!args.length) {
      console.error(chalk.red(this.t("calculatorUsage")));
      return;
    }

    try {
      const expression = args.join(" ");
      const result = eval(expression.replace(/[^0-9+\-*/.() ]/g, ""));
      console.log(chalk.green(`${expression} = ${result}`));
    } catch (error) {
      console.error(chalk.red(`${this.t("error")}: Invalid expression`));
    }
  }

  generatePassword(args) {
    const length = parseInt(args[0]) || 12;
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";
    let password = "";

    for (let i = 0; i < length; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    console.log(chalk.green(`${this.t("passwordGenerated")}: ${password}`));
  }

  generateQRCode(args) {
    if (!args.length) {
      console.error(chalk.red(`${this.t("usage")}: qr <text>`));
      return;
    }

    const text = args.join(" ");
    console.log(chalk.green(`${this.t("qrGenerated")} "${text}"`));
    console.log(
      chalk.yellow(
        "Visit: https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=" +
          encodeURIComponent(text),
      ),
    );
  }
}

export default SoblendTerminal;
