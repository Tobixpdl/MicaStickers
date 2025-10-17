//como estructurar un producto:
// {
//     id: 3,
//     name: "Agenda Estudiantil 2025",
//     description: "Agenda perfecta para estudiantes.",
//     type: "agendas",
//     subtype: "estudiantil",
//     variants: [
//         {
//             type: "tapa-dura",
//             prices: {
//                 unit: "$13.500",
//                 pack3: "3 x $4.800",
//                 pack5: "5 x $7.500"
//             }
//         },
//         {
//             type: "tapa-blanda",
//             prices: {
//                 unit: "$13.500",
//                 pack3: "3 x $4.000",
//                 pack5: "5 x $6.500"
//             }
//         }
//     ],
//     colors: [
//         { name: "Azul", hex: "#C7CEEA", image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=400&h=400&fit=crop" }
//     ]
// },

// Estructura de productos actualizada
const products = [
    {
        id: 1,
        name: "Agendas 2026",
        description: `¡🎁Personaliza tu portada totalmente gratis!

            La agenda te incluye:
            🌟 Hoja de datos personal
            🗓️ Calendarios 2026 / 2027
            🎯 Organizador anual
            🔐 Hoja de contraseñas
            💸 Planilla de gastos
            🎉 Feriados 2026
            🌈 Portadas mes a mes + Planner mensual
            🕒 Semana a la vista (¡sin horarios, más libertad!)
            📞 Agenda telefónica
            📝 Hojas para notas

            📄 Diaria: 440 carillas
            📄 2 dias x hoja: 280 carillas
            📄 Semanal: 180 carillas
            `,
        type: "agendas",
        subtype: "2026",
        imageFit: "contain",
        variants: [
            {
                type: "Semanal",
                prices: {
                    unit: "$12.000"
                }
            },
            {
                type: "2 dias x hoja",
                prices: {
                    unit: "$16.000"
                }
            },
            {
                type: "Diaria",
                prices: {
                    unit: "$18.000"
                }
            }
        ],
        colors: [
            { name: "Azul", hex: "#C7CEEA", image: "images/productos/agenda2026_1.webp" },
            { name: "Rosa", hex: "#FF69B4", image: "images/productos/agenda2026_2.webp" },
            { name: "Verde", hex: "#A8E6CF", image: "images/productos/agendas_4.webp" },
            { name: "Rosa 2", hex: "#FFD6E8", image: "images/productos/agendas_5.webp" },
            { name: "Violeta", hex: "#CBA6F7", image: "images/productos/agendas_6.webp" },
            { name: "Verde oscuro", hex: "#2E8B57", image: "images/productos/agendas_7.webp" },            

        ]
    },
    {
        id: 2,
        name: "Agenda Docente",
        description: `¡🎁Podés personalizar tu portada totalmente gratis!

        La agenda incluye:
        🪪 Hoja de datos personales
        🔐 Hoja de contraseñas
        🕒 Horario semanal
        📝 Listados docentes y toma de posesión
        🏫 Datos de establecimientos
        🤝 Planilla de reuniones y licencias
        📚 Seguimiento de trabajos prácticos y evaluaciones (para 15 cursos)
        🎒 Planillas de calificaciones y asistencias (40 alumnos por curso)
        🎈 Actos, eventos, salidas y viajes
        🌟 Organizador anual + mensual perpetuo (14 meses)
        📅 Organizador semanal perpetuo (1 año completo)
        🎉 Fechas especiales + página de feriados
        💬 Contactos, ideas y hojas rayadas para notas
    
        📄 280 carillas en total!`,
        type: "agendas",
        subtype: "docente",
        imageFit: "contain",
        variants: [
            {
                type: "Inicial",
                prices: {
                    unit: "$13.500"
                }
            },
            {
                type: "Secundario/Universidad",
                prices: {
                    unit: "$13.500"
                }
            },
            {
                type: "Primario",
                prices: {
                    unit: "$13.500"
                }
            }
        ],
        colors: [
            { name: "Rosa", hex: "#FF69B4", image: "images/productos/agenda2026_2.webp" },
            { name: "Violeta", hex: "#CBA6F7", image: "images/productos/agendas_6.webp" },
            { name: "Azul", hex: "#C7CEEA", image: "images/productos/agenda2026_1.webp" },
            { name: "Verde", hex: "#A8E6CF", image: "images/productos/agendas_4.webp" },
            { name: "Rosa 2", hex: "#FFD6E8", image: "images/productos/agendas_5.webp" },
            { name: "Verde oscuro", hex: "#2E8B57", image: "images/productos/agendas_7.webp" },            

        ]
    },
    {
        id: 3,
        name: "Planners",
        description: `¡🎁Personaliza tu portada totalmente gratis!
        
        Todos los planners incluyen:
        🌸 Portada personalizada
        🗓️ Calendarios 2026 y 2027
        🎯 Organizador anual
        🌟 Organizador de objetivos
        📅 Planner mensual 2026 (mes a mes en dos páginas)`,
        type: "planners",
        subtype: "planners",
        variants: [
            {
                type: "2026",
                prices: {
                    unit: "$3.000"
                }
            }
        ],
        colors: [
            { name: "Multicolor", hex: "#FFE5D9", image: "images/productos/planners_1.webp"  }
        ]
    },
    {
        id: 4,
        name: "Plancha de stickers",
        description: `¡🎁Personaliza tu plancha de stickers totalmente gratis!
        
        La plancha incluye aproximadamente 19 stickers de 6cm c/u`,
        type: "stickers",
        subtype: "todos",
        imageFit: "contain",
        variants: [
            {
                type: "mate",
                prices: {
                    unit: "$3.000"
                }
            },
            {
                type: "holografico",
                prices: {
                    unit: "$3.000"
                }
            }
        ],
        colors: [
            { name: "mate", hex: "#FFE5D9", image: "images/planchas_stickers/mate_1.webp" },
            { name: "argentina_1", hex: "#FFE5D9", image: "images/planchas_stickers/argentina_1.webp" },
            { name: "argentina_2", hex: "#FFE5D9", image: "images/planchas_stickers/argentina_2.webp" },
            { name: "argentina_3", hex: "#FFE5D9", image: "images/planchas_stickers/argentina_3.webp" },
            { name: "bellota_RomeoSantos", hex: "#FFE5D9", image: "images/planchas_stickers/bellota_romeroSantos.webp" },
            { name: "chicasSuperpoderosas", hex: "#FFE5D9", image: "images/planchas_stickers/chicasSuperpoderosas.webp" },
            { name: "feminismo", hex: "#FFE5D9", image: "images/planchas_stickers/feminismo.webp" },
            { name: "lgbt_1", hex: "#FFE5D9", image: "images/planchas_stickers/lgbt_1.webp" },
            { name: "lgbt_2", hex: "#FFE5D9", image: "images/planchas_stickers/lgbt_2.webp" },
            { name: "mix_1", hex: "#FFE5D9", image: "images/planchas_stickers/mix_1.webp" },
            { name: "mix_anime", hex: "#FFE5D9", image: "images/planchas_stickers/mix_anime.webp" },
            { name: "musica_1", hex: "#FFE5D9", image: "images/planchas_stickers/musica_1.webp" },
            { name: "musica_2", hex: "#FFE5D9", image: "images/planchas_stickers/musica_2.webp" },
            { name: "musica_3", hex: "#FFE5D9", image: "images/planchas_stickers/musica_3.webp" }
        ]
    }
];

let currentProduct = null;
let currentVariantIndex = 0;
let currentFilter = 'todos';

document.getElementById('categoryBtn').addEventListener('click', function() {
    document.getElementById('categoryDropdown').classList.toggle('active');
});

document.addEventListener('click', function(e) {
    if (!e.target.closest('.filter-dropdown')) {
        document.getElementById('categoryDropdown').classList.remove('active');
    }
});

function selectCategory(filter, displayName) {
    currentFilter = filter;
    document.getElementById('selectedCategory').textContent = displayName;
    document.getElementById('categoryDropdown').classList.remove('active');
    loadProducts();
}

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
            <img class="product-image ${product.imageFit}" src="${product.colors[0].image}" alt="${product.name}">
            <div class="product-name">${product.name}</div>
            <div class="product-price">${product.variants[0].prices.unit}</div>
        `;    
        grid.appendChild(card);
    });
}

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

function closeModal() {
    const modal = document.getElementById('productModal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

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

function loadColorOptions() {
    const colorOptions = document.getElementById('colorOptions');
    colorOptions.innerHTML = '';
    
    if (currentProduct.colors.length > 0) {
        document.getElementById('selectedDesignName').textContent = 
            `Diseño: ${currentProduct.colors[0].name.replace(/_/g, ' ')}`;
    }
    
    currentProduct.colors.forEach((color, index) => {
        const colorBtn = document.createElement('div');
        colorBtn.className = 'color-option' + (index === 0 ? ' active' : '');
        colorBtn.style.backgroundColor = color.hex;
        colorBtn.title = color.name;
        colorBtn.onclick = () => changeColor(color, colorBtn);
        colorOptions.appendChild(colorBtn);
    });
}

function changeVariant() {
    const selector = document.getElementById('variantSelector');
    currentVariantIndex = parseInt(selector.value);
    updatePrices();
}

function changeColor(color, element) {
    document.getElementById('modalImage').src = color.image;
    document.getElementById('selectedDesignName').textContent = 
        `Diseño: ${color.name.replace(/_/g, ' ')}`;
    document.querySelectorAll('.color-option').forEach(opt => opt.classList.remove('active'));
    element.classList.add('active');
}

document.getElementById('productModal').addEventListener('click', (e) => {
    if (e.target.id === 'productModal') {
        closeModal();
    }
});

loadProducts();

function calculateShipping() {
    const postalCode = document.getElementById('postalCode').value;
    const resultDiv = document.getElementById('shippingResult');
    
    if (!postalCode || postalCode.length !== 4 || !/^\d+$/.test(postalCode)) {
        resultDiv.innerHTML = '<p class="error-message">⚠️ Por favor ingresá un código postal válido de 4 dígitos</p>';
        return;
    }
    
    const cp = parseInt(postalCode);
    let zone = '';
    let price = '0';
    let deliveryTime = '';
    
    if (cp >= 1000 && cp <= 1499) {
        zone = 'CABA';
        price = 'A coordinar';
        deliveryTime = '1 semana';
    } else if (cp >= 1600 && cp <= 1900) {
        zone = 'GBA';
        price = 'A coordinar';
        deliveryTime = '1 semana';
    } else if (cp >= 1500 && cp <= 1599) {
        zone = 'GBA Norte';
        price = 'A coordinar';
        deliveryTime = '1 semana';
    } else if (cp >= 2000 && cp <= 3999) {
        zone = 'Buenos Aires Interior';
        price = 'A coordinar';
        deliveryTime = '1 semana';
    } else if (cp >= 4000 && cp <= 9999) {
        zone = 'Interior del país';
        price = 'A coordinar';
        deliveryTime = '1 semana';
    } else {
        resultDiv.innerHTML = '<p class="error-message">⚠️ Código postal no encontrado. Contactanos para consultar envío.</p>';
        return;
    }
    
    resultDiv.innerHTML = `
        <div class="result-card">
            <h3> ${price.toLocaleString('es-AR')}</h3>
            <p><strong>Zona:</strong> ${zone}</p>
            <p><strong>Tiempo estimado:</strong> ${deliveryTime}</p>
            <p style="font-size: 12px; color: #999; margin-top: 10px;">
                * Precios orientativos. El costo final puede variar según el peso.
            </p>
        </div>
    `;
}

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

document.querySelectorAll('.submenu-trigger').forEach(trigger => {
    trigger.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        document.querySelectorAll('.dropdown-submenu').forEach(submenu => {
            if (submenu !== this.parentElement) {
                submenu.classList.remove('active');
            }
        });
        
        this.parentElement.classList.toggle('active');
    });
});
