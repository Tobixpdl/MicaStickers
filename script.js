// Estructura de productos actualizada
const products = [
    {
        id: 1,
        name: "Sticker Kawaii Cat",
        description: "Adorable sticker de gatito en estilo kawaii.",
        type: "stickers",
        subtype: "holograficos",
        variants: [
            {
                type: "holograficos",
                prices: {
                    unit: "$1000",
                    pack3: "3 x $2.500",
                    pack10: "10 x $5.000"
                }
            },
            {
                type: "vinilo blanco",
                prices: {
                    unit: "$700",
                    pack3: "3 x $1.500",
                    pack10: "10 x $3.500"
                }
            },
            {
                type: "otro",
                prices: {
                    unit: "$450",
                    pack3: "3 x $1.100",
                    pack10: "10 x $3.500"
                }
            }
        ],
        colors: [
            { name: "Rosa", hex: "#FFD6E8", image: "https://images.unsplash.com/photo-1618826411640-d6df44dd3f7a?w=400&h=400&fit=crop" },
            { name: "Azul", hex: "#C7CEEA", image: "https://images.unsplash.com/photo-1618826411640-d6df44dd3f7a?w=400&h=400&fit=crop" }
        ]
    },
    {
        id: 2,
        name: "Sticker Rainbow",
        description: "Hermoso sticker de arcoíris.",
        type: "stickers",
        subtype: "mates",
        variants: [
            {
                type: "holograficos",
                prices: {
                    unit: "$550",
                    pack3: "3 x $1.400",
                    pack10: "10 x $4.500"
                }
            },
            {
                type: "mates",
                prices: {
                    unit: "$450",
                    pack3: "3 x $1.150",
                    pack10: "10 x $3.800"
                }
            }
        ],
        colors: [
            { name: "Multicolor", hex: "#FFE5D9", image: "https://images.unsplash.com/photo-1513151233558-d860c5398176?w=400&h=400&fit=crop" }
        ]
    },
    {
        id: 3,
        name: "Agenda Estudiantil 2025",
        description: "Agenda perfecta para estudiantes.",
        type: "agendas",
        subtype: "estudiantil",
        variants: [
            {
                type: "tapa-dura",
                prices: {
                    unit: "$13.500",
                    pack3: "3 x $4.800",
                    pack5: "5 x $7.500"
                }
            },
            {
                type: "tapa-blanda",
                prices: {
                    unit: "$13.500",
                    pack3: "3 x $4.000",
                    pack5: "5 x $6.500"
                }
            }
        ],
        colors: [
            { name: "Azul", hex: "#C7CEEA", image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=400&h=400&fit=crop" }
        ]
    },
    {
        id: 4,
        name: "Agenda Docente 2025",
        description: "Agenda diseñada para docentes.",
        type: "agendas",
        subtype: "docente",
        variants: [
            {
                type: "tapa-dura",
                prices: {
                    unit: "$2.000",
                    pack3: "3 x $5.400",
                    pack5: "5 x $8.500"
                }
            },
            {
                type: "tapa-blanda",
                prices: {
                    unit: "$1.800",
                    pack3: "3 x $4.800",
                    pack5: "5 x $7.800"
                }
            }
        ],
        colors: [
            { name: "Verde", hex: "#C9F4E7", image: "https://images.unsplash.com/photo-1517842645767-c639042777db?w=400&h=400&fit=crop" }
        ]
    }
];

let currentProduct = null;
let currentVariantIndex = 0;
let currentFilter = 'todos';

// Toggle dropdown
document.getElementById('categoryBtn').addEventListener('click', function() {
    document.getElementById('categoryDropdown').classList.toggle('active');
});

// Cerrar dropdown al hacer clic afuera
document.addEventListener('click', function(e) {
    if (!e.target.closest('.filter-dropdown')) {
        document.getElementById('categoryDropdown').classList.remove('active');
    }
});

// Función para seleccionar categoría
function selectCategory(filter, displayName) {
    currentFilter = filter;
    document.getElementById('selectedCategory').textContent = displayName;
    document.getElementById('categoryDropdown').classList.remove('active');
    loadProducts();
}

// Cargar productos con filtro
function loadProducts() {
    const grid = document.getElementById('productsGrid');
    grid.innerHTML = '';
    
    const filtered = products.filter(product => {
        if (currentFilter === 'todos') return true;
        const [type, subtype] = currentFilter.split('-');
        if (subtype === 'todos') {
            return product.type === type;
        }
        return product.type === type && product.subtype === subtype;
    });
    
    if (filtered.length === 0) {
        grid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: white; font-size: 20px;">No hay productos en esta categoría 😢</p>';
        return;
    }
    
    filtered.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.onclick = () => openModal(product);
        card.innerHTML = `
            <img class="product-image" src="${product.colors[0].image}" alt="${product.name}">
            <div class="product-name">${product.name}</div>
            <div class="product-price">${product.variants[0].prices.unit}</div>
        `;
        grid.appendChild(card);
    });
}

// Abrir modal
function openModal(product) {
    currentProduct = product;
    currentVariantIndex = 0;
    const modal = document.getElementById('productModal');
    
    document.getElementById('modalImage').src = product.colors[0].image;
    document.getElementById('modalTitle').textContent = product.name;
    document.getElementById('modalDescription').textContent = product.description;
    
    updatePrices();
    loadVariantSelector();
    loadColorOptions();
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Cerrar modal
function closeModal() {
    const modal = document.getElementById('productModal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Actualizar precios
function updatePrices() {
    const variant = currentProduct.variants[currentVariantIndex];
    const prices = variant.prices;
    
    document.getElementById('modalPriceMain').textContent = prices.unit;
    
    const packPricesHtml = Object.entries(prices)
        .filter(([key]) => key !== 'unit')
        .map(([key, value]) => `<div class="pack-price">${value}</div>`)
        .join('');
    
    document.getElementById('packPrices').innerHTML = packPricesHtml;
}

// Cargar selector de variantes
function loadVariantSelector() {
    const variantSelector = document.getElementById('variantSelector');
    variantSelector.innerHTML = '';
    
    currentProduct.variants.forEach((variant, index) => {
        const option = document.createElement('option');
        option.value = index;
        option.textContent = variant.type.charAt(0).toUpperCase() + variant.type.slice(1).replace('-', ' ');
        if (index === currentVariantIndex) option.selected = true;
        variantSelector.appendChild(option);
    });
}

// Cargar opciones de color
function loadColorOptions() {
    const colorOptions = document.getElementById('colorOptions');
    colorOptions.innerHTML = '';
    
    currentProduct.colors.forEach((color, index) => {
        const colorBtn = document.createElement('div');
        colorBtn.className = 'color-option' + (index === 0 ? ' active' : '');
        colorBtn.style.backgroundColor = color.hex;
        colorBtn.title = color.name;
        colorBtn.onclick = () => changeColor(color, colorBtn);
        colorOptions.appendChild(colorBtn);
    });
}

// Cambiar variante
function changeVariant() {
    const selector = document.getElementById('variantSelector');
    currentVariantIndex = parseInt(selector.value);
    updatePrices();
}

// Cambiar color
function changeColor(color, element) {
    document.getElementById('modalImage').src = color.image;
    document.querySelectorAll('.color-option').forEach(opt => opt.classList.remove('active'));
    element.classList.add('active');
}

// Cerrar modal al hacer clic fuera
document.getElementById('productModal').addEventListener('click', (e) => {
    if (e.target.id === 'productModal') {
        closeModal();
    }
});

// Cargar productos al iniciar
loadProducts();

// Calculadora de envío (simulada basada en zonas)
function calculateShipping() {
    const postalCode = document.getElementById('postalCode').value;
    const resultDiv = document.getElementById('shippingResult');
    
    // Validación
    if (!postalCode || postalCode.length !== 4 || !/^\d+$/.test(postalCode)) {
        resultDiv.innerHTML = '<p class="error-message">⚠️ Por favor ingresá un código postal válido de 4 dígitos</p>';
        return;
    }
    
    const cp = parseInt(postalCode);
    let zone = '';
    let price = 0;
    let deliveryTime = '';
    
    if (cp >= 1000 && cp <= 1499) {
        zone = 'CABA';
        price = 15000;
        deliveryTime = '24-48 horas';
    } else if (cp >= 1600 && cp <= 1900) {
        zone = 'GBA';
        price = 20000;
        deliveryTime = '2-3 días';
    } else if (cp >= 1500 && cp <= 1599) {
        zone = 'GBA Norte';
        price = 22000;
        deliveryTime = '2-3 días';
    } else if (cp >= 2000 && cp <= 3999) {
        zone = 'Buenos Aires Interior';
        price = 28000;
        deliveryTime = '3-5 días';
    } else if (cp >= 4000 && cp <= 9999) {
        zone = 'Interior del país';
        price = 35000;
        deliveryTime = '5-7 días';
    } else {
        resultDiv.innerHTML = '<p class="error-message">⚠️ Código postal no encontrado. Contactanos para consultar envío.</p>';
        return;
    }
    
    resultDiv.innerHTML = `
        <div class="result-card">
            <h3>💰 $${price.toLocaleString('es-AR')}</h3>
            <p><strong>Zona:</strong> ${zone}</p>
            <p><strong>Tiempo estimado:</strong> ${deliveryTime}</p>
            <p style="font-size: 12px; color: #999; margin-top: 10px;">
                * Precios orientativos. El costo final puede variar según el peso.
            </p>
        </div>
    `;
}

// Permitir calcular con Enter
document.addEventListener('DOMContentLoaded', function() {
    const postalInput = document.getElementById('postalCode');
    if (postalInput) {
        postalInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                calculateShipping();
            }
        });
    }
});