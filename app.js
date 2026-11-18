const projects = {
  qmos: {
    index: '001', category: 'WEB APPLICATION', title: 'QMOS',
    summary: 'Making daily factory quality activities easier to navigate, complete, and review.',
    description: 'A quality management operation system with Leader Standard Work, Henkaten change-point checks, and Tenken inspections. The application brings checklists, approval flows, and daily activity reporting into a shared workspace.',
    contributions: ['Developing the Vue frontend for factory workflows.', 'Building Henkaten and Tenken forms around real checksheets.', 'Designing interfaces for roles, models, lines, and daily activities.'],
    stack: 'LARAVEL / VUE.JS / PHP'
  },
  water: {
    index: '002', category: 'WEB / MOBILE / IoT', title: 'Integrated Clean Water',
    summary: 'A connected approach to water usage, from physical meters to digital records.',
    description: 'Developed during my internship in 2025-2026 for Prima Lestari in Tugurejo, this system digitizes clean water distribution and management. A mobile meter-reading app connects field records to a PHP web application for automatic customer billing and payment recording. IoT functionality monitors water flow and tank levels, with automatic pump activation below a tank-level threshold.',
    contributions: ['Extended the existing PHP web application for automated customer billing and payment recording.', 'Independently built the Flutter app for meter readers to record readings and submit them directly to the database.', 'Independently developed water-flow monitoring, tank-level monitoring, and automatic pump activation.'],
    stack: 'PHP / JAVASCRIPT / MYSQL / FLUTTER / DART / C'
  },
  face: {
    index: '003', category: 'MOBILE APPLICATION', title: 'Face Recognition Attendance',
    summary: 'Connecting a simple mobile check-in with facial recognition and existing attendance records.',
    description: 'An independently built mobile attendance system developed in 2025. The Flutter application connects to Python face-recognition endpoints and a PHP backend, recording face-based attendance using the storage structure already used by the fingerprint attendance system.',
    contributions: ['Independently built the attendance application from scratch.', 'Developed the Flutter mobile app, Python face-recognition endpoints, and PHP backend.', 'Integrated attendance recording with the existing fingerprint attendance storage structure.'],
    stack: 'FLUTTER / DART / PYTHON / PHP / MYSQL'
  },
  trip: {
    index: '004', category: 'WEB APPLICATION', title: 'Trip Planner',
    summary: 'A place to turn travel ideas into an organized itinerary.',
    description: 'A trip-planning website that helps users create itineraries, add destinations, organize schedules, and estimate travel budgets.',
    scopeLabel: 'Project scope',
    contributions: ['Create trip itineraries and add destinations.', 'Organize travel schedules.', 'Estimate budgets for upcoming trips.'],
    stack: 'TRAVEL / ITINERARIES / BUDGET PLANNING'
  },
  gym: {
    index: '005', category: 'MOBILE APPLICATION', title: 'Gym App',
    summary: 'Exercise guidance and everyday nutrition tracking in one application.',
    description: 'An application supporting a healthy lifestyle through interactive visual guides for weight training and a macronutrient tracker. Exercise animations help explain movement techniques, while logged meals feed into nutrition calculations.',
    scopeLabel: 'Project scope',
    contributions: ['Interactive visual guidance for weight-training movements.', 'Meal logging and macronutrient tracking.', 'Automatic calculations for calories, protein, and carbohydrates.'],
    stack: 'FITNESS / MOVEMENT GUIDANCE / NUTRITION'
  },
  home: {
    index: '006', category: 'MOBILE & IoT', title: 'Smart Home',
    summary: 'Connecting a smartphone to everyday devices around the home.',
    description: 'An IoT-based mobile application for controlling connected devices and checking room temperature from a smartphone.',
    scopeLabel: 'Project scope',
    contributions: ['Switch connected lamps on and off from a smartphone.', 'Check room temperature through the mobile application.'],
    stack: 'IoT / MOBILE / DEVICE CONTROL'
  },
  traffic: {
    index: '007', category: 'CONNECTED SYSTEM', title: 'Traffic Density Detector',
    summary: 'Using vehicle density to inform traffic-light timing.',
    description: 'A system that detects vehicle density and adjusts the traffic-light cycle according to the density level on each lane.',
    scopeLabel: 'Project scope',
    contributions: ['Detect the level of vehicle density.', 'Adjust traffic-light duration for each lane based on detected density.'],
    stack: 'VEHICLE DENSITY / ADAPTIVE SIGNAL TIMING'
  },
  game: {
    index: '008', category: 'GAME DEVELOPMENT', title: '2D Platformer Game',
    summary: 'An exploration of game development in two dimensions.',
    description: 'A 2D platformer game presented in my project portfolio, alongside my web, mobile, and connected-system work.',
    scopeLabel: 'Project scope',
    contributions: ['A 2D platformer game project.'],
    stack: 'GAME DEVELOPMENT / 2D PLATFORMER'
  }
};

const menuToggle = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
function closeMenu() {
  navigation.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.setAttribute('aria-label', 'Open navigation');
}
menuToggle.addEventListener('click', () => {
  const open = menuToggle.getAttribute('aria-expanded') !== 'true';
  navigation.classList.toggle('open', open);
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
});
navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('click', event => { if (!navigation.contains(event.target) && !menuToggle.contains(event.target)) closeMenu(); });
document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });

document.querySelectorAll('[data-filter]').forEach(button => {
  button.addEventListener('click', () => {
    document.querySelectorAll('[data-filter]').forEach(filter => {
      const active = filter === button;
      filter.classList.toggle('active', active);
      filter.setAttribute('aria-pressed', String(active));
    });
    document.querySelectorAll('.project').forEach(project => {
      const categories = project.dataset.category.split(/\s+/);
      project.hidden = button.dataset.filter !== 'all' && !categories.includes(button.dataset.filter);
    });
  });
});

const dialog = document.querySelector('#project-dialog');
document.querySelectorAll('[data-project]').forEach(button => {
  button.addEventListener('click', () => {
    const project = projects[button.dataset.project];
    for (const key of ['index', 'category', 'title', 'summary', 'description', 'stack']) document.querySelector(`#dialog-${key}`).textContent = project[key];
    document.querySelector('#dialog-scope-label').textContent = project.scopeLabel || 'My contribution';
    document.querySelector('#dialog-contributions').replaceChildren(...project.contributions.map(text => {
      const item = document.createElement('li');
      item.textContent = text;
      return item;
    }));
    dialog.showModal();
    document.body.classList.add('dialog-open');
  });
});
document.querySelector('#dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => {
  const box = dialog.getBoundingClientRect();
  if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) dialog.close();
});
dialog.addEventListener('close', () => document.body.classList.remove('dialog-open'));
document.querySelector('#year').textContent = new Date().getFullYear();
