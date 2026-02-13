class ClickGame {
    constructor() {
        this.money = 0;
        this.clicks = 0;
        this.clickValue = 1;
        
        this.upgrades = [
            { name: 'Better Clicks', cost: 10, multiplier: 1.2 },
            { name: 'Auto Clicker', cost: 50, multiplier: 1.5 },
            { name: 'Click Machine', cost: 200, multiplier: 2 },
        ];
        
        this.init();
    }
    
    init() {
        this.loadGame();
        this.setupEventListeners();
        this.render();
    }
    
    setupEventListeners() {
        document.getElementById('clickButton').addEventListener('click', () => this.click());
        document.getElementById('resetButton').addEventListener('click', () => this.reset());
    }
    
    click() {
        this.money += this.clickValue;
        this.clicks += 1;
        this.render();
        this.saveGame();
    }
    
    reset() {
        this.money = 0;
        this.clickValue = 1;
        this.upgrades = [
            { name: 'Better Clicks', cost: 10, multiplier: 1.2 },
            { name: 'Auto Clicker', cost: 50, multiplier: 1.5 },
            { name: 'Click Machine', cost: 200, multiplier: 2 },
        ];
        this.render();
        this.saveGame();
        this.flashDollarSign();
    }
    
    flashDollarSign() {
        const dollar = document.createElement('div');
        dollar.className = 'flash-dollar';
        dollar.textContent = '💲';
        document.body.appendChild(dollar);
        
        setTimeout(() => {
            dollar.remove();
        }, 600);
    }
    
    buyUpgrade(index) {
        const upgrade = this.upgrades[index];
        if (this.money >= upgrade.cost) {
            this.money -= upgrade.cost;
            this.clickValue *= upgrade.multiplier;
            upgrade.cost = Math.ceil(upgrade.cost * 1.15);
            this.render();
            this.saveGame();
        }
    }
    
    render() {
        document.getElementById('money').textContent = Math.floor(this.money);
        document.getElementById('clicks').textContent = this.clicks;
        this.renderUpgrades();
    }
    
    renderUpgrades() {
        const container = document.getElementById('upgradesContainer');
        container.innerHTML = '';
        
        this.upgrades.forEach((upgrade, index) => {
            const button = document.createElement('button');
            button.className = 'upgrade-button';
            button.disabled = this.money < upgrade.cost;
            button.innerHTML = `${upgrade.name}<span class="upgrade-cost">$${upgrade.cost}</span>`;
            button.addEventListener('click', () => this.buyUpgrade(index));
            container.appendChild(button);
        });
    }
    
    saveGame() {
        const gameState = {
            money: this.money,
            clicks: this.clicks,
            clickValue: this.clickValue,
            upgrades: this.upgrades
        };
        localStorage.setItem('reggieGame', JSON.stringify(gameState));
    }
    
    loadGame() {
        const saved = localStorage.getItem('reggieGame');
        if (saved) {
            const gameState = JSON.parse(saved);
            this.money = gameState.money;
            this.clicks = gameState.clicks;
            this.clickValue = gameState.clickValue;
            this.upgrades = gameState.upgrades;
        }
    }
}

const game = new ClickGame();
