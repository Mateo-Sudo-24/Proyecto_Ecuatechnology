# Guía del Frontend - Ecuatecnology

## Visión General

Este proyecto implementa un sistema de frontend moderno usando React y Tailwind CSS, optimizado para responsividad, mantenibilidad y experiencia de usuario en todos los dispositivos.

## React + Vite
Esta plantilla proporciona una configuración mínima para hacer funcionar React en Vite con HMR y algunas reglas de ESLint.

**Actualmente, hay dos plugins oficiales disponibles:**

@vitejs/plugin-react usa Babel para Fast Refresh
@vitejs/plugin-react-swc usa SWC para Fast Refresh
Expandiendo la configuración de ESLint
Si estás desarrollando una aplicación de producción, recomendamos usar TypeScript con reglas de lint conscientes de tipos habilitadas. Consulta la plantilla TS para obtener información sobre cómo integrar TypeScript y typescript-eslint en tu proyecto.

## Arquitectura del Frontend

### Tecnologías Principales
- **React 18** - Framework principal para componentes
- **Tailwind CSS** - Framework de utilidades CSS para diseño responsivo
- **React Router** - Navegación entre páginas
- **Lucide React** - Iconografía consistente
- **React Toastify** - Notificaciones de usuario

### Estructura de Archivos

```
src/
├── components/           # Componentes reutilizables
│   ├── auth/            # Autenticación y rutas protegidas
│   └── Tickets/         # Componentes de gestión de tickets
├── layout/              # Layouts de páginas
│   ├── admin/           # Panel de administración
│   └── client/          # Panel de cliente
├── pages/               # Páginas principales
├── hooks/               # Custom hooks de React
├── context/             # Context API para estado global
└── helpers/             # Utilidades y funciones auxiliares
```

## Sistema de Diseño con Tailwind CSS

### Variables de Diseño
El proyecto utiliza las variables CSS definidas en `index.css` junto con las utilidades de Tailwind:

```css
:root {
  --primary: #B8860B;      /* Color principal/oro */
  --secondary: #3B5998;    /* Color secundario/azul */
  --accent: #DC3545;       /* Color de acento/rojo */
  --neutral: #333333;      /* Color neutral/gris */
  --background: #FFFFFF;   /* Color de fondo */
  --peach-light: #FFF5E6;  /* Color melocotón claro */
}
```

### Paleta de Colores

**Variable** | **Color** | **Uso**
--- | --- | ---
`--primary` | #B8860B | Botones principales, enlaces
`--secondary` | #3B5998 | Elementos secundarios
`--accent` | #DC3545 | Alertas, estados de error
`--neutral` | #333333 | Texto principal, footer
`--background` | #FFFFFF | Fondos principales

## Utilitarias de Tailwind CSS

El proyecto utiliza las clases de utilidad de Tailwind CSS para un desarrollo rápido y consistente:

### Layouts Responsivos
- `flex flex-col md:flex-row` - Layout flexible que se adapta a móviles
- `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3` - Grids responsivos
- `min-h-screen` - Altura mínima de pantalla completa
- `container mx-auto` - Contenedores centrados responsivos

### Navegación
- **Header**: Menú hamburguesa en móviles con navegación vertical
- **Sidebar**: Layout fijo en desktop, colapsable en móvil con overlay
- **Footer**: Grid de 4 columnas que se convierte en 1 columna en móvil

### Formularios y Modales
- Inputs con padding responsivo: `p-2 md:p-3`
- Textareas con altura mínima adaptable: `min-h-[80px] md:min-h-[100px]`
- Botones con texto responsivo: `text-sm md:text-base`
- Modales con ancho adaptativo: `max-w-sm md:max-w-md`

### Componentes Responsivos
- **Cards**: Padding y texto que se ajustan por dispositivo
- **Tablas**: Scroll horizontal en móviles
- **Imágenes**: `w-full h-auto` para responsividad automática
- **Iconos**: Tamaños adaptativos `w-5 h-5 md:w-6 md:h-6`

## Diseño Responsivo Implementado

### Breakpoints Utilizados
- `sm: 640px` - Mobile landscape
- `md: 768px` - Tablet portrait
- `lg: 1024px` - Tablet landscape
- `xl: 1280px` - Desktop

### Mejoras Implementadas
- **Navegación Móvil**: Menús hamburguesa funcionales en Header, AdminModule y ClienteModulo
- **Grids Adaptativos**: Todos los grids se convierten en una sola columna en móviles
- **Texto Escalable**: Tamaños de fuente que se ajustan automáticamente
- **Espaciado Inteligente**: Padding y margins que se optimizan por dispositivo
- **Imágenes Responsivas**: Todas las imágenes se escalan correctamente
- **Modales Optimizados**: Tamaños y layouts adaptados para pantallas pequeñas
## Reglas de Calidad

### Prohibiciones
- NO usar `!important`
- NO colores hardcoded en componentes
- NO estilos inline innecesarios
- NO propiedades duplicadas

### Obligaciones
- Usar clases de Tailwind CSS para consistencia
- Implementar diseño mobile-first
- Mantener componentes modulares
- Probar en múltiples dispositivos

## Comandos Útiles
# Iniciar servidor de desarrollo
npm run dev

# Construir para producción
npm run build


## Sistema de Colores

**Variable** | **Color** | **Uso**
--- | --- | ---
`--primary` | #B8860B | Botones principales, enlaces, acentos
`--secondary` | #3B5998 | Elementos secundarios, navegación
`--accent` | #DC3545 | Alertas, errores, estados importantes
`--neutral` | #333333 | Texto principal, footer, elementos grises
`--background` | #FFFFFF | Fondos principales
`--peach-light` | #FFF5E6 | Fondos de tarjetas, secciones claras

## Despliegue

Esta aplicación frontend está desplegada en **Vercel**, una plataforma de despliegue en la nube optimizada para aplicaciones web modernas.

### Tecnología de Despliegue
- **Plataforma:** Vercel (anteriormente Zeit)
- **Framework de Build:** Vite 7.1.2
- **Comandos de Build:**
  - `npm run build` - Genera el build de producción
  - `npm run preview` - Vista previa local del build
- **Configuración:** Automática detección de Vite
- **Optimizaciones:** Code splitting, tree shaking y minificación automática

### Arquitectura de Despliegue
- **Frontend:** Desplegado completamente en Vercel
- **Backend:** Alohado por separado (no incluido en este despliegue)
- **Integración:** Comunicación vía APIs REST con variables de entorno

### Variables de Entorno en Vercel
- `VITE_URL_BACK`: URL del backend principal
- `VITE_API_DESK`: URL del API alternativo

### Proceso de Despliegue
1. **Conexión Git:** Integración automática con repositorio Git
2. **Build Automático:** Se ejecuta `npm run build` en cada push
3. **Deploy Preview:** Generación de previews para pull requests
4. **CDN Global:** Distribución automática en edge network de Vercel

### Dominio y URL
**Despliegue en Vivo:** [https://ecuatechnology.vercel.app/](https://ecuatechnology.vercel.app/)

### Características de Vercel
- **Despliegue Instantáneo:** Builds rápidos y optimizados
- **SSL Automático:** Certificados HTTPS incluidos
- **Analytics Integrado:** Métricas de rendimiento incluidas
- **Rollback Fácil:** Versiones anteriores disponibles
- **Edge Functions:** Posibilidad de serverless functions (no implementadas actualmente)


## Características Responsivas Implementadas

### Componentes Optimizados
- **Header**: Navegación horizontal en desktop, menú hamburguesa en móvil
- **Footer**: Grid de 4 columnas que se convierte en 1 columna en móvil
- **Home Page**: Grids adaptativos, imágenes responsivas, texto escalable
- **Modales**: Tamaños adaptativos con padding y botones optimizados para móvil
- **AdminModule**: Sidebar colapsable con overlay en móvil
- **ClienteModulo**: Navegación móvil con menú hamburguesa
- **Tickets**: Listas y formularios adaptados para pantallas pequeñas

### Mejoras de UX
- **Mobile-First**: Diseño pensado primero para móviles
- **Touch-Friendly**: Botones y elementos táctiles de tamaño adecuado
- **Navegación Intuitiva**: Menús colapsables y overlays para móvil
- **Performance**: Imágenes optimizadas y layouts eficientes

## Flujo de Desarrollo

1. Crear componentes con diseño mobile-first
2. Aplicar clases de Tailwind para responsividad
3. Probar en múltiples dispositivos usando browser dev tools
4. Optimizar imágenes y assets para web
5. Validar accesibilidad y usabilidad

## Mejores Prácticas

### Para Desarrolladores
- Usar clases de Tailwind para rapid development
- Implementar mobile-first responsive design
- Mantener componentes pequeños y reutilizables
- Documentar props y funcionalidades complejas

### Para Mantenimiento
- Probar cambios en múltiples dispositivos
- Usar Git para version control
- Mantener consistencia en naming conventions
- Optimizar performance regularmente

## Soporte

Para preguntas o problemas:
1. Revisar esta documentación
2. Probar en modo responsive del navegador
3. Verificar la consola del navegador para errores
4. Consultar la configuración de Tailwind

---

Este proyecto utiliza Tailwind CSS para un desarrollo rápido y un diseño responsivo moderno. Mantén la consistencia y prueba en múltiples dispositivos.