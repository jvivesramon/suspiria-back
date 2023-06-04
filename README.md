# Endpoints

## <u>Ping</u>

### method:

- GET

### url:

- https://judit-vives-final-project-back-202304-bcn.onrender.com/

### body:

#### response:

- 200 Ok
- { "message": "🏓 Pong }

## <u>Login User</u>

### method:

- POST

### url:

- https://judit-vives-final-project-back-202304-bcn.onrender.com/user/login

### request:

#### body:

- {
  "username": "admin",
  "password": "admin"
  }

### response:

- 200 Ok,
- {
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NDcwN2RjZDExOWE2ZmM4NWJmODdkNTAiLCJuYW1lIjoiYWRtaW4iLCJpYXQiOjE2ODU5MDQ1NDB9.x3B_jZIfhAPMfhxa4cwWJRbnev4PUXUtPn3JqWWfJn8"
  }

## <u>Get pictures</u>

### method:

- GET

### url:

- https://judit-vives-final-project-back-202304-bcn.onrender.com/pictures

### request:

#### body:

- { auth: { bearer: { token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NDcwN2RjZDExOWE2ZmM4NWJmODdkNTAiLCJuYW1lIjoiYWRtaW4iLCJpYXQiOjE2ODU5MDQ1NDB9.x3B_jZIfhAPMfhxa4cwWJRbnev4PUXUtPn3JqWWfJn8"}}}

### response:

- 200 Ok,
- {
  "pictures": [
  {
  "pictureData": {
  "title": "Girl with a Pearl Earring",
  "creationdDate": "1667",
  "author": "Johannes Vermeer",
  "movement": "baroque"
  },
  "temperatureColor": {
  "warm": false,
  "cold": false,
  "mixed": true
  },
  "colors": {
  "colorFirst": "#fff2e1",
  "colorSecond": "#d7a85b",
  "colorThird": "#c23126",
  "colorFourth": "#a5b2c2",
  "colorFive": "#2f4e75",
  "colorSixth": "#070614"
  },
  "image": "https://cdn.discordapp.com/attachments/1094550845909114921/1114592409314144296/la-joven-de-la-perla_1.png",
  "description": "The painting features a striking contrast between the vibrant blue of the turban worn by the girl and her delicate, pale complexion. The blue exudes a sense of depth and richness, while the softness of her skin creates a subtle yet captivating visual balance. These colors, carefully chosen and skillfully applied, contribute to the overall allure and intrigue of the artwork.",
  "id": "647c8dccc56178ba6331f66f"
  },
  {
  "pictureData": {
  "title": "Seated Woman with Bent Knees",
  "creationdDate": "1917",
  "author": "Egon Schiele",
  "movement": "Austrian Expressionist"
  },
  "temperatureColor": {
  "warm": true,
  "cold": false,
  "mixed": false
  },
  "colors": {
  "colorFirst": "#f5e6d3",
  "colorSecond": "#cc8e4a",
  "colorThird": "#cc504d",
  "colorFourth": "#42a188",
  "colorFive": "#1f4442",
  "colorSixth": "#3a4888"
  },
  "image": "https://cdn.discordapp.com/attachments/1094550845909114921/1114888918928736266/seated-woman_1.png",
  "description": "This a powerful painting that depicts a seated female figure in a twisted pose. The artwork features bold, dark lines and muted, earthy colors, creating a somber and introspective atmosphere. Schiele's unique style captures the emotional intensity of the subject, conveying vulnerability and existential angst.",
  "id": "647c8de2c56178ba6331f671"
  }
  ]
  }
