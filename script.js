// ===============================
// TERMINAL ANIMATION ONLY
// ===============================

// Initialize Terminal with Your Exact Content
function initTerminal() {
    const terminal = document.getElementById('terminal');
    const terminalBody = terminal.querySelector('.terminal-body');
    
    // Show terminal immediately
    terminal.style.display = 'block';
    
    // Start the exact sequence from your image
    startTerminalSequence(terminalBody);
}

function startTerminalSequence(terminalBody) {
    const output = terminalBody.querySelector('.output');
    
    // Clear initial messages
    output.innerHTML = '';
    
    // Exact sequence from your image
    const messages = [
        "[+] Initializing system...",
        "[+] Loading biodata...",
        "[+] Establishing connection...",
        "[+] Profile loaded: FARHAN AHMED MIAJEE",
        "[+] System: BAUSTK CSE Batch-03",
        "[+] Location: BNSB Eye Hospital, Khulna",
        "[+] Skills Matrix initialized...",
        "[+] Security Protocols: ACTIVE",
        "[+] Gaming Module: ONLINE",
        "[+] Creative Suite: READY",
        "[+] All systems operational...",
        "[>] Type 'help' for commands"
    ];
    
    let messageIndex = 0;
    let charIndex = 0;
    let currentDiv = null;
    
    function typeNextCharacter() {
        if (messageIndex < messages.length) {
            if (charIndex === 0) {
                // Create new message element
                currentDiv = document.createElement('div');
                currentDiv.className = 'output-line';
                output.appendChild(currentDiv);
                
                // Add slight delay before starting to type
                setTimeout(() => {
                    typeCharacter();
                }, 100);
            } else {
                typeCharacter();
            }
        } else {
            // Show command prompt with blinking cursor
            showCommandPrompt();
        }
    }
    
    function typeCharacter() {
        if (charIndex < messages[messageIndex].length) {
            currentDiv.textContent += messages[messageIndex].charAt(charIndex);
            charIndex++;
            
            // Play typing sound
            playTypeSound();
            
            // Schedule next character
            setTimeout(typeNextCharacter, 40);
        } else {
            // Move to next message
            messageIndex++;
            charIndex = 0;
            
            // Pause between messages
            setTimeout(typeNextCharacter, 300);
        }
    }
    
    function showCommandPrompt() {
        // Create command prompt line
        const promptLine = document.createElement('div');
        promptLine.className = 'command-line';
        
        // Create the prompt
        const prompt = document.createElement('span');
        prompt.className = 'prompt';
        prompt.textContent = 'root@baustk:~$';
        
        // Create the cursor
        const cursor = document.createElement('span');
        cursor.className = 'cursor';
        cursor.textContent = '_';
        
        // Create input element (hidden but functional)
        const input = document.createElement('input');
        input.type = 'text';
        input.className = 'command-input';
        input.autocomplete = 'off';
        input.spellcheck = false;
        input.style.opacity = '0';
        input.style.position = 'absolute';
        input.style.width = '1px';
        input.style.height = '1px';
        
        promptLine.appendChild(prompt);
        promptLine.appendChild(document.createTextNode(' '));
        promptLine.appendChild(cursor);
        promptLine.appendChild(input);
        output.appendChild(promptLine);
        
        // Focus the input
        setTimeout(() => {
            input.focus();
            initCommandSystem(input, output, cursor);
        }, 500);
    }
    
    // Start the sequence
    setTimeout(typeNextCharacter, 500);
}

// Typing Sound Effect
function playTypeSound() {
    try {
        // Simple beep using Web Audio API
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.value = 1200;
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(0.05, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.05);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.05);
    } catch (e) {
        // Audio not supported, silent fail
    }
}

// Command System
function initCommandSystem(input, output, cursor) {
    const commands = {
        'help': 'Available commands: help, clear, about, skills, games, contact, bus, matrix',
        'clear': () => {
            // Remove all output lines except first 3 and command lines
            const lines = output.querySelectorAll('.output-line');
            lines.forEach((line, index) => {
                if (index > 2) { // Keep first 3 system messages
                    line.remove();
                }
            });
            return 'Terminal cleared.';
        },
        'about': 'Farhan Ahmed Miajee | BAUSTK CSE Batch-03 Student | Cybersecurity Trainee',
        'skills': 'Cyber Security Defense | Photography | Video Editing | Competitive Gaming',
        'games': 'Specializes in Racing Games and Competitive Esports',
        'contact': 'Location: BNSB Eye Hospital, Siromoni, Khulna, Bangladesh',
        'bus': 'BAUST Khulna Bus: https://commons.wikimedia.org/wiki/File:BAUST_Khulna_Bus.jpg',
        'matrix': 'Activating matrix glitch sequence...',
        'ls': 'system_profile.exe  biodata.dat  skills_matrix.txt  games.db',
        'whoami': 'farhan_ahmed_miajee',
        'pwd': '/home/farhan/bauskt/cse/batch03'
    };
    
    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const command = input.value.trim();
            
            if (command) {
                // Hide cursor while processing
                cursor.style.display = 'none';
                
                // Show the command that was typed
                const commandLine = document.createElement('div');
                commandLine.className = 'command-line';
                commandLine.innerHTML = `<span class="prompt">root@baustk:~$</span> ${command}`;
                output.appendChild(commandLine);
                
                // Process the command
                processCommand(command, output);
                
                // Clear input
                input.value = '';
                
                // Show new prompt
                const newPrompt = document.createElement('div');
                newPrompt.className = 'command-line';
                newPrompt.innerHTML = '<span class="prompt">root@baustk:~$</span><span class="cursor">_</span>';
                output.appendChild(newPrompt);
                
                // Move cursor to new line
                const newCursor = newPrompt.querySelector('.cursor');
                cursor = newCursor;
                
                // Scroll to bottom
                output.scrollTop = output.scrollHeight;
                
                // Focus input again
                setTimeout(() => {
                    input.focus();
                    cursor.style.display = 'inline';
                }, 100);
            }
        }
    });
    
    // Keep input focused when clicking on terminal
    output.parentElement.addEventListener('click', () => {
        input.focus();
    });
}

function processCommand(command, output) {
    const response = document.createElement('div');
    response.className = 'output-line';
    
    const commands = {
        'help': 'Available commands: help, clear, about, skills, games, contact, bus, matrix, ls, whoami, pwd',
        'clear': () => {
            const lines = output.querySelectorAll('.output-line, .command-line');
            lines.forEach((line, index) => {
                if (index > 2) {
                    line.remove();
                }
            });
            return 'Terminal cleared.';
        },
        'about': 'Farhan Ahmed Miajee | BAUSTK CSE Batch-03 Student | Cybersecurity Trainee',
        'skills': 'Cyber Security Defense | Photography | Video Editing | Competitive Gaming',
        'games': 'Specializes in Racing Games and Competitive Esports',
        'contact': 'Location: BNSB Eye Hospital, Siromoni, Khulna, Bangladesh',
        'bus': 'BAUST Khulna Bus: https://commons.wikimedia.org/wiki/File:BAUST_Khulna_Bus.jpg',
        'matrix': 'Activating matrix glitch sequence...',
        'ls': 'system_profile.exe  biodata.dat  skills_matrix.txt  games.db',
        'whoami': 'farhan_ahmed_miajee',
        'pwd': '/home/farhan/bauskt/cse/batch03'
    };
    
    if (command === 'matrix') {
        // Special matrix effect
        document.body.classList.add('matrix-effect');
        setTimeout(() => {
            document.body.classList.remove('matrix-effect');
        }, 1000);
        response.textContent = 'GLITCH MATRIX ACTIVATED [░░░░░░░░░░] 100%';
    } else if (commands[command]) {
        response.textContent = typeof commands[command] === 'function' 
            ? commands[command]() 
            : commands[command];
    } else {
        response.textContent = `Command not found: ${command}. Type 'help' for commands.`;
    }
    
    output.appendChild(response);
    playTypeSound();
}

// Terminal Controls
function initTerminalControls() {
    const terminal = document.getElementById('terminal');
    const closeBtn = terminal.querySelector('.close');
    const minimizeBtn = terminal.querySelector('.minimize');
    const maximizeBtn = terminal.querySelector('.maximize');
    
    // Close button
    closeBtn.addEventListener('click', () => {
        terminal.style.animation = 'fadeOut 0.3s forwards';
        setTimeout(() => {
            terminal.style.display = 'none';
        }, 300);
    });
    
    // Minimize button
    minimizeBtn.addEventListener('click', () => {
        const terminalBody = terminal.querySelector('.terminal-body');
        if (terminalBody.style.display !== 'none') {
            terminalBody.style.display = 'none';
            minimizeBtn.style.opacity = '0.5';
        } else {
            terminalBody.style.display = 'block';
            minimizeBtn.style.opacity = '1';
        }
    });
    
    // Maximize button
    maximizeBtn.addEventListener('click', () => {
        if (terminal.style.width !== '100%') {
            terminal.style.width = '100%';
            terminal.style.height = '100%';
            terminal.style.top = '0';
            terminal.style.right = '0';
            maximizeBtn.style.opacity = '0.5';
        } else {
            terminal.style.width = '400px';
            terminal.style.height = '500px';
            terminal.style.top = '50px';
            terminal.style.right = '50px';
            maximizeBtn.style.opacity = '1';
        }
    });
    
    // Make terminal draggable
    makeTerminalDraggable(terminal);
}

function makeTerminalDraggable(terminal) {
    const header = terminal.querySelector('.terminal-header');
    let isDragging = false;
    let offsetX, offsetY;
    
    header.addEventListener('mousedown', startDrag);
    
    function startDrag(e) {
        if (e.target === header || e.target.classList.contains('terminal-title')) {
            isDragging = true;
            offsetX = e.clientX - terminal.offsetLeft;
            offsetY = e.clientY - terminal.offsetTop;
            
            document.addEventListener('mousemove', drag);
            document.addEventListener('mouseup', stopDrag);
        }
    }
    
    function drag(e) {
        if (isDragging) {
            terminal.style.left = (e.clientX - offsetX) + 'px';
            terminal.style.top = (e.clientY - offsetY) + 'px';
            terminal.style.right = 'auto';
        }
    }
    
    function stopDrag() {
        isDragging = false;
        document.removeEventListener('mousemove', drag);
        document.removeEventListener('mouseup', stopDrag);
    }
}

// Initialize everything
document.addEventListener('DOMContentLoaded', function() {
    // Add CSS animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes blink {
            0%, 100% { opacity: 1; }
            50% { opacity: 0; }
        }
        
        @keyframes fadeOut {
            to { opacity: 0; transform: scale(0.9); }
        }
        
        @keyframes matrixEffect {
            0% { filter: hue-rotate(0deg) brightness(1); }
            25% { filter: hue-rotate(90deg) brightness(1.5); }
            50% { filter: hue-rotate(180deg) brightness(2); }
            75% { filter: hue-rotate(270deg) brightness(1.5); }
            100% { filter: hue-rotate(360deg) brightness(1); }
        }
        
        .cursor {
            animation: blink 1s infinite;
            font-weight: bold;
        }
        
        .matrix-effect {
            animation: matrixEffect 1s;
        }
        
        .command-input {
            opacity: 0;
            position: absolute;
            width: 1px;
            height: 1px;
        }
        
        .terminal {
            position: fixed;
            top: 50px;
            right: 50px;
            width: 400px;
            height: 500px;
            background: rgba(0, 20, 0, 0.95);
            border: 1px solid #00ff41;
            border-radius: 5px;
            box-shadow: 0 0 20px rgba(0, 255, 65, 0.5);
            z-index: 1000;
            display: none;
            resize: both;
            overflow: hidden;
            min-width: 300px;
            min-height: 300px;
        }
        
        .terminal-header {
            background: rgba(0, 30, 0, 0.9);
            padding: 8px 15px;
            border-bottom: 1px solid #00ff41;
            display: flex;
            align-items: center;
            justify-content: space-between;
            cursor: move;
            user-select: none;
        }
        
        .terminal-buttons {
            display: flex;
            gap: 8px;
        }
        
        .terminal-buttons span {
            width: 12px;
            height: 12px;
            border-radius: 50%;
            display: inline-block;
            cursor: pointer;
            transition: opacity 0.2s;
        }
        
        .terminal-buttons span:hover {
            opacity: 0.8;
        }
        
        .close { background: #ff5f56; }
        .minimize { background: #ffbd2e; }
        .maximize { background: #27ca3f; }
        
        .terminal-title {
            font-size: 0.9rem;
            color: #00ff41;
            text-shadow: 0 0 5px #00ff41;
            font-family: 'Share Tech Mono', monospace;
        }
        
        .terminal-body {
            padding: 15px;
            font-family: 'Courier New', monospace;
            font-size: 0.9rem;
            color: #00ff41;
            height: calc(100% - 40px);
            overflow-y: auto;
            background: rgba(0, 10, 0, 0.8);
        }
        
        .command-line {
            margin-bottom: 5px;
            white-space: pre-wrap;
            word-break: break-all;
        }
        
        .prompt {
            color: #00ff41;
            font-weight: bold;
        }
        
        .output-line {
            color: #00ff41;
            margin-bottom: 5px;
            white-space: pre-wrap;
            word-break: break-all;
        }
        
        /* Scrollbar styling */
        .terminal-body::-webkit-scrollbar {
            width: 8px;
        }
        
        .terminal-body::-webkit-scrollbar-track {
            background: rgba(0, 30, 0, 0.5);
        }
        
        .terminal-body::-webkit-scrollbar-thumb {
            background: #00ff41;
            border-radius: 4px;
        }
        
        .terminal-body::-webkit-scrollbar-thumb:hover {
            background: #00cc33;
        }
    `;
    document.head.appendChild(style);
    
    // Start terminal animation
    initTerminal();
    initTerminalControls();
    
    // Focus terminal when clicking anywhere on page
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.terminal')) {
            const input = document.querySelector('.command-input');
            if (input) {
                input.focus();
            }
        }
    });
    
    // Add keyboard shortcut to show/hide terminal (Ctrl+`)
    document.addEventListener('keydown', (e) => {
        if (e.ctrlKey && e.key === '`') {
            const terminal = document.getElementById('terminal');
            if (terminal.style.display === 'none' || terminal.style.display === '') {
                terminal.style.display = 'block';
                const input = document.querySelector('.command-input');
                if (input) input.focus();
            } else {
                terminal.style.display = 'none';
            }
        }
    });
});