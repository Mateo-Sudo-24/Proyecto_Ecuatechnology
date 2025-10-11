# 📚 Guía del Sistema de CSS Admin - Ecuatecnology

## 🎯 Visión General

Este proyecto implementa un sistema modular de CSS para el panel de administración, optimizado para mantenibilidad, escalabilidad y consistencia visual.

## 📁 Estructura de Archivos

```
src/styles/
├── admin.css              # Archivo principal (imports + estilos únicos)
├── admin-variables.css    # Variables CSS centralizadas
├── admin-utilities.css    # Utilitarias reutilizables
├── admin-layout.css       # Layouts específicos de páginas
├── admin-components.css   # Componentes específicos
├── admin-tables.css       # Estilos de tablas
└── admin-responsive.css   # Media queries y responsive
```

## 🎨 Sistema de Variables

### Variables de Diseño
```css
/* Dimensiones */
--admin-sidebar-width: 280px;
--admin-header-height: 80px;
--admin-border-radius: 0.75rem;

/* Espaciados */
--admin-spacing-xs: 0.25rem;
--admin-spacing-sm: 0.5rem;
--admin-spacing-md: 0.75rem;
--admin-spacing-lg: 1rem;
--admin-spacing-xl: 1.5rem;
--admin-spacing-2xl: 2rem;
```

### Variables de Colores Semánticos
```css
/* Estados de Tickets */
--admin-ticket-status-new: #E3F2FD;
--admin-ticket-status-completed: #E8F5E8;
--admin-ticket-status-closed: #DC2626;

/* Prioridades */
--admin-priority-high: #FEE2E2;
--admin-priority-medium: #FEF3C7;
--admin-priority-low: #D1FAE5;

/* Acciones */
--admin-action-view: #2563eb;
--admin-action-edit: #d97706;
--admin-action-delete: #dc2626;
```

## 🛠️ Utilitarias Disponibles

### Layouts
- `.admin-layout` - Contenedor principal flex
- `.admin-sidebar` - Menú lateral fijo
- `.admin-main` - Contenido principal
- `.admin-header` - Encabezado fijo

### Formularios
- `.admin-form-section` - Sección de formulario
- `.admin-form-grid` - Grid de formulario
- `.admin-form-input` - Campo de entrada
- `.form-input:focus` - Estado focus

### Tablas
- `.admin-table-container` - Contenedor de tabla
- `.admin-table` - Tabla base
- `.admin-table th/td` - Celdas de encabezado/datos

### Botones
- `.admin-button` - Botón primario
- `.quick-action-button` - Botones de acciones rápidas
- `.operation-button` - Botones de operaciones

### Estados
- `.status-badge` - Badges de estado
- `.priority-badge` - Badges de prioridad
- `.admin-stat-card` - Tarjetas de estadísticas

## 📱 Diseño Responsivo

### Breakpoints
- `1024px` - Tablet landscape
- `768px` - Tablet portrait
- `480px` - Mobile landscape

### Comportamiento
- **Desktop**: Sidebar fijo + contenido dinámico
- **Tablet**: Sidebar más delgado
- **Mobile**: Sidebar colapsable, navegación horizontal

## 🚫 Reglas de Calidad

### Prohibiciones
- ❌ NO usar `!important`
- ❌ NO colores hardcoded en componentes
- ❌ NO selectores con más de 3 niveles de anidamiento
- ❌ NO propiedades duplicadas

### Obligaciones
- ✅ Usar variables para todos los colores
- ✅ Usar utilitarias para layouts comunes
- ✅ Mantener especificidad baja
- ✅ Documentar clases complejas

## 🔧 Comandos Útiles

```bash
# Verificar CSS
npm run lint:css

# Auto-corregir CSS
npm run lint:css:fix

# Construir CSS procesado
npm run build:css
```

## 🎨 Colores del Sistema

| Variable | Color | Uso |
|----------|-------|-----|
| `--primary` | #D4AF37 | Color principal/oro |
| `--secondary` | #2C3E8F | Color secundario/azul |
| `--accent` | #DC2626 | Color de acento/rojo |
| `--neutral` | #374151 | Color neutral/gris |

## 📋 Estados de Tickets

| Estado | Clase | Color |
|--------|-------|-------|
| Ingresado | `.ingresado` | Azul claro |
| En Diagnóstico | `.en-diagnostico` | Naranja claro |
| Esperando Aprobación | `.esperando-aprobacion` | Púrpura claro |
| En Reparación | `.en-reparacion` | Naranja |
| Completado | `.completado` | Verde claro |
| Cerrado | `.cerrado` | Rojo |

## 🔄 Flujo de Trabajo

1. **Definir variables** en `admin-variables.css`
2. **Crear utilitarias** en `admin-utilities.css`
3. **Implementar layouts** en `admin-layout.css`
4. **Estilizar componentes** en `admin-components.css`
5. **Probar responsive** en `admin-responsive.css`

## 🚀 Mejores Prácticas

### Para Desarrolladores
- Usar variables para consistencia
- Preferir utilitarias sobre estilos custom
- Mantener archivos modulares
- Documentar clases complejas

### Para Mantenimiento
- Revisar CSS con `npm run lint:css`
- Actualizar variables para cambios globales
- Eliminar código no utilizado
- Probar en múltiples dispositivos

## 📞 Soporte

Para preguntas o problemas:
1. Revisar esta documentación
2. Ejecutar `npm run lint:css` para verificar errores
3. Consultar los archivos de variables para colores
4. Verificar la estructura modular

---
*Este sistema fue diseñado para ser mantenible, escalable y consistente. ¡Sigue las reglas para mantener la calidad!*