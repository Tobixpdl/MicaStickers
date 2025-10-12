let currentTab = 'front';
let selectedElement = null;
let isDragging = false;
let isResizing = false;
let isRotating = false;
let dragOffset = { x: 0, y: 0 };
let elementCounter = 0;
let logoDataUrl = null;
let backgroundImageUrl = null;
let rotationStart = 0;
let elementCenterX = 0;
let elementCenterY = 0;

const agendaPreview = document.getElementById('agendaPreview');
const coverPage = document.getElementById('coverPage');
const coverBackground = document.getElementById('coverBackground');
const spiralContainer = document.getElementById('spiralContainer');

// State storage
const state = {
    front: { elements: [], background: '#ffffff', backgroundImage: null },
    back: { elements: [], background: '#ffffff', backgroundImage: null },
    spiralColor: '#000000',
    size: 'a4',
    logoDataUrl: null
};

// Load saved designs
function loadSavedDesigns() {
    const designs = JSON.parse(localStorage.getItem('agendaDesigns') || '[]');
    const container = document.getElementById('savedDesigns');
    container.innerHTML = '';
    
    designs.forEach((design, index) => {
        const item = document.createElement('div');
        item.className = 'design-item';
        item.innerHTML = `
            <span class="design-name">${design.name}</span>
            <div class="design-actions">
                <button class="load-btn" onclick="loadDesign(${index})">Cargar</button>
                <button class="delete-btn" onclick="deleteDesign(${index})">Borrar</button>
            </div>
        `;
        container.appendChild(item);
    });
}

// Save design
document.getElementById('saveDesign').addEventListener('click', () => {
    const name = document.getElementById('designName').value.trim();
    if (!name) {
        alert('Por favor, ingresá un nombre para el diseño');
        return;
    }
    
    saveCurrentTab();
    const designs = JSON.parse(localStorage.getItem('agendaDesigns') || '[]');
    const designData = {
        name: name,
        timestamp: new Date().toISOString(),
        state: JSON.parse(JSON.stringify(state))
    };
    
    designs.push(designData);
    localStorage.setItem('agendaDesigns', JSON.stringify(designs));
    document.getElementById('designName').value = '';
    loadSavedDesigns();
    alert('¡Diseño guardado exitosamente!');
});

// Load design
window.loadDesign = function(index) {
    const designs = JSON.parse(localStorage.getItem('agendaDesigns') || '[]');
    if (designs[index]) {
        Object.assign(state, JSON.parse(JSON.stringify(designs[index].state)));
        
        // Apply loaded state
        document.querySelector(`[data-size="${state.size}"]`).click();
        document.getElementById('spiralColor').value = state.spiralColor;
        updateSpiralColor();
        logoDataUrl = state.logoDataUrl;
        
        loadTab();
        alert('¡Diseño cargado!');
    }
};

// Delete design
window.deleteDesign = function(index) {
    if (confirm('¿Estás seguro de que querés borrar este diseño?')) {
        const designs = JSON.parse(localStorage.getItem('agendaDesigns') || '[]');
        designs.splice(index, 1);
        localStorage.setItem('agendaDesigns', JSON.stringify(designs));
        loadSavedDesigns();
    }
};

// Size selector
document.querySelectorAll('.size-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.size-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        agendaPreview.className = `agenda-preview size-${btn.dataset.size}`;
        state.size = btn.dataset.size;
    });
});

// Spiral color selector
const spiralColorSelect = document.getElementById('spiralColor');
const colorIndicator = document.getElementById('colorIndicator');

function updateSpiralColor() {
    const color = spiralColorSelect.value;
    colorIndicator.style.background = color;
    if (color === '#ffffff') {
        colorIndicator.style.borderColor = '#333';
    } else {
        colorIndicator.style.borderColor = '#ddd';
    }
    
    document.querySelectorAll('.spiral-ring').forEach(ring => {
        ring.style.borderColor = color;
    });
    state.spiralColor = color;
}

spiralColorSelect.addEventListener('change', updateSpiralColor);
updateSpiralColor();

// Tab selector
document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        saveCurrentTab();
        currentTab = btn.dataset.tab;
        loadTab();
    });
});

// Background color
document.getElementById('bgColor').addEventListener('input', (e) => {
    coverBackground.style.background = e.target.value;
    state[currentTab].background = e.target.value;
});

// Image upload
document.getElementById('imageUpload').addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
            addImageElement(event.target.result);
        };
        reader.readAsDataURL(file);
    }
});

// Logo upload
document.getElementById('logoUpload').addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
            logoDataUrl = event.target.result;
            state.logoDataUrl = logoDataUrl;
            updateBackCoverFooter();
        };
        reader.readAsDataURL(file);
    }
});

// Background image upload
document.getElementById('backgroundUpload').addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
            backgroundImageUrl = event.target.result;
            coverBackground.style.backgroundImage = `url(${backgroundImageUrl})`;
            coverBackground.style.background = ''; // Limpiar color sólido
            state[currentTab].backgroundImage = backgroundImageUrl;
            state[currentTab].background = '';
        };
        reader.readAsDataURL(file);
    }
});

// Clear background
document.getElementById('clearBackground').addEventListener('click', () => {
    backgroundImageUrl = null;
    coverBackground.style.backgroundImage = '';
    coverBackground.style.background = '#ffffff';
    document.getElementById('bgColor').value = '#ffffff';
    state[currentTab].backgroundImage = null;
    state[currentTab].background = '#ffffff';
});

// Add text
document.getElementById('addText').addEventListener('click', () => {
    addTextElement('Tu Texto');
});

// Delete element
document.getElementById('deleteElement').addEventListener('click', () => {
    if (selectedElement) {
        selectedElement.remove();
        selectedElement = null;
        document.getElementById('textControls').style.display = 'none';
        document.getElementById('imageControls').style.display = 'none';
        saveCurrentTab();
    }
});

// Text controls
document.getElementById('textContent').addEventListener('input', (e) => {
    if (selectedElement && selectedElement.classList.contains('text-element')) {
        const handleHtml = selectedElement.querySelector('.resize-handle').outerHTML;
        selectedElement.textContent = e.target.value;
        selectedElement.innerHTML += handleHtml;
        saveCurrentTab();
    }
});

document.getElementById('fontFamily').addEventListener('change', (e) => {
    if (selectedElement && selectedElement.classList.contains('text-element')) {
        selectedElement.style.fontFamily = e.target.value;
        saveCurrentTab();
    }
});

document.getElementById('textSize').addEventListener('input', (e) => {
    if (selectedElement && selectedElement.classList.contains('text-element')) {
        selectedElement.style.fontSize = e.target.value + 'px';
        saveCurrentTab();
    }
});

document.getElementById('textColor').addEventListener('input', (e) => {
    if (selectedElement && selectedElement.classList.contains('text-element')) {
        selectedElement.style.color = e.target.value;
        saveCurrentTab();
    }
});

// Rotation control
document.getElementById('rotationSlider').addEventListener('input', (e) => {
    if (selectedElement && !selectedElement.classList.contains('text-element')) {
        const rotation = e.target.value;
        selectedElement.style.transform = `rotate(${rotation}deg)`;
        document.getElementById('rotationValue').textContent = rotation + '°';
        saveCurrentTab();
    }
});

function addImageElement(src) {
    const img = document.createElement('div');
    img.className = 'cover-element';
    img.dataset.id = `element-${elementCounter++}`;
    img.style.left = '50px';
    img.style.top = '50px';
    img.style.width = '150px';
    img.style.height = '150px';
    img.style.transform = 'rotate(0deg)';
    img.innerHTML = `<img src="${src}"><div class="resize-handle"></div><div class="rotate-handle"></div>`;
    coverPage.appendChild(img);
    makeElementInteractive(img);
    saveCurrentTab();
}

function addTextElement(text) {
    const textEl = document.createElement('div');
    textEl.className = 'cover-element text-element';
    textEl.dataset.id = `element-${elementCounter++}`;
    textEl.textContent = text;
    textEl.style.left = '50px';
    textEl.style.top = '50px';
    textEl.style.fontSize = '24px';
    textEl.style.color = '#000000';
    textEl.style.fontFamily = 'Arial';
    textEl.innerHTML += '<div class="resize-handle"></div>';
    coverPage.appendChild(textEl);
    makeElementInteractive(textEl);
    saveCurrentTab();
}

function makeElementInteractive(element) {
    element.addEventListener('mousedown', (e) => {
        if (e.target.classList.contains('resize-handle')) {
            isResizing = true;
            selectedElement = element;
        } else if (e.target.classList.contains('rotate-handle')) {
            isRotating = true;
            selectedElement = element;
            const rect = element.getBoundingClientRect();
            elementCenterX = rect.left + rect.width / 2;
            elementCenterY = rect.top + rect.height / 2;
            const angle = Math.atan2(e.clientY - elementCenterY, e.clientX - elementCenterX);
            rotationStart = angle * (180 / Math.PI);
            const currentRotation = getRotation(element);
            rotationStart = rotationStart - currentRotation;
        } else {
            isDragging = true;
            selectedElement = element;
            const rect = element.getBoundingClientRect();
            const parentRect = coverPage.getBoundingClientRect();
            dragOffset.x = e.clientX - rect.left;
            dragOffset.y = e.clientY - rect.top;
        }
        
        document.querySelectorAll('.cover-element').forEach(el => el.classList.remove('selected'));
        element.classList.add('selected');
        
        if (element.classList.contains('text-element')) {
            document.getElementById('textControls').style.display = 'flex';
            document.getElementById('imageControls').style.display = 'none';
            const content = element.childNodes[0].textContent || element.textContent.replace(/\s*$/, '');
            document.getElementById('textContent').value = content;
            document.getElementById('textSize').value = parseInt(element.style.fontSize);
            document.getElementById('textColor').value = rgbToHex(element.style.color) || '#000000';
            document.getElementById('fontFamily').value = element.style.fontFamily.replace(/['"]/g, '');
        } else {
            document.getElementById('textControls').style.display = 'none';
            document.getElementById('imageControls').style.display = 'flex';
            const rotation = getRotation(element);
            document.getElementById('rotationSlider').value = rotation;
            document.getElementById('rotationValue').textContent = rotation + '°';
        }
        
        e.preventDefault();
    });
}

function getRotation(element) {
    const transform = element.style.transform;
    if (!transform || transform === 'none') return 0;
    const match = transform.match(/rotate\(([^)]+)deg\)/);
    return match ? parseFloat(match[1]) : 0;
}

document.addEventListener('mousemove', (e) => {
    if (isDragging && selectedElement) {
        const parentRect = coverPage.getBoundingClientRect();
        let x = e.clientX - parentRect.left - dragOffset.x;
        let y = e.clientY - parentRect.top - dragOffset.y;
        
        x = Math.max(0, Math.min(x, parentRect.width - selectedElement.offsetWidth));
        y = Math.max(0, Math.min(y, parentRect.height - selectedElement.offsetHeight));
        
        selectedElement.style.left = x + 'px';
        selectedElement.style.top = y + 'px';
    } else if (isResizing && selectedElement) {
        const rect = selectedElement.getBoundingClientRect();
        const rotation = getRotation(selectedElement) * Math.PI / 180;
        
        // Calcular la diferencia del mouse respecto al centro
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const deltaX = e.clientX - centerX;
        const deltaY = e.clientY - centerY;
        
        // Rotar el delta de vuelta para obtener dimensiones correctas
        const unrotatedX = deltaX * Math.cos(-rotation) - deltaY * Math.sin(-rotation);
        const unrotatedY = deltaX * Math.sin(-rotation) + deltaY * Math.cos(-rotation);
        
        // Nuevas dimensiones (el doble porque medimos desde el centro)
        const newWidth = Math.abs(unrotatedX * 2);
        const newHeight = Math.abs(unrotatedY * 2);
        
        if (newWidth > 30 && newHeight > 30) {
            selectedElement.style.width = newWidth + 'px';
            selectedElement.style.height = newHeight + 'px';
        }
    } else if (isRotating && selectedElement) {
        const angle = Math.atan2(e.clientY - elementCenterY, e.clientX - elementCenterX);
        let rotation = angle * (180 / Math.PI) - rotationStart;
        rotation = Math.round(rotation);
        if (rotation < 0) rotation += 360;
        if (rotation >= 360) rotation -= 360;
        
        selectedElement.style.transform = `rotate(${rotation}deg)`;
        document.getElementById('rotationSlider').value = rotation;
        document.getElementById('rotationValue').textContent = rotation + '°';
    }
});

document.addEventListener('mouseup', () => {
    if (isDragging || isResizing || isRotating) {
        saveCurrentTab();
    }
    isDragging = false;
    isResizing = false;
    isRotating = false;
});

function saveCurrentTab() {
    const elements = Array.from(coverPage.querySelectorAll('.cover-element:not(.back-cover-footer *)'));
    state[currentTab].elements = elements.map(el => {
        const data = {
            id: el.dataset.id,
            type: el.classList.contains('text-element') ? 'text' : 'image',
            left: el.style.left,
            top: el.style.top,
            width: el.style.width,
            height: el.style.height,
        };
        
        if (el.classList.contains('text-element')) {
            const content = el.childNodes[0] ? el.childNodes[0].textContent : el.textContent.replace(/\s*$/, '');
            data.content = content;
            data.fontSize = el.style.fontSize;
            data.color = el.style.color;
            data.fontFamily = el.style.fontFamily;
        } else {
            data.content = el.querySelector('img').src;
            data.rotation = getRotation(el);
        }
        
        return data;
    });
    state[currentTab].background = coverBackground.style.background || '#ffffff';
    state[currentTab].backgroundImage = backgroundImageUrl;
}

function loadTab() {
    // Clear current elements
    coverPage.querySelectorAll('.cover-element').forEach(el => {
        if (!el.classList.contains('back-cover-footer')) {
            el.remove();
        }
    });
    
    // Set background
    if (state[currentTab].backgroundImage) {
        backgroundImageUrl = state[currentTab].backgroundImage;
        coverBackground.style.backgroundImage = `url(${backgroundImageUrl})`;
        coverBackground.style.background = '';
    } else {
        backgroundImageUrl = null;
        coverBackground.style.backgroundImage = '';
        coverBackground.style.background = state[currentTab].background || '#ffffff';
        document.getElementById('bgColor').value = state[currentTab].background || '#ffffff';
    }
    
    // Load elements
    state[currentTab].elements.forEach(data => {
        if (data.type === 'image') {
            const img = document.createElement('div');
            img.className = 'cover-element';
            img.dataset.id = data.id;
            img.style.left = data.left;
            img.style.top = data.top;
            img.style.width = data.width;
            img.style.height = data.height;
            img.style.transform = `rotate(${data.rotation || 0}deg)`;
            img.innerHTML = `<img src="${data.content}"><div class="resize-handle"></div><div class="rotate-handle"></div>`;
            coverPage.appendChild(img);
            makeElementInteractive(img);
        } else {
            const textEl = document.createElement('div');
            textEl.className = 'cover-element text-element';
            textEl.dataset.id = data.id;
            textEl.textContent = data.content;
            textEl.style.left = data.left;
            textEl.style.top = data.top;
            textEl.style.fontSize = data.fontSize;
            textEl.style.color = data.color;
            textEl.style.fontFamily = data.fontFamily || 'Arial';
            textEl.innerHTML += '<div class="resize-handle"></div>';
            coverPage.appendChild(textEl);
            makeElementInteractive(textEl);
        }
    });
    
    // Update back cover footer
    if (currentTab === 'back') {
        updateBackCoverFooter();
    } else {
        const existingFooter = coverPage.querySelector('.back-cover-footer');
        if (existingFooter) existingFooter.remove();
    }
    
    selectedElement = null;
    document.getElementById('textControls').style.display = 'none';
    document.getElementById('imageControls').style.display = 'none';
}

function updateBackCoverFooter() {
    let footer = coverPage.querySelector('.back-cover-footer');
    if (!footer && currentTab === 'back') {
        footer = document.createElement('div');
        footer.className = 'back-cover-footer';
        coverPage.appendChild(footer);
    }
    
    if (footer && currentTab === 'back') {
        footer.innerHTML = '';
        if (logoDataUrl) {
            const logo = document.createElement('img');
            logo.className = 'back-cover-logo';
            logo.src = logoDataUrl;
            footer.appendChild(logo);
        }
        const text = document.createElement('div');
        text.className = 'back-cover-text';
        text.textContent = '@NoTeAferresAlMar';
        footer.appendChild(text);
    }
}

function rgbToHex(rgb) {
    if (!rgb) return null;
    if (rgb.startsWith('#')) return rgb;
    const result = rgb.match(/\d+/g);
    if (!result) return null;
    return '#' + result.map(x => {
        const hex = parseInt(x).toString(16);
        return hex.length === 1 ? '0' + hex : hex;
    }).join('');
}

// Download functionality
document.getElementById('downloadBtn').addEventListener('click', async () => {
    const btn = document.getElementById('downloadBtn');
    btn.textContent = '⏳ Generando...';
    btn.disabled = true;
    
    // Save current state
    saveCurrentTab();
    
    // Hide selection borders and spiral
    document.querySelectorAll('.cover-element').forEach(el => {
        el.classList.remove('selected');
    });
    
    const originalSpiralDisplay = spiralContainer.style.display;
    spiralContainer.style.display = 'none';
    
    try {
        // Capture front
        const originalTab = currentTab;
        currentTab = 'front';
        loadTab();
        await new Promise(resolve => setTimeout(resolve, 300));
        const frontCanvas = await html2canvas(agendaPreview, {
            backgroundColor: null,
            scale: 2,
            useCORS: true,
            allowTaint: true
        });
        
        // Capture back
        currentTab = 'back';
        loadTab();
        await new Promise(resolve => setTimeout(resolve, 300));
        const backCanvas = await html2canvas(agendaPreview, {
            backgroundColor: null,
            scale: 2,
            useCORS: true,
            allowTaint: true
        });
        
        // Download both
        downloadCanvas(frontCanvas, 'agenda-tapa.png');
        await new Promise(resolve => setTimeout(resolve, 500));
        downloadCanvas(backCanvas, 'agenda-contratapa.png');
        
        // Restore original tab
        currentTab = originalTab;
        loadTab();
        
        btn.textContent = '✅ ¡Descargado!';
        setTimeout(() => {
            btn.textContent = '💾 Descargar Diseño';
            btn.disabled = false;
        }, 2000);
    } catch (error) {
        console.error('Error:', error);
        btn.textContent = '❌ Error';
        setTimeout(() => {
            btn.textContent = '💾 Descargar Diseño';
            btn.disabled = false;
        }, 2000);
    } finally {
        spiralContainer.style.display = originalSpiralDisplay;
    }
});

function downloadCanvas(canvas, filename) {
    const link = document.createElement('a');
    link.download = filename;
    link.href = canvas.toDataURL();
    link.click();
}

// Initialize
loadTab();
loadSavedDesigns();