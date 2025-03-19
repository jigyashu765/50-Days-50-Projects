document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('drawingCanvas');
    const ctx = canvas.getContext('2d');
    const colorPicker = document.getElementById('colorPicker');
    const brushSize = document.getElementById('brushSize');
    const sizeDisplay = document.getElementById('sizeDisplay');
    const brushTool = document.getElementById('brushTool');
    const eraserTool = document.getElementById('eraserTool');
    const clearCanvas = document.getElementById('clearCanvas');
    const downloadBtn = document.getElementById('downloadBtn');

    let drawing = false;
    let currentTool = 'brush';
    let lastX = 0;
    let lastY = 0;

    // Set canvas size
    function resizeCanvas() {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
        ctx.fillStyle = '#fff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Update brush size display with animation
    brushSize.addEventListener('input', () => {
        sizeDisplay.textContent = brushSize.value;
        sizeDisplay.style.transform = 'scale(1.2)';
        setTimeout(() => sizeDisplay.style.transform = 'scale(1)', 200);
        updateCursorSize(); // Update cursor size when brush size changes
    });

    // Tool selection with sound feedback (optional)
    function setTool(tool, btn) {
        currentTool = tool;
        document.querySelectorAll('.tool-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        btn.style.transform = 'scale(1.05)';
        setTimeout(() => btn.style.transform = 'scale(1)', 200);
        updateCursor(); // Update cursor when tool changes
    }

    brushTool.addEventListener('click', () => setTool('brush', brushTool));
    eraserTool.addEventListener('click', () => setTool('eraser', eraserTool));

    // Update cursor based on selected tool and size
    function updateCursor() {
        const size = parseInt(brushSize.value);
        if (currentTool === 'brush') {
            canvas.style.cursor = `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 100 100"><circle cx="50" cy="50" r="50" fill="${colorPicker.value}" /></svg>') ${size / 2} ${size / 2}, auto`;
        } else if (currentTool === 'eraser') {
            canvas.style.cursor = `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 100 100"><circle cx="50" cy="50" r="50" fill="white" /></svg>') ${size / 2} ${size / 2}, auto`;
        }
    }

    // Update cursor size when brush size changes
    function updateCursorSize() {
        updateCursor();
    }

    // Drawing logic
    function startDrawing(e) {
        drawing = true;
        [lastX, lastY] = [e.offsetX, e.offsetY];
    }

    function draw(e) {
        if (!drawing) return;

        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.strokeStyle = currentTool === 'brush' ? colorPicker.value : '#fff';
        ctx.lineWidth = brushSize.value;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.stroke();

        [lastX, lastY] = [e.offsetX, e.offsetY];
    }

    function stopDrawing() {
        drawing = false;
    }

    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mouseout', stopDrawing);

    // Touch support
    canvas.addEventListener('touchstart', (e) => {
        e.preventDefault();
        const touch = e.touches[0];
        const rect = canvas.getBoundingClientRect();
        startDrawing({
            offsetX: touch.clientX - rect.left,
            offsetY: touch.clientY - rect.top
        });
    });

    canvas.addEventListener('touchmove', (e) => {
        e.preventDefault();
        const touch = e.touches[0];
        const rect = canvas.getBoundingClientRect();
        draw({
            offsetX: touch.clientX - rect.left,
            offsetY: touch.clientY - rect.top
        });
    });

    canvas.addEventListener('touchend', stopDrawing);

    // Clear canvas with fade effect
    clearCanvas.addEventListener('click', () => {
        canvas.style.opacity = '0';
        setTimeout(() => {
            ctx.fillStyle = '#fff';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            canvas.style.opacity = '1';
        }, 300);
    });

    // Download artwork with button animation
    downloadBtn.addEventListener('click', () => {
        downloadBtn.style.transform = 'scale(0.95)';
        setTimeout(() => downloadBtn.style.transform = 'scale(1)', 200);
        const link = document.createElement('a');
        link.download = 'artwork.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
    });

    // Initialize cursor on page load
    updateCursor();
});