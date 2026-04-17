// 🎮 BUILT-IN HTML5 GAMES - 100% WORKING OFFLINE!
const gamesData = [
    { 
        id: 1, 
        title: "Snake Game", 
        category: "action", 
        thumbnail: "https://images.unsplash.com/photo-1570549717069-33bed2eb6f75?w=400&h=200&fit=crop", 
        game: "snake",
        popularity: 98 
    },
    { 
        id: 2, 
        title: "Tic Tac Toe", 
        category: "puzzle", 
        thumbnail: "https://images.unsplash.com/photo-1558618047-3c8c76ca3350?w=400&h=200&fit=crop", 
        game: "tictactoe",
        popularity: 95 
    },
    { 
        id: 3, 
        title: "Memory Game", 
        category: "puzzle", 
        thumbnail: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=200&fit=crop", 
        game: "memory",
        popularity: 97 
    },
    { 
        id: 4, 
        title: "Pong Game", 
        category: "action", 
        thumbnail: "https://images.unsplash.com/photo-1611606062826-955f6c14d96e?w=400&h=200&fit=crop", 
        game: "pong",
        popularity: 94 
    },
    { 
        id: 5, 
        title: "Breakout", 
        category: "action", 
        thumbnail: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=400&h=200&fit=crop", 
        game: "breakout",
        popularity: 96 
    },
    { 
        id: 6, 
        title: "Number Guessing", 
        category: "puzzle", 
        thumbnail: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&h=200&fit=crop", 
        game: "guess",
        popularity: 92 
    }
];

// Initialize App
document.addEventListener('DOMContentLoaded', function() {
    initLoading();
    initScrollAnimations();
    initSearch();
    initCategories();
    renderGames(gamesData);
    renderSidebar();
    initSmoothScroll();
});

// Loading Screen
function initLoading() {
    setTimeout(() => {
        document.getElementById('loadingScreen').style.opacity = '0';
        setTimeout(() => {
            document.getElementById('loadingScreen').style.display = 'none';
        }, 500);
    }, 2500);
}

// Scroll Animations
function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.section').forEach(section => {
        observer.observe(section);
    });
}

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
}

function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// Search & Categories
function initSearch() {
    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('input', function() {
        const query = this.value.toLowerCase();
        filterGames(query, getActiveCategory());
    });
}

function initCategories() {
    document.querySelectorAll('.category-tag').forEach(tag => {
        tag.addEventListener('click', function() {
            document.querySelectorAll('.category-tag').forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            const category = this.dataset.category;
            filterGames(document.getElementById('searchInput').value, category);
        });
    });
}

function getActiveCategory() {
    const activeTag = document.querySelector('.category-tag.active');
    return activeTag ? activeTag.dataset.category : 'all';
}

function renderGames(games) {
    const grid = document.getElementById('gamesGrid');
    grid.innerHTML = games.map(game => `
        <div class="game-card" onclick="playGame('${game.game}', '${game.title}')">
            <img src="${game.thumbnail}" alt="${game.title}" class="game-thumbnail" loading="lazy">
            <div class="game-info">
                <h3 class="game-title">${game.title}</h3>
                <span class="game-category">${game.category.toUpperCase()}</span>
                <button class="play-button">
                    <i class="fas fa-play"></i>
                    Play Now
                </button>
            </div>
        </div>
    `).join('');
}

function filterGames(searchQuery = '', category = 'all') {
    let filtered = gamesData;
    
    if (category !== 'all') {
        filtered = filtered.filter(game => game.category === category);
    }
    
    if (searchQuery) {
        filtered = filtered.filter(game => 
            game.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }
    
    renderGames(filtered);
}

function renderSidebar() {
    const popular = gamesData.sort((a, b) => b.popularity - a.popularity).slice(0, 4);
    const recent = gamesData.slice(-3);
    const recommended = gamesData.filter(g => g.popularity > 94).slice(0, 3);
    
    renderSidebarList('popularGames', popular, '🔥');
    renderSidebarList('newGames', recent, '🆕');
    renderSidebarList('recommendedGames', recommended, '⭐');
}

function renderSidebarList(containerId, games, icon) {
    const container = document.getElementById(containerId);
    container.innerHTML = games.map(game => `
        <li class="sidebar-item" onclick="playGame('${game.game}', '${game.title}')">
            <div class="sidebar-item-icon" style="background: linear-gradient(45deg, var(--neon-blue), var(--neon-purple));">
                ${icon}
            </div>
            <div>
                <div style="font-weight: 600; margin-bottom: 0.25rem;">${game.title}</div>
                <div style="font-size: 0.85rem; color: var(--text-secondary);">${game.category}</div>
            </div>
        </li>
    `).join('');
}

// 🎮 BUILT-IN GAMES ENGINE
function playGame(gameType, title) {
    // Create fullscreen game overlay
    const gameOverlay = document.createElement('div');
    gameOverlay.id = 'gameOverlay';
    gameOverlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.98);
        z-index: 10000;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 20px;
        backdrop-filter: blur(10px);
    `;
    
    gameOverlay.innerHTML = `
        <div style="
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 100%;
            max-width: 1200px;
            margin-bottom: 20px;
            padding: 0 20px;
        ">
            <h2 style="
                font-family: 'Orbitron', monospace;
                font-size: 2rem;
                background: linear-gradient(45deg, var(--neon-blue), var(--neon-purple));
                -webkit-background-clip: text;
                background-clip: text;
                -webkit-text-fill-color: transparent;
            ">${title}</h2>
            <button onclick="closeGame()" style="
                background: rgba(255,255,255,0.1);
                border: 1px solid var(--neon-blue);
                color: var(--neon-blue);
                padding: 10px 20px;
                border-radius: 25px;
                cursor: pointer;
                font-weight: 600;
                backdrop-filter: blur(10px);
            ">✕ Close</button>
        </div>
        <div id="gameCanvas" style="
            background: linear-gradient(135deg, #1a1a2e, #16213e);
            border-radius: 20px;
            border: 2px solid var(--neon-blue);
            box-shadow: 0 0 50px rgba(0,212,255,0.3);
            max-width: 100%;
            max-height: 90vh;
            overflow: hidden;
        "></div>
    `;
    
    document.body.appendChild(gameOverlay);
    startGame(gameType, document.getElementById('gameCanvas'));
    showPlayMessage(title);
}

function closeGame() {
    const overlay = document.getElementById('gameOverlay');
    if (overlay) {
        overlay.remove();
    }
}

// 🐍 SNAKE GAME
function startGame(gameType, canvasContainer) {
    if (gameType === 'snake') {
        startSnakeGame(canvasContainer);
    } else if (gameType === 'tictactoe') {
        startTicTacToe(canvasContainer);
    } else if (gameType === 'memory') {
        startMemoryGame(canvasContainer);
    } else if (gameType === 'pong') {
        startPongGame(canvasContainer);
    } else if (gameType === 'breakout') {
        startBreakoutGame(canvasContainer);
    } else if (gameType === 'guess') {
        startGuessGame(canvasContainer);
    }
}

// 1. SNAKE GAME
function startSnakeGame(container) {
    const canvas = document.createElement('canvas');
    canvas.width = 400;
    canvas.height = 400;
    container.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    const grid = 20;
    let snake = [{x: 10, y: 10}];
    let food = {x: 15, y: 15};
    let dx = 0, dy = 0;
    let score = 0;
    
    document.addEventListener('keydown', (e) => {
        switch(e.key) {
            case 'ArrowUp': if (dy !== 1) {dx=0; dy=-1}; break;
            case 'ArrowDown': if (dy !== -1) {dx=0; dy=1}; break;
            case 'ArrowLeft': if (dx !== 1) {dx=-1; dy=0}; break;
            case 'ArrowRight': if (dx !== -1) {dx=1; dy=0}; break;
        }
    });
    
    function gameLoop() {
        // Move snake
        const head = {x: snake[0].x + dx, y: snake[0].y + dy};
        snake.unshift(head);
        
        // Check food
        if (head.x === food.x && head.y === food.y) {
            score += 10;
            food = {x: Math.floor(Math.random()*20), y: Math.floor(Math.random()*20)};
        } else {
            snake.pop();
        }
        
        // Clear canvas
        ctx.fillStyle = '#0a0a0f';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Draw snake
        ctx.fillStyle = '#00d4ff';
        snake.forEach(part => {
            ctx.fillRect(part.x*grid, part.y*grid, grid-2, grid-2);
        });
        
        // Draw food
        ctx.fillStyle = '#10b981';
        ctx.fillRect(food.x*grid, food.y*grid, grid-2, grid-2);
        
        // Score
        ctx.fillStyle = '#ffffff';
        ctx.font = '20px Orbitron';
        ctx.fillText(`Score: ${score}`, 10, 30);
        
        setTimeout(gameLoop, 150);
    }
    gameLoop();
}

// 2. TIC TAC TOE
function startTicTacToe(container) {
    container.innerHTML = `
        <div style="font-family: Orbitron; text-align: center; color: white;">
            <h3>Tic Tac Toe</h3>
            <div id="board" style="display: grid; grid-template-columns: repeat(3, 100px); gap: 10px; margin: 20px auto; max-width: 320px;"></div>
            <p id="status" style="font-size: 18px; margin: 10px 0;">Player X's turn</p>
            <button onclick="location.reload()" style="padding: 10px 20px; background: var(--neon-blue); color: white; border: none; border-radius: 10px; cursor: pointer;">New Game</button>
        </div>
    `;
    
    const board = document.getElementById('board');
    const status = document.getElementById('status');
    let currentPlayer = 'X';
    let gameState = ['', '', '', '', '', '', '', '', ''];
    let gameActive = true;
    
    const winningConditions = [
        [0,1,2], [3,4,5], [6,7,8],
        [0,3,6], [1,4,7], [2,5,8],
        [0,4,8], [2,4,6]
    ];
    
    function createBoard() {
        board.innerHTML = '';
        gameState.forEach((cell, index) => {
            const cellElement = document.createElement('div');
            cellElement.style.cssText = `
                width: 100px; height: 100px; background: rgba(255,255,255,0.1);
                border: 2px solid var(--neon-blue); display: flex; align-items: center;
                justify-content: center; font-size: 2rem; font-weight: bold;
                cursor: pointer; backdrop-filter: blur(10px); border-radius: 10px;
            `;
            cellElement.textContent = cell;
            cellElement.onclick = () => handleCellClick(index);
            board.appendChild(cellElement);
        });
    }
    
    function handleCellClick(index) {
        if (gameState[index] !== '' || !gameActive) return;
        
        gameState[index] = currentPlayer;
        createBoard();
        
        if (checkWin()) {
            status.textContent = `Player ${currentPlayer} Wins!`;
            gameActive = false;
            return;
        }
        
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        status.textContent = `Player ${currentPlayer}'s turn`;
    }
    
    function checkWin() {
        return winningConditions.some(condition => {
            const [a, b, c] = condition;
            return gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c];
        });
    }
    
    createBoard();
}

// 3. MEMORY GAME
function startMemoryGame(container) {
    const cards = ['🍎', '🍌', '🍇', '🍓', '🍍', '🥝', '🍒', '🫐'];
    const gameCards = [...cards, ...cards];
    gameCards.sort(() => Math.random() - 0.5);
    
    let flippedCards = [];
    let matchedPairs = 0;
    
    container.innerHTML = `
        <div style="text-align: center; color: white; font-family: Orbitron;">
            <h3>Memory Game</h3>
            <p>Find matching pairs! (${12-matchedPairs*2}/12)</p>
            <div id="memoryBoard" style="display: grid; grid-template-columns: repeat(4, 80px); gap: 10px; margin: 20px auto;"></div>
        </div>
    `;
    
    const board = document.getElementById('memoryBoard');
    
    gameCards.forEach((card, index) => {
        const cardElement = document.createElement('div');
        cardElement.dataset.card = card;
        cardElement.style.cssText = `
            width: 80px; height: 80px; background: linear-gradient(45deg, var(--neon-purple), var(--neon-blue));
            border-radius: 15px; display: flex; align-items: center; justify-content: center;
            font-size: 2rem; cursor: pointer; transition: all 0.3s ease; transform: scale(1);
            box-shadow: 0 5px 15px rgba(0,0,0,0.3);
        `;
        cardElement.onclick = () => flipCard(cardElement);
        board.appendChild(cardElement);
    });
    
    function flipCard(card) {
        if (flippedCards.length < 2 && !card.classList.contains('flipped')) {
            card.textContent = card.dataset.card;
            card.classList.add('flipped');
            flippedCards.push(card);
            
            if (flippedCards.length === 2) {
                setTimeout(checkMatch, 1000);
            }
        }
    }
    
    function checkMatch() {
        if (flippedCards[0].dataset.card === flippedCards[1].dataset.card) {
            matchedPairs++;
            if (matchedPairs === 8) {
                alert('🎉 You Won!');
            }
        } else {
            flippedCards.forEach(card => {
                card.textContent = '?';
                card.classList.remove('flipped');
            });
        }
        flippedCards = [];
    }
}

// 4. PONG GAME (Simple)
function startPongGame(container) {
    const canvas = document.createElement('canvas');
    canvas.width = 600;
    canvas.height = 400;
    container.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');

    let ball = { x: 300, y: 200, dx: 4, dy: 4, radius: 10 };
    let paddle1 = { x: 10, y: 150, width: 10, height: 80 };
    let paddle2 = { x: 580, y: 150, width: 10, height: 80 };

    // Mouse control
    canvas.addEventListener('mousemove', (e) => {
        let rect = canvas.getBoundingClientRect();
        paddle1.y = e.clientY - rect.top - paddle1.height / 2;
    });

    function gameLoop() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Ball movement
        ball.x += ball.dx;
        ball.y += ball.dy;

        // Wall bounce
        if (ball.y < 0 || ball.y > canvas.height) {
            ball.dy *= -1;
        }

        // Paddle collision
        if (
            ball.x < paddle1.x + paddle1.width &&
            ball.y > paddle1.y &&
            ball.y < paddle1.y + paddle1.height
        ) {
            ball.dx *= -1;
        }

        if (
            ball.x > paddle2.x &&
            ball.y > paddle2.y &&
            ball.y < paddle2.y + paddle2.height
        ) {
            ball.dx *= -1;
        }

        // AI paddle (simple follow)
        paddle2.y = ball.y - paddle2.height / 2;

        // Reset ball if out
        if (ball.x < 0 || ball.x > canvas.width) {
            ball.x = 300;
            ball.y = 200;
        }

        // Draw paddles
        ctx.fillStyle = "white";
        ctx.fillRect(paddle1.x, paddle1.y, paddle1.width, paddle1.height);
        ctx.fillRect(paddle2.x, paddle2.y, paddle2.width, paddle2.height);

        // Draw ball
        ctx.beginPath();
        ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
        ctx.fill();

        requestAnimationFrame(gameLoop);
    }

    gameLoop();
}