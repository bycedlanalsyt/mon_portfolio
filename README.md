# Portfolio Cédric BOIMIN - Data Analyst

## 📋 Description

Portfolio professionnel moderne et responsive, aspirant Data Analyst étudiant à MBA ESG. Ce site web présente mes projets, compétences et réalisations dans le domaine de l'analyse de données.

## 🚀 Fonctionnalités

- **Design moderne et responsive** : Interface élégante avec thème sombre
- **Navigation fluide** : Menu fixe avec effet de scroll
- **Filtrage de projets** : Système de filtres par technologie (Excel, PowerBI, SQL, Python)
- **Effets visuels avancés** : 
  - Effet de traînée du curseur avec points lumineux
  - Animations 3D sur les cartes de projets
  - Effet de brillance sur les images
  - Animations de flottement
- **Formulaire de contact** : Intégration avec FormSubmit pour l'envoi d'emails
- **Optimisation mobile** : Design adaptatif pour tous les écrans

## 🛠️ Technologies utilisées

- **HTML5** : Structure sémantique et moderne
- **CSS3** : 
  - Variables CSS personnalisées
  - Grid et Flexbox pour la mise en page
  - Animations et transitions fluides
  - Design responsive avec media queries
- **JavaScript ES6+** :
  - Gestion dynamique des projets
  - Système de filtrage interactif
  - Effets de curseur personnalisés
  - Animations 3D sur les cartes
- **Font Awesome** : Icônes pour les compétences
- **FormSubmit** : Service d'envoi de formulaires

## 📁 Structure du projet

```
Portfolio_project/
├── index.html              # Page principale du portfolio
├── contact.html            # Page de contact avec formulaire
├── lien_contact.html       # Page de redirection
├── styles.css              # Feuille de style principale
├── script.js               # Script JavaScript principal
├── mes_images/             # Dossier des images
│   ├── photo1.jpg          # Photo principale
│   └── photo2.jpg          # Photo de profil
└── README.md               # Documentation du projet
```

## 🎨 Sections du portfolio

### 1. **Header**
- Logo avec photo de profil
- Navigation avec liens vers les sections
- Bouton de contact stylisé
- Effet de transparence au scroll

### 2. **Hero Section**
- Présentation personnelle
- Description du profil Data Analyst
- Call-to-action vers les projets
- Image de présentation avec effets visuels

### 3. **Projets**
- Grille responsive de projets
- Système de filtres par technologie
- Cartes de projets avec :
  - Images d'aperçu
  - Descriptions détaillées
  - Tags de technologies
  - Liens vers démos et code source

### 4. **Compétences**
- Grille d'icônes représentant les technologies
- Effets hover avec animations
- Technologies présentées :
  - Excel
  - PowerBI
  - SQL
  - Python
  - HTML/CSS
  - JavaScript

### 5. **Contact**
- Formulaire de contact fonctionnel
- Intégration avec FormSubmit
- Design cohérent avec le thème

## 🎯 Projets présentés

1. **Dashboard RH Excel** - Tableau de bord interactif pour l'analyse des KPIs RH
2. **Analyse Ventes PowerBI** - Dashboard PowerBI analysant les performances commerciales
3. **Base de données E-commerce** - Requêtes SQL complexes pour l'analyse client
4. **Analyse de données Python** - Nettoyage et visualisation avec Pandas et NumPy
5. **Budget Prévisionnel** - Modèle Excel de prévisions financières
6. **Machine Learning Prédiction** - Modèle de prédiction de ventes avec scikit-learn

## 🚀 Installation et utilisation

1. **Cloner ou télécharger** le projet
2. **Ouvrir** `index.html` dans un navigateur web moderne
3. **Personnaliser** :
   - Modifier les informations personnelles dans `index.html`
   - Remplacer les images dans le dossier `mes_images/`
   - Ajouter vos projets dans le tableau `projects` du fichier `script.js`
   - Configurer l'email de contact dans `contact.html`

## ⚙️ Configuration

### Personnalisation des projets
Modifiez le tableau `projects` dans `script.js` :

```javascript
const projects = [
  {
    id: 'votre-projet-1',
    title: 'Titre de votre projet',
    description: 'Description détaillée',
    image: 'chemin/vers/image.jpg',
    tags: ['Excel', 'PowerBI', 'SQL', 'Python'],
    demo: 'https://votre-demo.com',
    code: 'https://github.com/votre-repo'
  }
];
```

### Configuration du formulaire de contact
Dans `contact.html`, modifiez l'action du formulaire :

```html
<form action="https://formsubmit.co/votre-email@example.com" method="POST">
```

## 🎨 Personnalisation du design

### Couleurs principales
Les couleurs sont définies dans les variables CSS :

```css
:root {
  --primary: #2563eb;      /* Bleu principal */
  --secondary: #0ea5e9;    /* Bleu secondaire */
  --dark: #000000;        /* Fond sombre */
  --text: #f8fafc;        /* Texte principal */
  --accent: #60a5fa;       /* Couleur d'accent */
}
```

### Responsive design
Le site s'adapte automatiquement aux différentes tailles d'écran :
- **Desktop** : Layout en grille avec sidebar
- **Tablet** : Adaptation des colonnes
- **Mobile** : Layout vertical optimisé

## 📱 Compatibilité

- ✅ Chrome (recommandé)
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ✅ Navigateurs mobiles modernes

## 🔧 Fonctionnalités avancées

### Effet de curseur personnalisé
- Traînée lumineuse qui suit le curseur
- Points lumineux avec animation de disparition
- Effet de brillance sur les éléments interactifs

### Animations 3D
- Effet de rotation des cartes au survol
- Animations de flottement pour les éléments hero
- Transitions fluides entre les états

### Performance
- Chargement paresseux des images
- Optimisation des animations avec `prefers-reduced-motion`
- Code JavaScript modulaire et optimisé

## 📞 Contact

- **Email** : boimincedric@gmail.com
- **LinkedIn** : [Votre profil LinkedIn]
- **GitHub** : [Votre profil GitHub]

## 📄 Licence

Ce projet est sous licence MIT. Vous êtes libre de l'utiliser et de le modifier selon vos besoins.

---

**Développé avec ❤️ par Cédric BOIMIN**

