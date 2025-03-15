class QRCodeGenerator {
    constructor() {
        this.input = document.getElementById('qr-input');
        this.generateButton = document.getElementById('generate-btn');
        this.qrImage = document.getElementById('qr-code');
        this.downloadButton = document.getElementById('download-btn');
        this.status = document.getElementById('status');
        this.apiUrl = 'https://api.qrserver.com/v1/create-qr-code/';

        // Bind methods
        this.handleGenerate = this.handleGenerate.bind(this);

        // Setup event listeners
        this.setupEventListeners();
    }

    setupEventListeners() {
        this.generateButton.addEventListener('click', this.handleGenerate);
        this.input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.handleGenerate();
        });
    }

    async handleGenerate() {
        const text = this.input.value.trim();
        if (!text) {
            this.showStatus('Please enter text or URL', 'error');
            return;
        }

        this.generateButton.disabled = true;
        this.showStatus('Generating QR Code...', 'info');
        this.hideQR();

        try {
            const qrUrl = await this.generateQRCode(text);
            await this.displayQRCode(qrUrl);
            this.showDownloadButton(qrUrl);
            this.showStatus('QR Code generated successfully!', 'success');
        } catch (error) {
            this.showStatus('Error generating QR Code', 'error');
            console.error('QR Generation Error:', error);
        } finally {
            this.generateButton.disabled = false;
        }
    }

    generateQRCode(text) {
        // Using QR Server API
        const params = new URLSearchParams({
            size: '300x300',
            data: text,
            format: 'png'
        });
        return `${this.apiUrl}?${params.toString()}`;
    }

    async displayQRCode(url) {
        return new Promise((resolve, reject) => {
            this.qrImage.src = url;
            this.qrImage.onload = () => {
                this.qrImage.classList.add('visible');
                resolve();
            };
            this.qrImage.onerror = () => reject(new Error('Failed to load QR code'));
        });
    }

    showDownloadButton(url) {
        this.downloadButton.href = url;
        this.downloadButton.classList.remove('hidden');
    }

    hideQR() {
        this.qrImage.classList.remove('visible');
        this.downloadButton.classList.add('hidden');
    }

    showStatus(message, type) {
        this.status.textContent = message;
        this.status.className = `status ${type}`;
        setTimeout(() => {
            if (this.status.textContent === message) {
                this.status.textContent = '';
                this.status.className = 'status';
            }
        }, 3000);
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new QRCodeGenerator();
});